import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profileImage} source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} />
        <View>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.joinedDate}>JOINED MM/DD/YYYY</Text>
          <Text style={styles.userStats}># Set lists made</Text>
          <Text style={styles.userStats}># Videos posted</Text>
          <Text style={styles.userStats}># Photos posted</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Videos</Text>
      <ScrollView horizontal style={styles.horizontalScroll}>
        <View style={styles.videoCard}>
          <Image style={styles.videoImage} source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} />
          <Text style={styles.videoDescription}>Cool Band Live | Albany, NY</Text>
          <Text style={styles.videoDate}>11.17.22</Text>
        </View>
      </ScrollView>

      <Text style={styles.sectionTitle}>Photos</Text>
      <ScrollView horizontal style={styles.horizontalScroll}>
        <Image style={styles.photoImage} source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} />
        <Image style={styles.photoImage} source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} />
        <Image style={styles.photoImage} source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} />
      </ScrollView>
      <TouchableOpacity>
        <Text style={styles.seeMoreText}>SEE MORE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={ProfileScreen} />
      <Tab.Screen name="Explore" component={ProfileScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

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
  videoImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
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
  seeMoreText: {
    color: 'blue',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
