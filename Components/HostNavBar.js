import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UpcomingEventsScreen from '../screens/UpcomingEvents';
import PastEventsScreen from '../screens/PastEvents';

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
