import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import EventScreen from './components/Map'; 

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <EventScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
