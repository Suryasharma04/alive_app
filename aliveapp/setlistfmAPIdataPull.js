import populateUpcomingShowsData from './upcomingShowsAPIDataPull.js';
import axios from 'axios';
import mysql from 'mysql2/promise';

const artistList = 'http://musicbrainz.org/ws/2/artist/?query=releasecount:[50 TO *] AND begin:[2000 TO *]&limit=500&fmt=json';

const populateDatabase = async (artistList) => {
  const getArtistMBID = async (artistName) => {
    const apiUrl = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json`;
  
    try {
      const response = await axios.get(apiUrl);
      if (response.data.artists && response.data.artists.length > 0) {
        return response.data.artists[0].id; // Returns the first match's MBID
      } else {
        console.log("Artist not found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching MBID:", error.message);
    }
  };
  
  // Example Usage
  //aMbid = getArtistMBID("Coldplay");
  //console.log(aMbid);
  
  const addToDatabase = async (artistMbid) => {
    const baseUrl = `https://api.setlist.fm/rest/1.0/artist/${artistMbid}/setlists`; // Replace {artistMbid} with actual MBID
    const apiKey = "E_w0OIVVrI17z6LH_feXnH7MzI0XHOCjEcIG";
  
    const dbConfig = {
      host: "istanbul.mysql.database.azure.com",
      user: "bailey",
      password: "705147320",
      database: "prj_music",
    };
  
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);
  
    try {
      let page = 1;
      let totalPages = 1; // Initial assumption
  
      while (page <= totalPages) {
        const apiUrl = `${baseUrl}?p=${page}`;
  
        // Fetch data from the API
        const response = await axios.get(apiUrl, {
          headers: {
            Accept: "application/json",
            "x-api-key": apiKey,
          },
        });
  
        const data = response.data;
        totalPages = data.totalPages; // Update total pages if available
        const setlists = data.setlist || [];
  
        // Process each setlist
        for (const setlist of setlists) {
          const originalDate = setlist.eventDate;
          const [day, month, year] = originalDate.split("-");
          const formattedDate = `${year}-${month}-${day}`;
  
          const [existingArtist] = await connection.execute(
            `SELECT id FROM Artist WHERE name = ?`,
            [setlist.artist.name]
          );

          //console.log(setlist.artist.name);
  
          let artistId;
  
          if (existingArtist.length > 0) {
            // Artist exists, use the existing ID
            artistId = existingArtist[0].id;
          } else {
            // Artist does not exist, insert into Artist Table
            const [artistResult] = await connection.execute(
              `INSERT INTO Artist (name, imageLink) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
              [setlist.artist.name, null]
            );
            artistId = artistResult.insertId;
          }
  
  
  
          const [existingVenue] = await connection.execute(
            `SELECT id FROM Venue WHERE name = ? AND address = ?`,
            [setlist.venue.name, setlist.venue.city.name]
          );
  
          let venueId;
  
          if (existingVenue.length > 0) {
            // Venue already exists, use the existing ID
            venueId = existingVenue[0].id;
            console.log(`Venue "${setlist.venue.name}" at "${setlist.venue.city.name}" already exists.`);
          } else {
            // Venue does not exist, insert it into the Venue table
            const [venueResult] = await connection.execute(
              `INSERT INTO Venue (name, address, capacity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
              [
                setlist.venue.name,
                setlist.venue.city.name,
                setlist.venue.capacity || null, // Use capacity if provided, otherwise null
              ]
            );
            venueId = venueResult.insertId;
            //console.log(`Inserted new venue: "${setlist.venue.name}" at "${setlist.venue.city.name}".`);
          }
  
          // check for repeat dates for venue/setlists
          const [existingSetlist] = await connection.execute(
            `SELECT id FROM Setlists WHERE artist_id = ? AND date = ? AND venue_id = ?`,
            [artistId, formattedDate, venueId]
          );
  
          let setlistId;
  
          if (existingSetlist.length > 0) {
            // Setlist already exists, use the existing ID
            setlistId = existingSetlist[0].id;
            //console.log(`Setlist for artist_id: ${artistId} on date: ${formattedDate} already exists.`);
          } else {
            // Setlist does not exist, insert it into the Setlists table
            const [setlistResult] = await connection.execute(
              `INSERT INTO Setlists (artist_id, date, venue_id, length) 
       VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
              [artistId, formattedDate, venueId, setlist.sets?.set?.length || 0]
            );
            setlistId = setlistResult.insertId;
            //console.log(`Inserted new setlist for artist_id: ${artistId} on date: ${formattedDate}`);
          }
  
          // Populate Songs and SetlistSongs Tables
          const sets = setlist.sets?.set || [];
          for (const set of sets) {
            const songs = set.song || [];
            for (const song of songs) {
              const duration = isNaN(Number(song.info)) ? null : Number(song.info);
              // Insert Song
              const [existingSong] = await connection.execute(
                `SELECT id FROM Songs WHERE title = ? AND artist_id = ?`,
                [song.name, artistId]
              );
  
              let songId;
  
              if (existingSong.length > 0) {
                // Song already exists for this artist, use the existing ID
                songId = existingSong[0].id;
                console.log(`Song "${song.name}" for artist_id: ${artistId} already exists.`);
              } else {
                // Song does not exist, insert it into the Songs table
                const [songResult] = await connection.execute(
                  `INSERT INTO Songs (title, artist_id, duration) VALUES (?, ?, ?) 
                   ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
                  [song.name, artistId, duration]
                );
                songId = songResult.insertId;
                console.log(`Inserted new song: "${song.name}" for artist_id: ${artistId}.`);
              }
  
              // Check if the song is already linked to the setlist with the same order number
              const [existingSetlistSong] = await connection.execute(
                `SELECT * FROM SetlistSongs WHERE setlist_id = ? AND song_id = ? AND order_num = ?`,
                [setlistId, songId, songs.indexOf(song) + 1]
              );
  
              if (existingSetlistSong.length > 0) {
                console.log(
                  `Duplicate entry avoided: SetlistSong (setlist_id: ${setlistId}, song_id: ${songId}, order_num: ${songs.indexOf(song) + 1}) already exists.`
                );
              } else {
                // Insert the song into the SetlistSongs table if it doesn't already exist
                await connection.execute(
                  `INSERT INTO SetlistSongs (setlist_id, song_id, order_num) VALUES (?, ?, ?)`,
                  [setlistId, songId, songs.indexOf(song) + 1]
                );
                console.log(
                  `Inserted SetlistSong (setlist_id: ${setlistId}, song_id: ${songId}, order_num: ${songs.indexOf(song) + 1}).`
                );
              }
  
            }
          }
        }
  
        console.log(`Processed page ${page} of ${totalPages}`);
        page++;
      }
  
      console.log("Database populated successfully!");
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      // Close the database connection
      await connection.end();
    }
  };
  
  try {
    const response = await axios.get(artistList);
    const artists = response.data.artists;

    //console.log(artists);

    for (const artist of artists) {
      const aMbid = await getArtistMBID(artist.name);
      if (aMbid) {
        await addToDatabase(aMbid); // Process artist if MBID is valid
        await populateUpcomingShowsData(artist.name);
      }
    }
  } catch (error) {
    console.error("Error processing artist list:", error.message);
  }
}

populateDatabase(artistList);

// import populateUpcomingShowsData from './upcomingShowsAPIDataPull.js';
// import mysql from 'mysql2/promise';

// //const artistList = 'http://musicbrainz.org/ws/2/artist/?query=releasecount:[50 TO *] AND begin:[2000 TO *]&limit=1000&fmt=json';

// const populateDatabase = async () => {
//   const getArtistMBID = async (artistName) => {
//     const apiUrl = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json`;
    
//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       if (data.artists && data.artists.length > 0) {
//         return data.artists[0].id; // Returns the first match's MBID
//       } else {
//         console.log("Artist not found.");
//         return null;
//       }
//     } catch (error) {
//       console.error("Error fetching MBID:", error.message);
//     }
//   };

//   const addToDatabase = async (artistMbid) => {
//     const baseUrl = `https://api.setlist.fm/rest/1.0/artist/${artistMbid}/setlists`; // Replace {artistMbid} with actual MBID
//     const apiKey = "E_w0OIVVrI17z6LH_feXnH7MzI0XHOCjEcIG";
//     console.log("connecting to DB");
//     const dbConfig = {
//       host: "istanbul.mysql.database.azure.com",
//       user: "bailey",
//       password: "705147320",
//       database: "prj_music",
//     };

//     // Connect to the database
//     const connection = await mysql.createConnection(dbConfig);

//     try {
//       let page = 1;
//       let totalPages = 1; // Initial assumption

//       while (page <= totalPages) {
//         const apiUrl = `${baseUrl}?p=${page}`;

//         const response = await fetch(apiUrl, {
//           headers: {
//             Accept: "application/json",
//             "x-api-key": apiKey,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         totalPages = data.totalPages; // Update total pages if available
//         const setlists = data.setlist || [];

//         for (const setlist of setlists) {
//           const originalDate = setlist.eventDate;
//           const [day, month, year] = originalDate.split("-");
//           const formattedDate = `${year}-${month}-${day}`;

//           const [existingArtist] = await connection.execute(
//             `SELECT id FROM Artist WHERE name = ?`,
//             [setlist.artist.name]
//           );

//           let artistId;

//           if (existingArtist.length > 0) {
//             artistId = existingArtist[0].id;
//           } else {
//             const [artistResult] = await connection.execute(
//               `INSERT INTO Artist (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
//               [setlist.artist.name, null]
//             );
//             artistId = artistResult.insertId;
//           }

//           const [existingVenue] = await connection.execute(
//             `SELECT id FROM Venue WHERE name = ? AND address = ?`,
//             [setlist.venue.name, setlist.venue.city.name]
//           );

//           let venueId;

//           if (existingVenue.length > 0) {
//             venueId = existingVenue[0].id;
//           } else {
//             const [venueResult] = await connection.execute(
//               `INSERT INTO Venue (name, address, capacity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
//               [
//                 setlist.venue.name,
//                 setlist.venue.city.name,
//                 setlist.venue.capacity || null,
//               ]
//             );
//             venueId = venueResult.insertId;
//           }

//           const [existingSetlist] = await connection.execute(
//             `SELECT id FROM Setlists WHERE artist_id = ? AND date = ? AND venue_id = ?`,
//             [artistId, formattedDate, venueId]
//           );

//           let setlistId;

//           if (existingSetlist.length > 0) {
//             setlistId = existingSetlist[0].id;
//           } else {
//             const [setlistResult] = await connection.execute(
//               `INSERT INTO Setlists (artist_id, date, venue_id, length) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
//               [artistId, formattedDate, venueId, setlist.sets?.set?.length || 0]
//             );
//             setlistId = setlistResult.insertId;
//           }

//           const sets = setlist.sets?.set || [];
//           for (const set of sets) {
//             const songs = set.song || [];
//             for (const song of songs) {
//               const duration = isNaN(Number(song.info)) ? null : Number(song.info);
//               const [existingSong] = await connection.execute(
//                 `SELECT id FROM Songs WHERE title = ? AND artist_id = ?`,
//                 [song.name, artistId]
//               );

//               let songId;

//               if (existingSong.length > 0) {
//                 songId = existingSong[0].id;
//               } else {
//                 const [songResult] = await connection.execute(
//                   `INSERT INTO Songs (title, artist_id, duration) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
//                   [song.name, artistId, duration]
//                 );
//                 songId = songResult.insertId;
//               }

//               const [existingSetlistSong] = await connection.execute(
//                 `SELECT * FROM SetlistSongs WHERE setlist_id = ? AND song_id = ? AND order_num = ?`,
//                 [setlistId, songId, songs.indexOf(song) + 1]
//               );

//               if (existingSetlistSong.length === 0) {
//                 await connection.execute(
//                   `INSERT INTO SetlistSongs (setlist_id, song_id, order_num) VALUES (?, ?, ?)`,
//                   [setlistId, songId, songs.indexOf(song) + 1]
//                 );
//               }
//             }
//           }
//         }

//         page++;
//       }

//       console.log("Database populated successfully!");
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       await connection.end();
//     }
//   };

//   try {
//     const artistList = 'http://musicbrainz.org/ws/2/artist/?query=releasecount:[50 TO *] AND begin:[2000 TO *]&limit=1000&fmt=json';
//     const response = await fetch('http://musicbrainz.org/ws/2/artist/?query=releasecount:[50 TO *] AND begin:[2000 TO *]&limit=1000&fmt=json');
//     if (!response.ok) {
//       console.log("response:", response);
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const artists = await response.data.artist;
//     //const artists = data.artists;

//     for (const artist of artists) {
//       const aMbid = await getArtistMBID(artist.name);
//       if (aMbid) {
//         await addToDatabase(aMbid);
//         await populateUpcomingShowsData(artist.name);
//       }
//     }
//   } catch (error) {
//     console.error("Error processing artist list:", error.message);
//   }
// };

// populateDatabase();
