import React, {useState,useEffect,useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import HostNavBar from '../routes/HostNavBar';
import CreateNewEventScreen from './CreateNewEvent';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ManageEventStack from './ManageEvent';
import Globals from '../../GlobalVariables';
import AppContext from '../objects/AppContext';
import EventDetailsScreen from './EventDetailsScreen';
import EventDetailsScreenPast from './EventDetailsPast';
import InviteScreen from './InviteScreen';
import InvitePeopleScreen from './InvitePeopleScreen';
import InviteListView from './InviteListView';
import CreateInviteList from './CreateInviteList';
import AddMoreScreen from './AddMoreScreen';

const Stack = createStackNavigator()
// 926
function HostScreen(props) {
    //const myContext = useContext(AppContext);
    const windowHeight = Dimensions.get('window').height;
    /*
    useFocusEffect(
        React.useCallback(() => {
            console.log('useFocusEffect hostscreen');
            const unsubscribe = () => setFetched(false);
            return () => unsubscribe();
        })         
    );
    */

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
            <Stack.Screen name='EventDetailsScreen' component={EventDetailsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='EventDetailsScreenPast' component={EventDetailsScreenPast} options={{ headerShown: false }}/>
            <Stack.Screen name='Manage Event' component={ManageEventStack} options={{ headerShown: false }}/>
            <Stack.Screen name='InviteScreen' component={InviteScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='InvitePeopleScreen' component={InvitePeopleScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='InviteListView' component={InviteListView} options={{ headerShown: false }}/>
            <Stack.Screen name='CreateInviteList' component={CreateInviteList} options={{ headerShown: false }}/>
            <Stack.Screen name='AddMoreScreen' component={AddMoreScreen} options={{ headerShown: false }}/>

        </Stack.Navigator>
    );
}

export default HostScreen;
