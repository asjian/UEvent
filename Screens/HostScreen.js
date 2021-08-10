import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import HostNavBar from '../routes/HostNavBar';
import CreateNewEventScreen from './CreateNewEvent';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ManageEventScreen from './ManageEvent';
import ManageEventStack from './ManageEvent';

const Stack = createStackNavigator()



// 926




function HostScreen(props) {
    const windowHeight = Dimensions.get('window').height;
    // useEffect(() => {

    //     console.log(windowHeight);
    
    // },[]);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Events I'm Hosting"
                component={HostNavBar}
                options={{
                    headerStyle: {
                        height: windowHeight / 9,
                        backgroundColor: '#FFFBF3'
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: windowHeight / 38.58,
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
