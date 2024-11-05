import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ConcertScreen = ({
    artistName = 'Artist Name',
    venue = 'MetLife Stadium',
    address = 'One MetLife Stadium Dr, East Rutherford, NJ 07073',
    date = 'Sept. 8th, 2024',
    setList = [],
    videoThumbnails = [] 
  }) => {
    return (
      <ScrollView style={styles.container}>
      
        <View style={styles.navBar}>
          <Icon name="arrow-back" size={24} color="#000" />
          <Text style={styles.artistName}>Back</Text>
        </View>
  
        <View style={styles.infoContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.image}
          />
          <Text style={styles.venue}>{venue}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
  
     
        <View style={styles.setListContainer}>
          <Text style={styles.setListTitle}>Set List</Text>
          <View style={styles.setList}>
            {setList.map((song, index) => (
              <Text key={index} style={[styles.songName, song.encore && styles.encore]}>
                {index + 1}. {song.name}
              </Text>
            ))}
          </View>
        </View>
  
        <Text style={styles.videosTitle}>Videos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videoContainer}>
          {videoThumbnails.map((thumbnail, index) => (
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

export default ConcertScreen;
