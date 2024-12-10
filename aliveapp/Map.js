import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function EventScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.artistName}>Artist Name</Text>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} 
        style={styles.venueImage}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.venueName}>MetLife Stadium</Text>
        <Text style={styles.venueAddress}>One MetLife Stadium Dr, East Rutherford, NJ 07073</Text>

        <View style={styles.dateTimeContainer}>
          <Text style={styles.eventDate}>Dec. 5th, 2024</Text>
          <Text style={styles.eventTime}>7:00PM</Text>
        </View>

        <TouchableOpacity style={styles.ticketButton}>
          <Text style={styles.ticketText}>Tickets</Text>
        </TouchableOpacity>

        <Text style={styles.directionsText}>Directions</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.8136, // Latitude of MetLife Stadium
            longitude: -74.0745, // Longitude of MetLife Stadium
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude: 40.8136, longitude: -74.0745 }} />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  artistName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  venueImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  venueName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  venueAddress: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  eventDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  ticketButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  ticketText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  directionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});
