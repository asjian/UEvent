import React from 'react';
import { SafeAreaView,View, Text, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UpcomingEventsScreen from './UpcomingEvents';
import EventInformation from './CreateNewEvent'

function PastEventsScreen({ navigation }) {
    return (
        <SafeAreaView>
            <Button 
                title= "+ Create New Event"
                onPress={() => navigation.navigate('Create a New Event')}
            />

        </SafeAreaView>
    );
}

export default PastEventsScreen;