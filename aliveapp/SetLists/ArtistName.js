import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ConcertScreen from '../components/Concert';
//import getVideos from '../YouTubeScraperClientSide';

const getSetlistVideos = (artistName, setList, showDate) => {
  const videos = [];
  for (song in setList) {
    const result = getVideos(artistName, song, showDate);
    videos.push(result);
  }
  return videos;
}

const ArtistName = ({ route }) => {
  const { artist, dateOfShow } = route.params;

  const [concertData, setConcertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const [aName, setArtistName] = useState(artist); // Example artist
  const [showDate, setDate] = useState(dateOfShow); // Example date

  console.log("passed artist name:", artist);
  console.log("passed date:", dateOfShow);

  useEffect(() => {
    const getArtistData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const apiUrl = 'http://147.129.22.204:3000/setlists';
        const queryParams = {
          artistName: aName,
          date: showDate,
        };

        const queryString = new URLSearchParams(queryParams).toString();
        const fullUrl = `${apiUrl}?${queryString}`; // Correctly interpolated

        //console.log('Fetching data from:', fullUrl);

        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setConcertData(data); // Update concert data
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError('Failed to fetch concert data. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getArtistData();
  }, [aName, showDate]); // Re-run when artist name or date changes

  console.log(concertData);

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  // No data state
  if (!concertData || concertData.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No concert data available.</Text>
      </View>
    );
  }



  //const [concert] = concertData[0];
  //console.log(concertData[0]);

  // Destructure properties from the object
  const {
    artist_name: artistName,
    date,
    venue_name: venue,
    venue_address: address,
    setlist_songs: setList,
    videos,
  } = concertData[0];

  const setListSongs = setList.split(',');
  const formattedDate = date.substring(0, 10);

  //const setListVideos = getSetlistVideos(artistName, setListSongs, date);
  //console.log(setListVideos);

  //console.log(data);

  //concert data is just the full .json string right now, so figure out how to destructure the .json data

  console.log('Set List =', setList);

  return (
    <View style={styles.container}>
      <ConcertScreen
        artistName={artistName}
        venue={venue}
        address={address}
        date={formattedDate}
        setList={setListSongs}  // Convert to array if needed
        videoThumbnails={''}  // Convert to array if needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

export default ArtistName;
