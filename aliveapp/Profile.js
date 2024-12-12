import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, ImageBackground } from 'react-native';
import { Video } from 'expo-av';
import { BlurView } from '@react-native-community/blur'; // Import the BlurView

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    Alert.alert(isFollowing ? 'Unfollowed' : 'Followed', 'You have updated your following status.');
  };

  const handleSeeMore = () => {
    Alert.alert('See More', 'Navigating to full gallery...');
  };

  const VideoCard = ({ videoUri, description, date }) => (
    <View style={styles.videoCard}>
      <Video
        style={[styles.videoPlayer, { width: width - 32, height: (width - 32) * 0.56 }]} // responsive video size
        source={{ uri: videoUri }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <Text style={styles.videoDescription}>{description}</Text>
      <Text style={styles.videoDate}>{date}</Text>
    </View>
  );

  const PhotoRow = ({ photoUris }) => (
    <ScrollView horizontal style={styles.horizontalScroll}>
      {photoUris.map((uri, index) => (
        <Image key={index} style={styles.photoImage} source={{ uri }} />
      ))}
    </ScrollView>
  );

  const setlists = [
    { id: '1', name: 'Concert in the Park', date: '11.01.22', songs: ['Song A', 'Song B', 'Song C'] },
    { id: '2', name: 'Live at the Arena', date: '11.10.22', songs: ['Song D', 'Song E', 'Song F'] },
    { id: '3', name: 'Summer Festival', date: '12.05.22', songs: ['Song G', 'Song H', 'Song I'] },
  ];

  const renderSetlistItem = ({ item }) => (
    <View style={styles.setlistCard}>
      <Text style={styles.setlistTitle}>{item.name}</Text>
      <Text style={styles.setlistDate}>{item.date}</Text>
      <Text style={styles.setlistSongs}>Songs: {item.songs.join(', ')}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('./assets/bwConcert.jpg')}  // Correctly reference the local image
        style={styles.backgroundImage}
        blurRadius={5} 
      >
        <BlurView
          style={styles.absolute} // Make sure it's absolutely positioned
          blurType="light"
          blurAmount={5} // Adjust the blur amount here
        />
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.profileImage} source={require('./assets/bwConcert.jpg')} />
            <View style={styles.profileInfo}>
              <Text style={styles.username}>Alice Doe</Text>
              <Text style={styles.joinedDate}>Joined: 01/02/2024</Text>
              <Text style={styles.userStats}>10 Setlists</Text>
              <Text style={styles.userStats}>1 Video</Text>
              <Text style={styles.userStats}>4 Photos</Text>
            </View>
            <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
              <Text style={styles.followButtonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Videos</Text>
          <ScrollView horizontal style={styles.horizontalScroll}>
            <VideoCard
              videoUri="https://www.w3schools.com/html/mov_bbb.mp4"
              description="Cool Band Live | Albany, NY"
              date="11.17.22"
            />
          </ScrollView>

          <Text style={styles.sectionTitle}>Photos</Text>
          <PhotoRow photoUris={['https://images.unsplash.com/photo-1709917241494-48fdf74f2640?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']} />

          <Text style={styles.sectionTitle}>Setlists</Text>
          <FlatList
            data={setlists}
            renderItem={renderSetlistItem}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.setlistContainer}
          />

          <TouchableOpacity onPress={handleSeeMore}>
            <Text style={styles.seeMoreText}>SEE MORE</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // dark background
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000', // black background
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#fff', // white shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // white text
  },
  joinedDate: {
    fontSize: 14,
    color: '#ccc', // light gray text
    marginVertical: 2,
  },
  userStats: {
    fontSize: 14,
    color: '#bbb', // light gray text
  },
  followButton: {
    backgroundColor: '#d32f2f', // red background
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff', // white text
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // white text
    marginVertical: 12,
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  videoCard: {
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333', // dark background for video card
    shadowColor: '#fff', // white shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
  },
  videoDescription: {
    fontSize: 12,
    color: '#fff', // white text
    padding: 8,
  },
  videoDate: {
    fontSize: 12,
    color: '#ccc', // light gray text
    padding: 8,
  },
  photoImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  setlistContainer: {
    paddingBottom: 16,
  },
  setlistCard: {
    backgroundColor: '#333', // dark background
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    shadowColor: '#fff', // white shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  setlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // white text
  },
  setlistDate: {
    fontSize: 14,
    color: '#ccc', // light gray text
    marginVertical: 4,
  },
  setlistSongs: {
    fontSize: 14,
    color: '#bbb', // light gray text
  },
  seeMoreText: {
    fontSize: 16,
    color: '#d32f2f', // red color
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default ProfileScreen;
