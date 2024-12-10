import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style = {styles.header}>
          <Text>{'\n'}</Text>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>View Preferences Here</Text>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile Settings')}
            activeOpacity={0.6}
            underlayColor='blue'
          >
            <Text style={styles.button}>Profile Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Followed Artists')}
            activeOpacity={0.6}
            underlayColor='blue'
          >
            <Text style={styles.button}>Followed Artists</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Saved Videos')}
            activeOpacity={0.6}
            underlayColor='blue'
          >
            <Text style={styles.button}>Saved Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Saved Setlists')}
            activeOpacity={0.6}
            underlayColor='blue'
          >
            <Text style={styles.button}>Saved Setlists</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Liked Photos')}
            activeOpacity={0.6}
            underlayColor='blue'
          >
            <Text style={styles.button}>Liked Photos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Connect')}
              activeOpacity={0.6}
              underlayColor='blue'
            >
              <Text style={styles.button}>Connect to Streaming Services</Text>
            </TouchableOpacity>
            
            <Text>{'\n'}</Text>
            <Text style={styles.sectionHeaderText}>Privacy</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Account Settings')}
              activeOpacity={0.6}
              underlayColor='blue'
            >
              <Text style={styles.button}>Account Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              activeOpacity={0.6}
              underlayColor='blue'
            >
              <Text style={styles.button}>Notifications</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  header:{
    paddingHorizontal:24,
    marginBottom: 12,
  },
  title:{
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle:{
    fontSize:15,
    fontWeight: '500',
    color: '#929292',
  },
  button: {
    alignItems: "left",
    padding: 10,
    fontSize: 17,
    fontWeight: '500'
  },
  section: {
    paddingTop: 12
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2
  },
  }
);


export default SettingsScreen;
