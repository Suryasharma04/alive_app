import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ExplorePage = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Artists');

  // Sample data (replace with actual data fetching)
  const artists = [
    { id: '1', name: 'Artist Name', color: '#fff' },
    { id: '2', name: 'Longer Artist Name', color: '#fff' },
    { id: '3', name: 'Another Artist', color: '#fff' },
  ];
  const songs = [
    { id: '1', title: 'Song Title 1', artist: 'Artist Name' },
    { id: '2', title: 'Song Title 2', artist: 'Another Artist' },
  ];
  const concerts = [
    { id: '1', event: 'Concert A', location: 'Venue 1', date: 'Dec 12, 2024' },
    { id: '2', event: 'Concert B', location: 'Venue 2', date: 'Jan 5, 2025' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Artists':
        return (
          <FlatList
            data={artists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.item, { backgroundColor: item.color }]}>
                <Icon name="person-circle-outline" size={40} color="#4F4F4F" />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            )}
          />
        );
      case 'Songs':
        return (
          <FlatList
            data={songs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Icon name="musical-notes-outline" size={30} color="#4F4F4F" />
                <Text style={styles.itemText}>{item.title} - {item.artist}</Text>
              </View>
            )}
          />
        );
      case 'Concerts':
        return (
          <FlatList
            data={concerts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Icon name="calendar-outline" size={30} color="#4F4F4F" />
                <Text style={styles.itemText}>{item.event} - {item.location}</Text>
                <Text style={styles.subText}> {item.date}</Text>
              </View>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for artists, songs, or events..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['Artists', 'Songs', 'Concerts'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        {renderContent()}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="home-outline" size={30} color="#7D7D7D" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="search-outline" size={30} color="#000" />
          <Text style={[styles.navText, { color: '#000' }]}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="person-outline" size={30} color="#7D7D7D" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="settings-outline" size={30} color="#7D7D7D" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  searchBar: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    marginTop: 70,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#888',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  subText: {
    color: '#777',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  navText: {
    fontSize: 12,
    color: '#7D7D7D',
    textAlign: 'center',
  },
});

export default ExplorePage;
