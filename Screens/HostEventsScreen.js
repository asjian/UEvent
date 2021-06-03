import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UpcomingEventsScreen from './UpcomingEvents';
import PastEventsScreen from './PastEvents';
import HostNavBar from './HostNavBar';

const HostTabNav = createMaterialTopTabNavigator;
const Stack = createStackNavigator()




function HostEventsScreen(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Events I'm Hosting" component={HostNavBar} />
        </Stack.Navigator>
    );
}

export default HostEventsScreen;
