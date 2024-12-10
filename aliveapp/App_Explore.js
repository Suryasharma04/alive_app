// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const ExplorePage = () => {
//   const [search, setSearch] = useState('');
//   const [activeTab, setActiveTab] = useState('Artists');

//   // Sample data (replace with actual data fetching)
//   const artists = [
//     { id: '1', name: 'Taylor Swift', color: '#fff' },
//     { id: '2', name: 'Drake', color: '#fff' },
//     { id: '3', name: 'Billy Joel', color: '#fff' },
//   ];
//   const songs = [
//     { id: '1', title: 'Uptown Funk', artist: 'Bruno Mars' },
//     { id: '2', title: 'Dancing Queen', artist: 'ABBA' },
//   ];
//   const concerts = [
//     { id: '1', event: 'Concert A', location: 'Madison Square Garden', date: 'Dec 12, 2024' },
//     { id: '2', event: 'Concert B', location: 'Barclays', date: 'Jan 5, 2025' },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Artists':
//         return (
//           <FlatList
//             data={artists}
//             keyExtractor={(item) => item.id}
//             scrollEnabled={false}
//             renderItem={({ item }) => (
//                 <TouchableOpacity style={styles.item} activeOpacity={0.7}>
//                 <Icon name="person-circle-outline" size={40} color="#4F4F4F" />
//                 <Text style={styles.itemText}>{item.name}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         );
//       case 'Songs':
//         return (
//           <FlatList
//             data={songs}
//             keyExtractor={(item) => item.id}
//             scrollEnabled={false}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Icon name="musical-notes-outline" size={30} color="#4F4F4F" />
//                 <Text style={styles.itemText}>{item.title} - {item.artist}</Text>
//               </View>
//             )}
//           />
//         );
//         case 'Concerts':
//           return (
//             <FlatList
//               data={concerts}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <View style={styles.item}>
//                   <Icon name="calendar-outline" size={30} color="#4F4F4F" />
//                   <View style={styles.textContainer}>
//                     <Text style={styles.itemText}>{item.event}</Text>
//                     <Text style={styles.subText}>{item.date}</Text>
//                   </View>
//                 </View>
//               )}
//             />
//           );
        
//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={styles.container}>

// <View style={styles.searchBar}>
//   <Icon name="search-outline" size={20} style={styles.searchIcon} />
//   <TextInput
//     placeholder="Search for artists, songs, or events..."
//     value={search}
//     onChangeText={setSearch}
//     style={{ flex: 1 }}
//   />
// </View>


//       {/* Tabs */}
//       <View style={styles.tabsContainer}>
//         {['Artists', 'Songs', 'Concerts'].map((tab) => (
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
//     marginTop: 2, 
//   },
// });


// export default ExplorePage;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ExplorePage = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Artists');

  const concerts = [
    { id: '1', event: 'Concert A', location: 'Madison Square Garden', date: 'Dec 12, 2024' },
    { id: '2', event: 'Concert B', location: 'Barclays', date: 'Jan 5, 2025' },
  ];

  const artists = [
    { id: '1', name: 'Artist One', genre: 'Pop', image: require('./assets/concertPic1.jpg') },
    { id: '2', name: 'Artist Two', genre: 'Rock', image: require('./assets/concertPic1.jpg') },
    { id: '3', name: 'Artist Three', genre: 'Jazz', image: require('./assets/concertPic1.jpg') },
    // Add more artists as needed
  ];

  const songs = [
    { id: '1', title: 'Song One', artist: 'Artist One', album: 'Album One', releaseDate: 'Jan 1, 2024', genre: 'Pop' },
    { id: '2', title: 'Song Two', artist: 'Artist Two', album: 'Album Two', releaseDate: 'Feb 15, 2024', genre: 'Rock' },
    { id: '3', title: 'Song Three', artist: 'Artist Three', album: 'Album Three', releaseDate: 'Mar 10, 2024', genre: 'Jazz' },
    // Add more songs as needed
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Artists':
        return (
          <FlatList
            data={artists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('ArtistPage', { artist: item })}
              >
                <Icon name="person-circle-outline" size={40} color="#4F4F4F" />
                <View style={styles.textContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.subText}>{item.genre}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      case 'Songs':
        return (
          <FlatList
            data={songs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('Song', { song: item })}
              >
                <Icon name="musical-notes-outline" size={30} color="#4F4F4F" />
                <View style={styles.textContainer}>
                  <Text style={styles.itemText}>{item.title}</Text>
                  <Text style={styles.subText}>{item.artist}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      case 'Concerts':
        return (
          <FlatList
            data={concerts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('Concert', { concert: item })}
              >
                <Icon name="calendar-outline" size={30} color="#4F4F4F" />
                <View style={styles.textContainer}>
                  <Text style={styles.itemText}>{item.event}</Text>
                  <Text style={styles.subText}>{item.date}</Text>
                </View>
              </TouchableOpacity>
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
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search for artists, songs, or events..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1 }}
        />
      </View>

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
    marginHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
