// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// //import Ionicons from '@react-native-vector-icons/ionicons';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import Home from './Home.js';
// import ArtistPage from './ArtistPage.js';
// import ProfileScreen from './Profile.js';
// import ExplorePage from './App_Explore.js';
// import SettingsScreen from './Settings.js';
// import ArtistName from './SetLists/ArtistName';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={({ route }) => ({
//         title: route.name, // Default to screen name
//       })}>
//       <Stack.Screen
//         name="Home"
//         component={Home}
//       //options={{ headerShown: false }} // Hide the header to get rid of the white bar
//       />
//       <Stack.Screen
//         name="ArtistPage"
//         component={ArtistPage}
//       //options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="DynamicSetList"
//         component={({ route }) => {
//           const Component = route.params.component; // Retrieve the dynamically imported component
//           return <Component item={route.params.item} />;
//         }}
//         //options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ArtistName"
//         component={ArtistName}/>
//     </Stack.Navigator>
//   );
// }

// function ExploreFunction() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Explore"
//         component={ExplorePage}
//       />
//     </Stack.Navigator>
//   )
// }

// function ProfileFunction() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//       />
//     </Stack.Navigator>
//   )
// }

// // Settings Pages

// function ProfileSettingsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <Text style={{ fontSize: 30, color: 'black' }}>Profile Settings</Text>
//     </View>
//   );
// }

// function AccountSettingsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <Text style={{ fontSize: 30, color: 'black' }}>Account Settings</Text>
//     </View>
//   );
// }

// function FollowedArtistsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <Text style={{ fontSize: 30, color: 'black' }}>Followed Artists</Text>
//     </View>
//   );
// }

// function SavedVideosScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <Text style={{ fontSize: 30, color: 'black' }}>Saved Videos</Text>
//     </View>
//   );
// }

// function SavedSetlistsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <Text style={{ fontSize: 30, color: 'black' }}>Saved Setlists</Text>
//     </View>
//   );
// }

// function LikedPhotosScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <Text style={{ fontSize: 30, color: 'black' }}>Liked Photos</Text>
//     </View>
//   );
// }

// function ConnectScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <Text style={{ fontSize: 30, color: 'black' }}>Connect to Streaming Services</Text>
//     </View>
//   );
// }

// function NotificationsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <Text style={{ fontSize: 30, color: 'black' }}>Notifications</Text>
//     </View>
//   );
// }


// function SettingsPage() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Settings"
//         component={SettingsScreen}
//       />
//       <Stack.Screen
//         name="Profile Settings"
//         component={ProfileSettingsScreen}
//         options={{ title: 'Profile Settings' }}
//       />
//       <Stack.Screen
//         name="Account Settings"
//         component={AccountSettingsScreen}
//         options={{ title: 'Account Settings' }}
//       />
//       <Stack.Screen
//         name="Followed Artists"
//         component={FollowedArtistsScreen}
//         options={{ title: 'Followed Artists' }}
//       />
//       <Stack.Screen
//         name="Saved Videos"
//         component={SavedVideosScreen}
//         options={{ title: 'Saved Videos' }}
//       />
//       <Stack.Screen
//         name="Saved Setlists"
//         component={SavedSetlistsScreen}
//         options={{ title: 'Saved Setlists' }}
//       />
//       <Stack.Screen
//         name="Liked Photos"
//         component={LikedPhotosScreen}
//         options={{ title: 'Liked Photos' }}
//       />
//       <Stack.Screen
//         name="Connect"
//         component={ConnectScreen}
//         options={{ title: 'Connect to Streaming Services' }}
//       />
//       <Stack.Screen
//         name="Notifications"
//         component={NotificationsScreen}
//         options={{ title: 'Notifications' }}
//       />
//     </Stack.Navigator>
//   );
// }


// export default function App() {

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused
//                 ? 'home-sharp' : 'home-outline';
//               return <Ionicons name={iconName} size={24} color={color} />
//             }
//             else if (route.name === 'Explore') {
//               iconName = focused ? 'search' : 'search1';
//               return focused
//                 ? <FontAwesome name={iconName} size={24} color={color} />
//                 : <AntDesign name={iconName} size={24} color={color} />;
//             }
//             else if (route.name === 'Profile') {
//               iconName = focused ? 'user-alt' : 'user';
//               return <FontAwesome5 name={iconName} size={size} color={color} />;
//             }
//             else if (route.name === 'Settings') {
//               iconName = focused ? 'settings-sharp' : 'settings-outline';
//               return <Ionicons name={iconName} size={24} color={color} />
//             }
//             // You can return any component that you like here!
//             return <AntDesign name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'purple',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen
//           name="Home"
//           component={HomeStack}
//           options={{ headerShown: false }}
//         />
//         <Tab.Screen
//           name="Explore"
//           component={ExploreFunction}
//           options={{ headerShown: false }}

//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileFunction}
//           options={{ headerShown: false }}
//         />
//         <Tab.Screen
//           name="Settings"
//           component={SettingsPage}
//           options={{ headerShown: false }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

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
import SettingsScreen from './Settings.js';
import ArtistName from './SetLists/ArtistName';
// import ArtistPage from './ArtistPage.js'
// Import your new screens
import ExplorePage from './App_Explore.js';
import Concert from './Concert';
import UpcomingShow from './UpcomingShows/UpcomingShows.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for the Explore tab
function ExploreStack() {
  return (
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen name="Explore" component={ExplorePage} />
      <Stack.Screen name="Concert" component={Concert} />
      <Stack.Screen name="ArtistPage" component={ArtistPage} />
    </Stack.Navigator>
  );
}

// Other stack navigators (Home, Profile, etc.) remain the same
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        title: route.name, // Default to screen name
      })}>
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="ArtistPage"
        component={ArtistPage}
      />
      <Stack.Screen
        name="DynamicSetList"
        component={({ route }) => {
          const Component = route.params.component;
          return <Component item={route.params.item} />;
        }}
      />
      <Stack.Screen
        name="ArtistName"
        component={ArtistName} />
      <Stack.Screen
        name="UpcomingShow"
        component={UpcomingShow} />
    </Stack.Navigator>
  );
}

function ProfileFunction() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

// Settings Pages (no changes here)
function SettingsPage() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      {/* Add other settings screens here */}
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
              iconName = focused ? 'home-sharp' : 'home-outline';
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
            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreStack} // Use the new ExploreStack navigator here
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileFunction}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsPage}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
