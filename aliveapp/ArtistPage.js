//ALive - Artist Page Screen

import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useState, useContext } from 'react';
import SetListScreen from './SetLists/ArtistName.js';

const Stack = createNativeStackNavigator();

// Create Context
const ArtistContext = createContext();

// Custom Hook to use the ArtistContext
export const useArtist = () => {
  return useContext(ArtistContext);
};

// Provider component
export const ArtistProvider = ({ children }) => {
  const [artistName, setArtistName] = useState("Artist Name");

  return (
    <ArtistContext.Provider value={{ artistName, setArtistName }}>
      {children}
    </ArtistContext.Provider>
  );
};

const _renderSetLists = ({ item }, navigation) => (
  <TouchableOpacity onPress={() => navigation.navigate('SetList', { item })}>
    <View style={styles.item}>
      <Text
        style={styles.venue}
        numberOfLines={1}            // Limits to 1 line
        ellipsizeMode="tail"
      >{item.venue}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
    <View style={styles.horizontalLine2} />
  </TouchableOpacity>
);

const _renderUpcomingShows = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => goToShows(item, navigation)}>
    <View style={styles.item}>
      <Text
        style={styles.venue}
        numberOfLines={1}            // Limits to 1 line
        ellipsizeMode="tail"
      >{item.venue}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
    <View style={styles.horizontalLine2} />
  </TouchableOpacity>
);

const _renderAllSetLists = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => goToSetList(item, navigation)}>
    <View style={styles.item2}>
      <Text
        style={styles.venue}
        numberOfLines={1}            // Limits to 1 line
        ellipsizeMode="tail"
      >{item.venue}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
    <View style={styles.horizontalLine3} />
  </TouchableOpacity>
);

const _renderAllUpcomingShows = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => goToShows(item, navigation)}>
    <View style={styles.item2}>
      <Text
        style={styles.venue}
        numberOfLines={1}            // Limits to 1 line
        ellipsizeMode="tail"
      >{item.venue}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
    <View style={styles.horizontalLine3} />
  </TouchableOpacity>
);

function MoreSetListsScreen({ route, navigation }) {
  const { fullList } = route.params;  // Access the full list from the params

  return (
    <View style={styles.listPage}>
      <FlatList
        data={fullList}
        contentContainerStyle={styles.preview}
        renderItem={_renderAllSetLists}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function MoreUpcomingShowsScreen({ route, navigation }) {
  const { fullList } = route.params;  // Access the full list from the params

  return (
    <View style={styles.listPage}>
      <FlatList
        data={fullList}
        contentContainerStyle={styles.preview}
        renderItem={_renderAllUpcomingShows}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function ArtistPage({ navigation }) {

  const { artistName, setArtistName } = useArtist();

  let aPageSetLists = [
    { venue: "Great Venue, Ithaca NY", date: "10.13.24", page: "" },
    { venue: "Large Place, Brooklyn NY", date: "10.11.24", page: "" },
    { venue: "Cool Theater, Philadelphia PA", date: "10.8.24", page: "" },
    { venue: "Random Hall, Pittsburgh PA", date: "10.6.24", page: "" },
    { venue: "The Venue, Nashville TN", date: "10.2.24", page: "" },
  ]

  let aPageShows = [
    { venue: "The Real Stage, Boston MA", date: "10.16.24", page: "" },
    { venue: "Spectacular Place, Boston MA", date: "10.17.24", page: "" },
    { venue: "Another Venue, Montreal QC", date: "10.20.24", page: "" },
    { venue: "Cool Hall, Montreal QC", date: "10.22.24", page: "" },
    { venue: "The Venue, Toronto ON", date: "10.23.24", page: "" },
  ]

  const limitedSetLists = aPageSetLists.slice(0, 3);
  const limitedShows = aPageShows.slice(0, 3);

  const goToMoreSetLists = () => {
    //navigation.setOptions({ headerShown: false });
    navigation.navigate('MoreSetLists', { fullList: aPageSetLists });
  };
  const goToMoreShows = () => {
    //navigation.setOptions({ headerShown: false });
    navigation.navigate('MoreShows', { fullList: aPageShows });
  };

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false });  // Hide header on ArtistPage

  //   return () => {
  //     navigation.setOptions({ headerShown: true });  // Re-enable header when leaving this screen
  //   };
  // }, [navigation]);


  return (
    <ImageBackground
      source={require('./assets/image_background.jpg')}
      style={styles.backgroundImage}
      blurRadius={3}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Image
            source={require('./assets/artist_profile.jpg')}
            style={styles.profilePicture}
          />
          <Text style={styles.artist}>{artistName}</Text>
          <View style={styles.setList}>
            <Text style={styles.text}>Set Lists</Text>
            <View style={styles.horizontalLine} />
            <FlatList
              data={limitedSetLists}
              scrollEnabled={false}
              contentContainerStyle={styles.preview}
              renderItem={(item) => _renderSetLists(item, navigation)}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={goToMoreSetLists}>
              <Text style={styles.seeMore}>SEE MORE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.upcomingShows}>
            <Text style={styles.text}>Upcoming Shows</Text>
            <View style={styles.horizontalLine} />
            <FlatList
              data={limitedShows}
              scrollEnabled={false}
              contentContainerStyle={styles.preview}
              renderItem={_renderUpcomingShows}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={goToMoreShows}>
              <Text style={styles.seeMore}>SEE MORE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagged}>
            <Text style={styles.text}>Tagged</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <ArtistProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="ArtistPage"
          component={ArtistPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MoreSetLists"
          component={MoreSetListsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MoreShows"
          component={MoreUpcomingShowsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="SetList" component={SetListScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </ArtistProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  profilePicture: {
    width: 200,
    height: 200,
    flex: 1,
    borderRadius: 200,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 100,
    overflow: 'hidden',
    marginTop: 30,
  },
  artist: {
    flex: 1,
    fontFamily: 'Geologica',
    fontWeight: 'bold',
    fontSize: 50,
  },
  setList: {
    backgroundColor: '#000',
    width: 360,
    height: 230,
    flex: 1,
    //padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#eb4634',
    overflow: 'hidden',
  },
  upcomingShows: {
    backgroundColor: '#000',
    width: 360,
    height: 230,
    flex: 1,
    //padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#eb4634',
    overflow: 'hidden',
  },
  tagged: {
    backgroundColor: '#000',
    width: 360,
    height: 230,
    flex: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#eb4634',
    overflow: 'hidden',
  },
  text: {
    color: '#fff',
    fontFamily: 'Geologica',
    fontWeight: 'bold',
    fontSize: 30,
    position: 'absolute',
    top: 8,
    left: 15,
  },
  horizontalLine: {
    height: 1,            // Thin line
    backgroundColor: '#777', // Change color as needed
    width: '100%',        // Full width
    marginTop: 50,   // Adds spacing above and below the line
    marginBottom: 10,
  },
  horizontalLine2: {
    height: 1,            // Thin line
    backgroundColor: '#777', // Change color as needed
    width: '92%',        // Full width
    marginBottom: 7,
    alignSelf: 'center',
  },
  horizontalLine3: {
    height: 1,            // Thin line
    backgroundColor: '#777', // Change color as needed
    width: '100%',        // Full width
    marginBottom: 7,
    alignSelf: 'center',
  },
  venue: {
    color: '#fff',
    fontFamily: 'Geologica',
    fontSize: 20,
    flex: 1,
    textAlign: 'left',
    paddingLeft: 8,
    maxWidth: '70%',
  },
  date: {
    color: '#fff',
    fontFamily: 'Geologica',
    fontSize: 20,
    textAlign: 'right',
    paddingRight: 8,
  },
  preview: {
    alignItems: 'center',
    //paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',  // Vertically center-aligns text if needed
    width: '100%',
    paddingHorizontal: 10, // Adjust padding if you need a little space from edges
    marginBottom: 10,
  },
  item2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',  // Vertically center-aligns text if needed
    width: '100%',
    paddingHorizontal: 10, // Adjust padding if you need a little space from edges
    marginTop: 17,
    marginBottom: 27,
  },
  seeMore: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 15,
    paddingLeft: 15,
    //marginTop: 10,
    //fontWeight: 'bold',
  },
  listPage: {
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',  // Vertically center-aligns text if needed
    width: '100%',
    height: '100%',
    paddingTop: 10,
    marginBottom: 10,
  }
});
