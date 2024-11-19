import * as React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 30 }}>Home Screen</Text>
      <Text>{'\n'}</Text>
      <TouchableHighlight
        onPress={() => navigation.navigate('Profile Settings')}
        activeOpacity={0.6}
        underlayColor='red'
      >
        <Text style={styles.button}>Go To Profile Settings</Text>
      </TouchableHighlight>

    </View>
  );
}

/*
function SettingsPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}

      >
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
          name="Profile Settings"
          component={ProfileSettingsScreen}
          options={{ title: 'Profile Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#009966",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#009966",
  }
});


export default SettingsScreen;
