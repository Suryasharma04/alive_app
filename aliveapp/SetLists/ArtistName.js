import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import ConcertScreen from '../components/Concert';

const ArtistName = () => {
  const [concertData, setConcertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aName, setArtistName] = useState('Above & Beyond'); // Example artist
  const [showDate, setDate] = useState('2024-07-21'); // Example date (in YYYY-MM-DD format)

  useEffect(() => {
    const fetchConcertData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/setlists', {
          params: { artistName: aName, date: showDate }, // Use correct variable names
        });
        setConcertData(response.data);
      } catch (error) {
        console.error('Error fetching concert data:', error.message);
        setError('Failed to fetch concert data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchConcertData();
  }, [aName, showDate]); // Refetch data when artistName or date changes

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!concertData || concertData.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No concert data available.</Text>
      </View>
    );
  }

  const { artistName, venue, address, date, setList, videos } = concertData[0]; 

  return (
    <View style={styles.container}>
      <ConcertScreen 
        artistName={aName}
        venue={venue}
        address={address}
        date={showDate}
        setList={setList.split(',')}  // Convert to array if needed
        videoThumbnails={videos.split(',')}  // Convert to array if needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  navBar: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoContainer: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
  venue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  address: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  setListContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  setListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  setList: {
    paddingHorizontal: 8,
  },
  songName: {
    fontSize: 16,
    color: '#fff',
    paddingVertical: 4,
  },
  encore: {
    fontWeight: 'bold',
  },
  videosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
  },
  videoContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  videoThumbnail: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
});


export default ArtistName;
