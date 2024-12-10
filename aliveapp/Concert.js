import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker
import Icon from 'react-native-vector-icons/Ionicons';

const Concert = ({ route }) => {
  const { concert } = route.params; // Access the concert data passed from ExplorePage
  
  // Example coordinates for the venue (you can replace this with dynamic data from your API)
  const latitude = 40.8136;
  const longitude = -74.0749;

  return (
    <ScrollView style={styles.container}>
      {/* Concert Info */}
      <View style={styles.infoContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          style={styles.image}
        />
        <Text style={styles.venue}>{concert.venue || 'MetLife Stadium'}</Text>
        <Text style={styles.address}>{concert.address || 'One MetLife Stadium Dr, East Rutherford, NJ 07073'}</Text>
        <Text style={styles.date}>{concert.date || 'Sept. 8th, 2024'}</Text>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,  // Concert venue latitude
          longitude: longitude, // Concert venue longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Concert Venue" description="MetLife Stadium" />
      </MapView>

      {/* Set List */}
      <View style={styles.setListContainer}>
        <Text style={styles.setListTitle}>Set List</Text>
        <View style={styles.setList}>
          {concert.setList?.map((song, index) => (
            <Text key={index} style={[styles.songName, song.encore && styles.encore]}>
              {index + 1}. {song.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Videos */}
      <Text style={styles.videosTitle}>Videos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videoContainer}>
        {concert.videoThumbnails?.map((thumbnail, index) => (
          <Image
            key={index}
            source={{ uri: thumbnail }}
            style={styles.videoThumbnail}
          />
        ))}
      </ScrollView>
    </ScrollView>
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
  map: {
    width: '100%',
    height: 300,
    marginVertical: 16,
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

export default Concert;
