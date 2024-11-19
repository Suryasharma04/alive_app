import React from 'react';
import { View, StyleSheet } from 'react-native';
import ConcertScreen from '../components/Concert';

const setList = (artistName, venue, address, date, setList, videos) => {
  // Sample data for setList and video thumbnails

  const sampleThumbnails = [
    'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (
    <View style={styles.container}>
      <ConcertScreen
        artistName={artistName}
        venue={venue}
        address={address}
        date={date}
        setList={setList}
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
