import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import concertPic1 from './assets/concertPic1.jpg';

const ExplorePage = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Artists');

  const concerts = [
    { id: '1', event: 'Concert A', location: 'Madison Square Garden', date: 'Dec 12, 2024' },
    { id: '2', event: 'Concert B', location: 'Barclays', date: 'Jan 5, 2025' },
  ];

  const artists = [
    { id: '1', name: 'Taylor Swift', genre: 'Pop', image: require('./assets/ts.png') },
    { id: '2', name: 'Norah Jones', genre: 'Jazz', image: require('./assets/nj.png') },
    { id: '3', name: 'Drake', genre: 'Hip-Hop', image: require('./assets/drake.png') },
  ];

  const setlist = [
    { id: '1', title: 'Uptown Funk', artist: 'Bruno Mars', image: require('./assets/bm.png') },
    { id: '2', title: 'Dancing Queen', artist: 'ABBA', image: require('./assets/abba.png') },
  ];
  

  const renderContent = () => {
    switch (activeTab) {
      case 'Artists':
        return (
          <FlatList
            data={artists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} activeOpacity={0.7}
              onPress={() => navigation.navigate('ArtistPage', { artist: item })}>
                <Image source={item.image} style={styles.artistImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.subText}>{item.genre}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        );
        case 'Setlist':
          return (
            <FlatList
              data={setlist}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Image source={item.image} style={styles.setlistImage} />
                  <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Text style={styles.subText}>{item.artist}</Text>
                  </View>
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
                <View style={styles.textContainer}>
                  <Text style={styles.itemText}>{item.event}</Text>
                  <Text style={styles.subText}>{item.date}</Text>
                </View>
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
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search for artists, setlist, or events..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.tabsContainer}>
        {['Artists', 'Setlist', 'Concerts'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.contentContainer}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  searchBar: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 25,
    margin: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
    color: '#888',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  setlistImage: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 15,
  },
  
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    marginLeft: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  subText: {
    color: '#666',
    fontSize: 14,
    marginTop: 2, 
  },
});

export default ExplorePage;