import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import BackButton from '../objects/backButton';
import ProfileButton from '../objects/profileButton';
import Globals from '../../GlobalVariables';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


export default function MainScreen({navigation}) {
  {/*
    const user = navigation.getParam('user');
    
    const eventIds = user.UpcomingEvents.split(" ");
    const [eventList, setEventList] = useState([]);

    const getEvent = async(eventID) => {
      console.log('fetching...');
      let fetchurl = Globals.eventsURL + '/' + eventID;
      await fetch (fetchurl)
        .then((response) => response.json())
        .then((json) => eventList.push(json[0]))
        .catch((error) => console.error(error))
    }

    for (let i = 0; i < eventIds.length; i++) {
      getEvent(eventIds[i]);
    }

    const renderEvents = () => {
      return (
      eventList.map((item) => {
        return (
        <ProfileButton title={item.Name}>

        </ProfileButton>
        )
      }
      )
      )
    }
  */}
    return (
        <SafeAreaView style={styles.button}>
          <BackButton onPress={() => navigation.navigate('MainScreen')} title = 'My Upcoming Events'/>
          <ScrollView>
            <ProfileButton title={'ALEX NERD PARTY'} onPress={() => navigation.navigate('EventDetailsScreen')}/>
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
