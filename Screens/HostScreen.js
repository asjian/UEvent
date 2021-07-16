import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HostNavBar from '../routes/HostNavBar';
import CreateNewEventScreen from './CreateNewEvent';

const Stack = createStackNavigator()

function HostScreen(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Events I'm Hosting"
                component={HostNavBar}
                options={{
                    headerStyle: {
                        height: 125,
                        backgroundColor: '#FFFBF3'
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 24,

                    }
                }}
            />
            <Stack.Screen name="Create a New Event" component={CreateNewEventScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default HostScreen;
