import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import HostNavBar from '../routes/HostNavBar';
import CreateNewEventScreen from './CreateNewEvent';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ManageEventScreen from './ManageEvent';
import ManageEventStack from './ManageEvent';

const Stack = createStackNavigator()

const windowHeight = Dimensions.get('window').height;


function HostScreen(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Events I'm Hosting"
                component={HostNavBar}
                options={{
                    headerStyle: {
                        height: 100,
                        backgroundColor: '#FFFBF3'
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 24,
                    },
                    headerLeft: null,
                }}
            />
            <Stack.Screen name="Create a New Event" component={CreateNewEventScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Manage Event' component={ManageEventStack} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

export default HostScreen;
