import React from 'react';
import { View, StyleSheet } from 'react-native';
import ConcertScreen from '../components/Concert';

const setList = () => {
  // Sample data for setList and video thumbnails
  const sampleSetList = [
    { name: "Welcome to New York" },
    { name: "Blank Space" },
    { name: "Style" },
    { name: "Out of the Woods" },
    { name: "All You Had to Do Was Stay" },
    { name: "Shake It Off", encore: true },
    { name: "Bad Blood" },
    { name: "Wildest Dreams" },
    { name: "How You Get the Girl" },
    { name: "This Love" },
    { name: "I Know Places" }
  ];

  const sampleThumbnails = [
    'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (
    <View style={styles.container}>
      <ConcertScreen
        artistName="Taylor Swift"
        venue="MetLife Stadium"
        address="One MetLife Stadium Dr, East Rutherford, NJ 07073"
        date="Sept. 8th, 2024"
        setList={sampleSetList}
        videoThumbnails={sampleThumbnails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default setList;
