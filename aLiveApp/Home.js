//ALive Home Page

import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ArtistPage from './ArtistPage';

const Stack = createStackNavigator();

export default function Home() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('./assets/bwConcert.jpg')}
                style={styles.backgroundImage}
                blurRadius={3}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.recent}>Recent Set Lists</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalScrollContainer}
                    >
                        <View style={styles.setList}>
                            <Image
                                source={require('./assets/artist_profile.jpg')}
                                style={styles.profilePicture}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.artistName}>Artist Name</Text>
                                <Text style={styles.text}>8.12.24</Text>
                            </View>
                        </View>
                        <View style={styles.setList}>
                            <Image
                                source={require('./assets/artist_profile.jpg')}
                                style={styles.profilePicture}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.artistName}>Artist Name 2</Text>
                                <Text style={styles.text}>5.10.22</Text>
                            </View>
                        </View>
                        <View style={styles.setList}>
                            <Image
                                source={require('./assets/artist_profile.jpg')}
                                style={styles.profilePicture}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.artistName}>The Artist</Text>
                                <Text style={styles.text}>1.1.23</Text>
                            </View>
                        </View>
                    </ScrollView>

                    <Text style={styles.recent}>Recent Videos</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalScrollContainer}
                    >
                        <View style={styles.video}>
                            <Image
                                source={require('./assets/concertPic1.jpg')}
                                style={styles.videoCover}
                            />
                            <View style={styles.videoText}>
                                <Text style={styles.date}>Date</Text>
                                <Text style={styles.artistName}>Video Title</Text>
                            </View>
                        </View>
                    </ScrollView>

                    <Text style={styles.recent}>Recent Artists</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalScrollContainer}
                    >
                        <View style={styles.artist}>
                            <TouchableOpacity onPress={() => navigation.navigate('ArtistPage')}>
                                <Image
                                    source={require('./assets/artist_profile.jpg')}
                                    style={styles.artistPic}
                                />
                            </TouchableOpacity>
                            <View style={styles.textContainer}>
                                <Text style={styles.artistName2}>Artist Name</Text>
                            </View>
                        </View>
                        <View style={styles.artist}>
                            <Image
                                source={require('./assets/artist_profile.jpg')}
                                style={styles.artistPic}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.artistName2}>Artist Name</Text>
                            </View>
                        </View>
                        <View style={styles.artist}>
                            <Image
                                source={require('./assets/artist_profile.jpg')}
                                style={styles.artistPic}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.artistName2}>Artist Name</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <Text style={styles.recent}>Favorited Shows</Text>
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
    textContainer: {
        marginLeft: 10, // Space between image and text
    },
    artistName: {
        color: '#fff',
        fontFamily: 'Geologica',
        fontWeight: 'bold',
        fontSize: 20,
    },
    text: {
        color: '#fff',
        fontFamily: 'Geologica',
        fontSize: 16,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20, // Make it circular
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    video: {
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        width: 275,
        height: 200,
        padding: 20,
        marginRight: 10,
        borderColor: '#eb4634',
        overflow: 'hidden',
        alignItems: 'center',
    },
    videoCover: {
        width: 220,
        height: 140,
        borderRadius: 5,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    videoText: {
        flexDirection: 'row',      // Arrange items vertically
        alignItems: 'flex-start',     // Align contents to the left
        paddingHorizontal: 10,        // Optional: add horizontal padding if needed
        paddingVertical: 5,
    },
    date: {
        width: 60, // Define width to create a more rounded effect
        height: 30, // Define height to ensure the shape
        borderRadius: 15, // Half of height for full rounding
        paddingVertical: 7, // Optional: Adjust padding to fit content better
        paddingHorizontal: 15, // Optional: Adjust horizontal padding for balance
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center', // Center the text within the date container
        overflow: 'hidden',
        fontFamily: 'Geologica',
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
