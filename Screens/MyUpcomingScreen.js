import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import BackButton from '../objects/backButton';
import ProfileButton from '../objects/UpcomingEventButton';
import Globals from '../../GlobalVariables';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { render } from 'react-dom';


export default function MainScreen({navigation, route}) {
    // const {user} = navigation.getParam('user');
    const { user } = route.params;
    //const eventIds = [6,7,10];
    const [eventList, setEventList] = useState([]);
    const [gotEvents,setGotEvents] = useState(false);

    const getUserEvents = () => {
        let fetchurl = Globals.attendeesURL + '/attendingEvents/' + user.id; 

        fetch (fetchurl)
        .then((response) => response.json())
        .then((json) => {setEventList(json)})
        .catch((error) => console.error(error))
    }
    const renderEvents = () => {
      return (
        eventList.map((event) => {
            return (
              <View key = {event.id}>
              <ProfileButton title = {event.name} 
              location = {event.locationName} 
              time = {Globals.formatDate(event.startTime) + ' - ' + Globals.formatDate(event.endTime)}
              onPress={() => navigation.navigate('EventDetailsScreen', {user: user, currentEvent: event})}/>
              </View>
            )
        }
      )
      )
    }
    if(!gotEvents) {
      getUserEvents();
      setGotEvents(true);
    }

    return (
        <SafeAreaView style={styles.button}>
          <BackButton onPress={() => navigation.navigate('MainScreen')} title = 'My Upcoming Events'/>
          <ScrollView>
            {renderEvents()}
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    position: 'absolute',
    width: '90%',
    marginTop: 50.4,
    marginLeft: 20.4
  }
})
