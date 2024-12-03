import * as React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'left', justifyContent: 'left', backgroundColor: "#c2b9b6" }}>
      <Text>{'\n'}</Text>
      <TouchableHighlight
        onPress={() => navigation.navigate('Profile Settings')}
        activeOpacity={0.6}
        underlayColor='blue'
      >
        <Text style={styles.button}>Profile Settings</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate('Account Settings')}
        activeOpacity={0.6}
        underlayColor='blue'
      >
        <Text style={styles.button}>Account Settings</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate('Followed Artists')}
        activeOpacity={0.6}
        underlayColor='blue'
      >
        <Text style={styles.button}>Followed Artists</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate('Saved Videos')}
        activeOpacity={0.6}
        underlayColor='blue'
      >
        <Text style={styles.button}>Saved Videos</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate('Saved Setlists')}
        activeOpacity={0.6}
        underlayColor='blue'
      >
        <Text style={styles.button}>Saved Setlists</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate('Liked Photos')}
        activeOpacity={0.6}
        underlayColor='blue'
      >
        <Text style={styles.button}>Liked Photos</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate('Connect')}
        activeOpacity={0.6}
        underlayColor='blue'
      >
        <Text style={styles.button}>Connect to Streaming Services</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate('Notifications')}
        activeOpacity={0.6}
        underlayColor='blue'
      >
        <Text style={styles.button}>Notifications</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2b9b6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "left",
    backgroundColor: "#c2b9b6",
    padding: 10,
    fontSize: 20
  },
});


export default SettingsScreen;
