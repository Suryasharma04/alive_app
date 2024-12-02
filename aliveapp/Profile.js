// import React from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function ProfileScreen () {
//   return (
//     <ScrollView style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/100' }} />
//         <View>
//           <Text style={styles.username}>Username</Text>
//           <Text style={styles.joinedDate}>JOINED MM/DD/YYYY</Text>
//           <Text style={styles.userStats}># Set lists made</Text>
//           <Text style={styles.userStats}># Videos posted</Text>
//           <Text style={styles.userStats}># Photos posted</Text>
//         </View>
//       </View>

//       {/* Videos Section */}
//       <Text style={styles.sectionTitle}>Videos</Text>
//       <ScrollView horizontal style={styles.horizontalScroll}>
//         <View style={styles.videoCard}>
//           <Image style={styles.videoImage} source={{ uri: 'https://via.placeholder.com/150' }} />
//           <Text style={styles.videoDescription}>Cool Band Live | Albany, NY</Text>
//           <Text style={styles.videoDate}>11.17.22</Text>
//         </View>
//         {/* Add more video cards as needed */}
//       </ScrollView>

//       {/* Photos Section */}
//       <Text style={styles.sectionTitle}>Photos</Text>
//       <ScrollView horizontal style={styles.horizontalScroll}>
//         <Image style={styles.photoImage} source={{ uri: 'https://via.placeholder.com/100' }} />
//         <Image style={styles.photoImage} source={{ uri: 'https://via.placeholder.com/100' }} />
//         <Image style={styles.photoImage} source={{ uri: 'https://via.placeholder.com/100' }} />
//         {/* Add more photos as needed */}
//       </ScrollView>
//       <TouchableOpacity>
//         <Text style={styles.seeMoreText}>SEE MORE</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// // Bottom Tab Navigator
// // const Tab = createBottomTabNavigator();

// // function MyTabs() {
// //   return (
// //     <Tab.Navigator
// //       screenOptions={({ route }) => ({
// //         tabBarIcon: ({ focused, color, size }) => {
// //           let iconName;

// //           if (route.name === 'Home') {
// //             iconName = focused ? 'home' : 'home-outline';
// //           } else if (route.name === 'Explore') {
// //             iconName = focused ? 'search' : 'search-outline';
// //           } else if (route.name === 'Profile') {
// //             iconName = focused ? 'person' : 'person-outline';
// //           } else if (route.name === 'Settings') {
// //             iconName = focused ? 'settings' : 'settings-outline';
// //           }

// //           return <Icon name={iconName} size={size} color={color} />;
// //         },
// //         tabBarActiveTintColor: 'black',
// //         tabBarInactiveTintColor: 'gray',
// //       })}
// //     >
// //       <Tab.Screen name="Home" component={ProfileScreen} />
// //       <Tab.Screen name="Explore" component={ProfileScreen} />
// //       <Tab.Screen name="Profile" component={ProfileScreen} />
// //       <Tab.Screen name="Settings" component={ProfileScreen} />
// //     </Tab.Navigator>
// //   );
// // }

// // export default function Profile() {
// //   return (
// //     <NavigationContainer>
// //       <MyTabs />
// //     </NavigationContainer>
// //   );
// // }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     backgroundColor: '#f3f3f3',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#e9e9e9',
//     borderRadius: 10,
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginRight: 16,
//   },
//   username: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   joinedDate: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   userStats: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   horizontalScroll: {
//     marginVertical: 10,
//   },
//   videoCard: {
//     marginRight: 10,
//     width: 150,
//   },
//   videoImage: {
//     width: '100%',
//     height: 100,
//     borderRadius: 10,
//   },
//   videoDescription: {
//     fontSize: 12,
//     marginTop: 5,
//   },
//   videoDate: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   photoImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   seeMoreText: {
//     color: 'blue',
//     marginTop: 10,
//     fontWeight: 'bold',
//   },
// });

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Video } from 'expo-av';

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
        style={styles.videoPlayer}
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

  // Sample data for setlists
  const setlists = [
    { id: '1', name: 'Concert in the Park', date: '11.01.22', songs: ['Song A', 'Song B', 'Song C'] },
    { id: '2', name: 'Live at the Arena', date: '11.10.22', songs: ['Song D', 'Song E', 'Song F'] },
    { id: '3', name: 'Summer Festival', date: '12.05.22', songs: ['Song G', 'Song H', 'Song I'] },
  ];

  // Render function for each setlist item
  const renderSetlistItem = ({ item }) => (
    <View style={styles.setlistCard}>
      <Text style={styles.setlistTitle}>{item.name}</Text>
      <Text style={styles.setlistDate}>{item.date}</Text>
      <Text style={styles.setlistSongs}>Songs: {item.songs.join(', ')}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image style={styles.profileImage} source={{ uri: 'https://images.unsplash.com/photo-1731596691311-5955c052b66e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} />
        <View>
          <Text style={styles.username}> Username</Text>
          <Text style={styles.joinedDate}> JOINED date</Text>
          <Text style={styles.userStats}> 10 Set lists made</Text>
          <Text style={styles.userStats}> 1 Videos posted</Text>
          <Text style={styles.userStats}> 4 Photos posted</Text>
        </View>
        <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
          <Text style={styles.followButtonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
        </TouchableOpacity>
      </View>

      {/* Videos Section */}
      <Text style={styles.sectionTitle}>Videos</Text>
      <ScrollView horizontal style={styles.horizontalScroll}>
        <VideoCard
          videoUri="https://www.w3schools.com/html/mov_bbb.mp4"
          description="Cool Band Live | Albany, NY"
          date="11.17.22"
        />
        {/* Add more VideoCard components if needed */}
      </ScrollView>

      {/* Photos Section */}
      <Text style={styles.sectionTitle}>Photos</Text>
      <PhotoRow
        photoUris={[
          'https://images.unsplash.com/photo-1731596691311-5955c052b66e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1731596691311-5955c052b66e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1731596691311-5955c052b66e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]}
      />

      {/* Setlists Section */}
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
    paddingHorizontal: 16,
    backgroundColor: '#f3f3f3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  joinedDate: {
    fontSize: 12,
    color: 'gray',
  },
  userStats: {
    fontSize: 12,
    color: 'gray',
  },
  followButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  horizontalScroll: {
    marginVertical: 10,
  },
  videoCard: {
    marginRight: 10,
    width: 150,
  },
  videoPlayer: {
    width: 150,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  videoDescription: {
    fontSize: 12,
    marginTop: 5,
  },
  videoDate: {
    fontSize: 12,
    color: 'gray',
  },
  photoImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  setlistContainer: {
    paddingVertical: 10,
  },
  setlistCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  setlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  setlistDate: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  setlistSongs: {
    fontSize: 12,
    color: '#666',
  },
  seeMoreText: {
    color: 'blue',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
