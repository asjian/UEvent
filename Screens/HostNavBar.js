import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UpcomingEventsScreen from './UpcomingEvents';
import PastEventsScreen from './PastEvents';

const HostTabNav = createMaterialTopTabNavigator();

const HostNavBar = () => {
    return (
        <HostTabNav.Navigator>
            <HostTabNav.Screen name="Upcoming Events" component={UpcomingEventsScreen} />
            <HostTabNav.Screen name="Past Events" component={PastEventsScreen} />
        </HostTabNav.Navigator>
    );
}

export default HostNavBar;