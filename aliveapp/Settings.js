import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {/* <Text style={styles.title}>Settings</Text> */}
          {/* <Text style={styles.subtitle}>View your preferences and manage your account</Text> */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeaderText}>Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile Settings')}
            activeOpacity={0.6}
            underlayColor='transparent'
            style={styles.button}
          >
            <Text style={styles.buttonText}>Profile Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Followed Artists')}
            activeOpacity={0.6}
            underlayColor='transparent'
            style={styles.button}
          >
            <Text style={styles.buttonText}>Followed Artists</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Saved Videos')}
            activeOpacity={0.6}
            underlayColor='transparent'
            style={styles.button}
          >
            <Text style={styles.buttonText}>Saved Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Saved Setlists')}
            activeOpacity={0.6}
            underlayColor='transparent'
            style={styles.button}
          >
            <Text style={styles.buttonText}>Saved Setlists</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Liked Photos')}
            activeOpacity={0.6}
            underlayColor='transparent'
            style={styles.button}
          >
            <Text style={styles.buttonText}>Liked Photos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Connect')}
            activeOpacity={0.6}
            underlayColor='transparent'
            style={styles.button}
          >
            <Text style={styles.buttonText}>Connect to Streaming Services</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeaderText}>Privacy</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Account Settings')}
            activeOpacity={0.6}
            underlayColor='transparent'
            style={styles.button}
          >
            <Text style={styles.buttonText}>Account Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.6}
            underlayColor='transparent'
            style={styles.button}
          >
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#777',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'left',
  },
});

export default SettingsScreen;
