import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Ionicons from '@react-native-vector-icons/ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Home from './Home.js';
import ArtistPage from './ArtistPage.js';
import ProfileScreen from './Profile.js';
import ExplorePage from './App_Explore.js';

// function ExploreScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Explore!</Text>
//     </View>
//   );
// }

// function ProfileScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} // Hide the header to get rid of the white bar
      />
      <Stack.Screen 
        name="ArtistPage" 
        component={ArtistPage} 
      />
    </Stack.Navigator>
  );
}


export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-sharp' : 'home-outline';
                return <Ionicons name={iconName} size={24} color={color} />
            }
            else if (route.name === 'Explore') {
              iconName = focused ? 'search' : 'search1';
              return focused
                ? <FontAwesome name={iconName} size={24} color={color} />
                : <AntDesign name={iconName} size={24} color={color} />;
            }
            else if (route.name === 'Profile') {
              iconName = focused ? 'user-alt' : 'user';
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            }
            else if (route.name === 'Settings') {
              iconName = focused ? 'settings-sharp' : 'settings-outline';
              return <Ionicons name={iconName} size={24} color={color} />
            }
            // You can return any component that you like here!
            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Explore" component={ExplorePage} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

