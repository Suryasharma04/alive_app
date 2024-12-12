import mysql from 'mysql2/promise';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getArtistId = async (artistName, apiKey) => {
  const url = `https://www.jambase.com/jb-api/v1/artists?artistName=${encodeURIComponent(artistName)}&apikey=${apiKey}`;

  console.log(url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching artist ID:", errorData);
      return null;
    }

    const data = await response.json();
    if (!data.artists || !Array.isArray(data.artists) || data.artists.length === 0) {
      console.warn("No artists found in the response.");
      return [null, null];
    }

    const artist = data.artists?.[0]; // Get the first artist
    const artistId = artist?.identifier || null; // Safely access artist identifier

    // Safely access artist image
    const artistImage = artist && "image" in artist ? artist.image : null;

    return [artistId, artistImage];
  } catch (error) {
    console.error("Fetch error in getArtistId:", error.message);
    return null;
  }
};

const populateUpcomingShowsData = async (artistName) => {
  console.log(artistName);
  const apiKey = "3ea53e5c-1754-45b8-b8ca-c85842bf5722";
  const [jambaseId, artistImage] = await getArtistId(artistName, apiKey);
  console.log("got artistId");
  console.log("Image url:", artistImage);

  const dbConfig = {
    host: "istanbul.mysql.database.azure.com",
    user: "bailey",
    password: "705147320",
    database: "prj_music",
  };

  const connection = await mysql.createConnection(dbConfig);

  if (!jambaseId) {
    console.error("Artist ID not found.");
    return [];
  }

  const url = `https://www.jambase.com/jb-api/v1/events?artistId=${jambaseId}&apikey=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    console.log("fetched from jambase");

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching events:", errorData);
      return [];
    }

    const data = await response.json();
    //console.log(data);
    //const artistImage = data.artist.image;
    const events = data.events || [];
    //console.log(events);

    for (const event of events) {
      try {
        const venueName = event.location.name;
        const venueCity = event.location.address.addressLocality;
        const venueCapacity = parseInt(event.location.maximumAttendeeCapacity);
        //console.log(venueName, venueState);

        const [existingVenue] = await connection.execute(
          `SELECT id, capacity FROM Venue WHERE name = ? AND address = ?`,
          [venueName, venueCity]
        );

        //console.log(existingVenue);

        let venueId;

        if (existingVenue.length > 0) {
          // Venue already exists, use the existing ID
          venueId = existingVenue[0].id;
          const oldCapacity = existingVenue[0].capacity;
          console.log("oldCapacity:", oldCapacity);
          console.log(`Venue "${venueName}" at "${venueCity}" already exists.`);
          if (oldCapacity == null) {
            const [capacityAdd] = await connection.execute(`UPDATE Venue SET capacity = ? WHERE id = ?`, [venueCapacity, venueId]);
            console.log("capacity updated:", capacityAdd);
          }
        } else {
          // Venue does not exist, insert it into the Venue table
          const [venueResult] = await connection.execute(
            `INSERT INTO Venue (name, address, capacity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
            [
              venueName,
              venueCity,
              venueCapacity || null, // Use capacity if provided, otherwise null
            ]
          );
          venueId = venueResult.insertId;
          console.log(`Inserted new venue: "${venueName}" at "${venueCity}".`);
        }
        // Check if the Artist already exists
        const [existingArtist] = await connection.query('SELECT id FROM Artist WHERE name = ?', [event.performer[0].name]);

        let artistId;
        if (existingArtist.length > 0) {
          artistId = existingArtist[0].id;
          const [foundImage] = await connection.query('SELECT imageLink FROM Artist WHERE id = ?', [artistId]);
          const nullImage = foundImage[0]?.imageLink
          console.log("Image status:", nullImage);

          if (nullImage == null && artistImage != null) {
            const [artistImageAdd] = await connection.execute(`UPDATE Artist SET imageLink = ? WHERE id = ?`, [artistImage, artistId]);
            console.log(artistImageAdd);

          }
        } else {
          // Insert new Artist
          const [insertedArtist] = await connection.query('INSERT INTO Artist (name, imageLink) VALUES (?, ?)', [event.performer[0].name], artistImage);
          artistId = insertedArtist.insertId;
        }

        // Check if the event already exists (based on artist and venue and date)
        const [existingEvent] = await connection.query('SELECT id FROM UpcomingShows WHERE artist_id = ? AND venue_id = ? AND date = ?', [
          artistId, venueId, event.startDate.split('T')[0]
        ]);

        if (existingEvent.length === 0) {
          // Insert Upcoming Show if it doesn't already exist
          const [insertedShow] = await connection.query('INSERT INTO UpcomingShows (date, artist_id, venue_id) VALUES (?, ?, ?)', [
            event.startDate.split('T')[0], // Only date
            artistId,
            venueId
          ]);
          console.log("Event Inserted successfully");
        } else {
          console.log("Event already exists in the database.");
        }
      } catch (error) {
        console.error("Error inserting event:", error);
      }
    }

  } catch (error) {
    console.error("Fetch error in populateUpcomingShowsData:", error.message);
  }
};

export default populateUpcomingShowsData;

//The database code stopped populating really fast for some reason
//Figure out how to add profile picture photo from artist and add capacity to venues without it
//Find out how to add to an exisitng artist/venue and then always add it reguardless of if it has existed already in the list.