// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const ExplorePage = ({ navigation }) => {
//   const [search, setSearch] = useState('');
//   const [activeTab, setActiveTab] = useState('Artists');
//   const API_URL = 'http://11.30.255.131:3000/setlists';

//   const concerts = [
//     { id: '1', event: 'Concert A', location: 'Madison Square Garden', date: 'Dec 12, 2024' },
//     { id: '2', event: 'Concert B', location: 'Barclays', date: 'Jan 5, 2025' },
//   ];

//   const artists = [
//     { id: '1', name: 'Taylor Swift', genre: 'Pop', image: require('./assets/ts.png') },
//     { id: '2', name: 'Norah Jones', genre: 'Jazz', image: require('./assets/nj.png') },
//     { id: '3', name: 'Drake', genre: 'Hip-Hop', image: require('./assets/drake.png') },
//     { id: '4', name: 'Adele', genre: 'Pop', image: require('./assets/ts.png') },
//     { id: '5', name: 'Jay Z', genre: 'Hip-Hop', image: require('./assets/nj.png') },
//     { id: '6', name: 'Noah Kahan', genre: 'country', image: require('./assets/drake.png') },
//     { id: '7', name: 'Beyonce', genre: 'Pop', image: require('./assets/drake.png') },
//   ];

//   const setlist = [
//     { id: '1', title: 'Uptown Funk', artist: 'Bruno Mars', image: require('./assets/bm.png') },
//     { id: '2', title: 'Dancing Queen', artist: 'ABBA', image: require('./assets/abba.png') },
//     { id: '3', title: 'Fernando', artist: 'ABBA', image: require('./assets/nj.png') },
//     { id: '4', title: 'One Direction', artist: '1D', image: require('./assets/drake.png') },
//     { id: '5', title: 'Eras Tour', artist: 'Taylor Swift', image: require('./assets/bm.png') },
//     { id: '6', title: 'Queen', artist: 'ABBA', image: require('./assets/nj.png') },
//   ];

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(API_URL);
//       const data = await response.json();
//       setApiData(data); // Store the API response
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch data from the API');
//       console.error('API fetch error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   /**
//    * Filter content based on the active tab and the search input
//    */
//   const getFilteredData = () => {
//     const lowerSearch = search.toLowerCase();

//     switch (activeTab) {
//       case 'Artists':
//         return artists.filter(artist => 
//           artist.name.toLowerCase().includes(lowerSearch) || 
//           artist.genre.toLowerCase().includes(lowerSearch)
//         );
//       case 'Setlist':
//         return setlist.filter(song => 
//           song.title.toLowerCase().includes(lowerSearch) || 
//           song.artist.toLowerCase().includes(lowerSearch)
//         );
//       case 'Concerts':
//         return concerts.filter(concert => 
//           concert.event.toLowerCase().includes(lowerSearch) || 
//           concert.location.toLowerCase().includes(lowerSearch) || 
//           concert.date.toLowerCase().includes(lowerSearch)
//         );
//       default:
//         return [];
//     }
//   };

//   /**
//    * Render the content based on the active tab
//    */
//   const renderContent = () => {
//     const filteredData = getFilteredData();

//     switch (activeTab) {
//       case 'Artists':
//         return (
//           <FlatList
//             data={filteredData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <TouchableOpacity 
//                 style={styles.item} 
//                 activeOpacity={0.7}
//                 onPress={() => navigation.navigate('ArtistPage', { artist: item })}
//               >
//                 <Image source={item.image} style={styles.artistImage} />
//                 <View style={styles.textContainer}>
//                   <Text style={styles.itemText}>{item.name}</Text>
//                   <Text style={styles.subText}>{item.genre}</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         );
//       case 'Setlist':
//         return (
//           <FlatList
//             data={filteredData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Image source={item.image} style={styles.setlistImage} />
//                 <View style={styles.textContainer}>
//                   <Text style={styles.itemText}>{item.title}</Text>
//                   <Text style={styles.subText}>{item.artist}</Text>
//                 </View>
//               </View>
//             )}
//           />
//         );
//       case 'Concerts':
//         return (
//           <FlatList
//             data={filteredData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Icon name="calendar-outline" size={30} color="#4F4F4F" />
//                 <View style={styles.textContainer}>
//                   <Text style={styles.itemText}>{item.event}</Text>
//                   <Text style={styles.subText}>{item.date}</Text>
//                 </View>
//               </View>
//             )}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchBar}>
//         <Icon name="search-outline" size={20} style={styles.searchIcon} />
//         <TextInput
//           placeholder="Search for artists, setlist, or events..."
//           value={search}
//           onChangeText={setSearch}
//           style={{ flex: 1 }}
//         />
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabsContainer}>
//         {['Artists', 'Setlist', 'Concerts'].map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             style={[styles.tab, activeTab === tab && styles.activeTab]}
//             onPress={() => setActiveTab(tab)}
//           >
//             <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Content */}
//       <ScrollView style={styles.contentContainer}>
//         {renderContent()}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//   },
//   searchBar: {
//     backgroundColor: '#FFF',
//     padding: 12,
//     borderRadius: 25,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchIcon: {
//     marginRight: 8,
//     color: '#888',
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
//   setlistImage: {
//     width: 40, 
//     height: 40, 
//     borderRadius: 20, 
//     marginRight: 15,
//   },
//   tab: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//     backgroundColor: '#E0E0E0',
//   },
//   activeTab: {
//     backgroundColor: '#000',
//   },
//   tabText: {
//     color: '#888',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     color: '#FFF',
//     fontWeight: '700',
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     marginVertical: 8,
//     marginHorizontal: 5,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   artistImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 15,
//   },
//   textContainer: {
//     marginLeft: 15,
//   },
//   itemText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   subText: {
//     color: '#666',
//     fontSize: 14, 
//   },
// });

// export default ExplorePage;



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; // Import axios

const ExplorePage = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Artists');
  const [apiData, setApiData] = useState([]); // Store data from the API
  const [loading, setLoading] = useState(false);
  const API_URL = 'http://11.30.255.131:3000/setlists';
  const API_URL2 = 'http://11.30.255.131:3000/upcomingShows';

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setApiData(response.data); // Store the API response
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data from the API');
      console.error('API fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filter content based on the active tab and the search input
   */
  const getFilteredData = () => {
    const lowerSearch = search.toLowerCase();

    switch (activeTab) {
      case 'Artists':
        return apiData.filter(artist => 
          artist.name?.toLowerCase().includes(lowerSearch) || 
          artist.genre?.toLowerCase().includes(lowerSearch)
        );
      case 'Setlist':
        return apiData.filter(song => 
          song.title?.toLowerCase().includes(lowerSearch) || 
          song.artist?.toLowerCase().includes(lowerSearch)
        );
      case 'Concerts':
        return apiData.filter(concert => 
          concert.event?.toLowerCase().includes(lowerSearch) || 
          concert.location?.toLowerCase().includes(lowerSearch) || 
          concert.date?.toLowerCase().includes(lowerSearch)
        );
      default:
        return [];
    }
  };

  /**
   * Render the content based on the active tab
   */
  const renderContent = () => {
    const filteredData = getFilteredData();

    return (
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('DetailPage', { item })}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.artistImage} />
            ) : (
              <Icon name="image-outline" size={40} color="#888" style={styles.artistImage} />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.name || item.title || item.event}</Text>
              <Text style={styles.subText}>{item.genre || item.artist || item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search for artists, setlist, or events..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1 }}
        />
      </View>

      {/* Tabs */}
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

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        {loading ? <Text>Loading...</Text> : renderContent()}
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
  },
});

export default ExplorePage;

