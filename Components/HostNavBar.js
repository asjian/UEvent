import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import UpcomingEventsScreen from '../screens/UpcomingEvents';
import PastEventsScreen from '../screens/PastEvents';

const HostTabNav = createMaterialTopTabNavigator();

const HostNavBar = () => {
    return (
        <HostTabNav.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    borderWidth: 1,
                    borderColor: '#FAB400'
                },
                activeTintColor: '#FAB400',
                inactiveTintColor: 'black',
                labelStyle: {
                    fontWeight: '500',
                    fontSize: 18,
                    textTransform: 'none'
                },
                style: {
                    backgroundColor: '#FFFBF3'
                }
            }}
        >
            <HostTabNav.Screen name="Upcoming Events" component={UpcomingEventsScreen} />
            <HostTabNav.Screen name="Past Events" component={PastEventsScreen} />
        </HostTabNav.Navigator>
    );
}

export default HostNavBar;
