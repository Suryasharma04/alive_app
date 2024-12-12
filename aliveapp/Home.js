//ALive Home Page

import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import ArtistPage from './ArtistPage.js';
import * as SetLists from './SetLists';
import ArtistName from './SetLists/ArtistName';
import UpcomingShow from './UpcomingShows/UpcomingShows';
import artistProfileImage from './assets/artist_profile.jpg';
import bwConcertImage from './assets/bwConcert.jpg';
import imageBackgroundImage from './assets/image_background.jpg';
import austinNeillImage from './assets/austin-neill-247047-unsplash.jpg';
import backgroundImage from './assets/bwConcert.jpg';

const Stack = createStackNavigator();

export default function Home() {

  let artistSetLists = [
    { picture: { uri: "https://www.jambase.com/wp-content/uploads/2024/02/goose-1480x832.png" }, name: "Goose", date: "11.12.2024" },
    { picture: { uri: "https://www.jambase.com/wp-content/uploads/2015/09/dead-company-may-2023-blakesberg-1480x832.jpg" }, name: "Dead & Company", date: "8.3.2024" },
    { picture: { uri: "https://www.jambase.com/wp-content/uploads/2015/06/above-and-beyond-profile-1480x832.jpg" }, name: "Above & Beyond", date: "3.17.2024" },
    { picture: { uri: artistProfileImage }, name: "The Cherry Blues Project", date: "1.25.2014" },
  ]

  let artistVideos = [
    { picture: { uri: bwConcertImage }, title: "Video Title", date: "1.1.24" },
    { picture: { uri: imageBackgroundImage }, title: "Epic Band Live", date: "2.24.23" },
    { picture: { uri: austinNeillImage }, title: "The Band Live", date: "6.27.24" },
  ];

  let artistUpcomingShows = [
    { picture: { uri: "https://www.jambase.com/wp-content/uploads/2024/02/goose-1480x832.png" }, name: "Goose", venue: "Moody Center", date: "12.31.2024" },
    { picture: { uri: "https://www.jambase.com/wp-content/uploads/2015/09/dead-company-may-2023-blakesberg-1480x832.jpg" }, name: "Dead & Company", venue: "Sphere", date: "3.20.2025" },
    { picture: { uri: "https://www.jambase.com/wp-content/uploads/2015/06/the-killers-profile-1480x832.jpg" }, name: "The Killers", venue: "The Colosseum at Caesars Palace", date: "1.22.2025" },
    { picture: { uri: "https://www.jambase.com/wp-content/uploads/2017/04/maroon-5-maroon-5-f3491cea-b4a8-4bb9-bd89-6ab70de13c5c_204431_TABLET_LANDSCAPE_LARGE_16_9-1480x832.jpg" }, name: "Maroon 5", venue: "Hard Rock Live", date: "12.28.2024" },
  ]

  const [artist, setArtist] = useState(artistSetLists)
  const [selectedArtist, setSelectedArtist] = useState(null);

  const Stack = createNativeStackNavigator();

  const handleMusicianPress = (artist) => {
    setSelectedArtist(artist);
  };

  const goToSetList = (item) => {
    const [month, day, year] = item.date.split('.');
    const showDate = year.concat("-", month, "-", day);

    console.log("name: ", item.name);
    console.log("date:", showDate);

    navigation.navigate('ArtistName', {
      artist: item.name,
      dateOfShow: showDate,
    });
  };

  const goToUpcomingShow = (item) => {
    const [month, day, year] = item.date.split('.');
    const showDate = year.concat("-", month, "-", day);

    console.log("name: ", item.name);
    console.log("venue:", item.venue);
    console.log("date:", showDate);

    navigation.navigate('UpcomingShow', {
      artist: item.name,
      showVenue: item.venue,
      dateOfShow: showDate,
    });
  };

  const goToArtist = (item) => {
    console.log("name: ", item.name);
    navigation.navigate("ArtistPage", { artistName: item.name });
  };



  const _renderSetLists = ({ item }) => (
    <TouchableOpacity onPress={() => goToSetList(item)}>
      <View style={styles.setList}>
        <Image
          source={item.picture}
          style={styles.profilePicture}
        />
        <View style={styles.textContainer}>
          <Text style={styles.artistName}>{item.name}</Text>
          <Text style={styles.text}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const _renderArtists = ({ item }) => (
    <TouchableOpacity onPress={() => goToArtist(item)}>
      <View style={styles.artist}>
        <Image
          source={item.picture}
          style={styles.artistPic}
        />
        <View style={styles.textContainer}>
          <Text style={styles.artistName2}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const _renderVideos = ({ item }) => (
    <TouchableOpacity onPress={() => goToVideos(item)}>
      <View style={styles.video}>
        <Image
          source={item.picture.uri}
          style={styles.videoCover}
        />
        <View style={styles.videoText}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.videoName}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const _renderUpcomingShows = ({ item }) => {
    console.log("Rendering items:", item);
    return (
      <TouchableOpacity onPress={() => goToUpcomingShow(item)}>
        <View style={styles.upcomingShow}>
          <Image
            source={item.picture}
            style={styles.upcomingShowPic}
          />
          <View style={styles.textContainer}>
            <Text style={styles.artistName}>{item.name}</Text>
            <Text style={styles.text2}>{item.venue}</Text>
            <Text style={styles.text}>{item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        blurRadius={3}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.recent}>Recent Set Lists</Text>
          <FlatList
            data={artistSetLists}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
            renderItem={_renderSetLists}
            keyExtractor={(item, index) => index.toString()}
          />

          <Text style={styles.recent}>Recent Videos</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            <FlatList
              data={artistVideos}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer}
              scrollEnabled={false}
              renderItem={_renderVideos}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>

          <Text style={styles.recent}>Recent Artists</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            <FlatList
              data={artistSetLists}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer}
              scrollEnabled={false}
              renderItem={_renderArtists}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
          <Text style={styles.recent}>Favorited Upcoming Shows</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            <FlatList
              data={artistUpcomingShows}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer}
              scrollEnabled={false}
              renderItem={_renderUpcomingShows}
              keyExtractor={(item, index) => `${item.name}-${index}`}
            />
          </ScrollView>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 30,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  recent: {
    fontFamily: 'Geologica',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#fff',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  horizontalScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  setList: {
    flexDirection: 'row',
    backgroundColor: '#000',
    width: 250,
    height: 90,
    padding: 20,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#eb4634',
    overflow: 'hidden',
    alignItems: 'center',
  },
  upcomingShow: {
    flexDirection: 'row',
    backgroundColor: '#000',
    width: 250,
    height: 110,
    padding: 20,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#eb4634',
    overflow: 'hidden',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10, // Space between image and text
    maxWidth: 173,
  },
  artistName: {
    color: '#fff',
    fontFamily: 'Geologica',
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    width: '100%',
  },
  videoName: {
    color: '#fff',
    fontFamily: 'Geologica',
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  text: {
    color: '#fff',
    fontFamily: 'Geologica',
    fontSize: 16,
  },
  text2: {
    color: '#fff',
    fontFamily: 'Geologica',

    fontSize: 18,
  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 25, // Make it circular
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  upcomingShowPic: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make it circular
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  video: {
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: 300,
    height: 210,
    padding: 7,
    marginRight: 10,
    marginLeft: -30,
    borderColor: '#eb4634',
    overflow: 'hidden',
    alignItems: 'center',
  },
  videoCover: {
    width: 260,
    height: 160,
    borderRadius: 5,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  videoText: {
    backgroundColor: 'gray',
    flexDirection: 'row',      // Arrange items vertically
    alignItems: 'flex-start',     // Align contents to the left
    paddingHorizontal: 5,        // Optional: add horizontal padding if needed
    paddingVertical: 5,
    width: '93%',
    borderRadius: 20,
  },
  date: {
    width: 60,               // Define width to create a more rounded effect
    height: 30,              // Define height to ensure the shape
    borderRadius: 15,        // Half of height for full rounding
    backgroundColor: '#ddd',
    justifyContent: 'center', // Center vertically
    alignItems: 'center',    // Center horizontally
    textAlign: 'center',     // Ensure the text is centered horizontally
    paddingVertical: 7,
    overflow: 'hidden',
    fontFamily: 'Geologica',
    display: 'flex',         // Add flexbox to the container to center the text
  },
  artist: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  artistPic: {
    width: 100,
    height: 100,
    borderRadius: 50, // Half of width/height for full circle
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 100,
  },
  artistName2: {
    color: '#fff',
    fontFamily: 'Geologica',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10, // Space between image and text
    textAlign: 'center', // Center the text itself
  },
});
