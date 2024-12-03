import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native';
import { Video } from 'expo-av';

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profileImage} source={{ uri: 'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
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
    color: '#333',
  },
  joinedDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  userStats: {
    fontSize: 14,
    color: '#555',
  },
  followButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 12,
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  videoCard: {
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  videoPlayer: {
    width: '100%', // Full width
    height: 200,   // Adjust height proportionally
  },
  videoDescription: {
    fontSize: 12,
    color: '#333',
    padding: 8,
  },
  videoDate: {
    fontSize: 12,
    color: '#666',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  setlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  setlistDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  setlistSongs: {
    fontSize: 14,
    color: '#555',
  },
  seeMoreText: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default ProfileScreen;
