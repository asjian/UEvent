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

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="FindEvents" component={FindEventsScreen}/>
        <Stack.Screen name="HostEvents" component={HostEventsScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}
