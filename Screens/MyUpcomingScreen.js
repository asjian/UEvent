import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import BackButton from '../objects/backButton';
import ProfileButton from '../objects/UpcomingEventButton';
import Globals from '../../GlobalVariables';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { render } from 'react-dom';


export default function MainScreen({navigation}) {
    const user = navigation.getParam('user');
    
    const eventIds = user.UpcomingEvents.split(" ");
    const [eventList, setEventList] = useState([]);
    const [gotEvents,setGotEvents] = useState(false);

    const getEvent = (eventId) => {
      let fetchurl = Globals.eventsURL + '/' + eventId;

      fetch (fetchurl)
      .then((response) => response.json())
      .then((json) => {setEventList((prevEventList)=>{return [json,...prevEventList]})})
      .catch((error) => console.error(error))
    }
    const getUserEvents = () => {
      for(let i=0; i<eventIds.length;i++) {
        getEvent(eventIds[i]);
      }
      setGotEvents(true);
    }
    const renderEvents = () => {
      return (
        eventList.map((event) => {
            return (
              <View key = {event.id}>
              <ProfileButton title = {event.Name} 
              location = {event.LocationName} 
              time = {event.StartDayTime.split(' ')[1] + ' - ' + event.EndDayTime.split(' ')[1]} 
              onPress={() => navigation.navigate('EventDetailsScreen', event.id)}/>
              </View>
            )
        }
      )
      )
    }
    if(!gotEvents)
      getUserEvents();

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
