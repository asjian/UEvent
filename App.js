import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Button,  } from 'react-native';
import WelcomeScreen from './app/assets/screens/WelcomeScreen';
import FindEventsScreen from './app/assets/screens/FindEventsScreen';
import HostEventsScreen from './app/assets/screens/HostEventsScreen';
import ProfileScreen from './app/assets/screens/ProfileScreen';
import NavBar from './app/assets/screens/NavBar';
import SearchScreen from './app/assets/screens/SearchScreen';
import SettingsScreen from './app/assets/screens/SettingsScreen';
import UpcomingEventsScreen from './app/assets/screens/UpcomingEvents';
import PastEventsScreen from './app/assets/screens/PastEvents';


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="FindEvents" component={NavBar}/>
        <Stack.Screen name="HostEvents" component={HostEventsScreen}/>
        <Stack.Screen name="Profile" component={NavBar}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen}/>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="UpcomingEvents" component={UpcomingEventsScreen} />
        <Stack.Screen name="PastEvents" component={PastEventsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}
