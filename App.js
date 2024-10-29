//ALive - Artist Page Screen

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native';

export default function App() {
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
          <Text style={styles.artist}>Artist Name</Text>
          <View style={styles.setList}>
            <Text style={styles.text}>Set Lists</Text>
          </View>
          <View style={styles.upcomingShows}>
            <Text style={styles.text}>Upcoming Shows</Text>
          </View>
          <View style={styles.tagged}>
            <Text style={styles.text}>Tagged</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    position: 'absolute',
    top: 75,
    borderRadius: 200,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 100,
    overflow: 'hidden',
  },
  artist: {
    position: 'absolute',
    top: 280,
    fontFamily: 'Geologica',
    fontWeight: 'bold',
    fontSize: 50,
  },
  setList: {
    backgroundColor: '#000',
    width: 360,
    height: 230,
    position: 'absolute',
    top: 340,
    padding: 10,
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
    position: 'absolute',
    bottom: 20,
    padding: 10,
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
    position: 'absolute',
    bottom: -230,
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
  }
});
