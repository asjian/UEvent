import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Image, ParentView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import AppContext from '../objects/AppContext';
import Globals from '../../GlobalVariables';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ManageEventScreen from './ManageEvent';


const EventBox = ({navigation, myContext, item}) => {
    return (
        
            <TouchableOpacity onPress={() => {myContext.toggleShowNavBar(false);navigation.navigate('Manage Event', { screen: 'Manage Event', params: {item: item} });}} style={styles.box}>
            <View style={{ flex: 2 }}>
                <Image style={styles.realImageStyle} source={require('../assets/user_icon.png')} />
            </View>
            <View style={{ flex: 4 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: '500', fontSize: 13, color: '#09189F', marginBottom: '5%' }}>{item.startTime} - {item.endTime}</Text>
                    <Image style={{ resizeMode: 'contain', marginLeft: '10%' }} source={require('../assets/NotificationBell.png')} />
                </View>
                <Text style={{ fontWeight: "500", fontSize: 16, marginBottom: '3%' }}>{item.name}</Text>
                <Text style={{ fontWeight: '500', fontSize: 13, color: '#0085FF' }}>{item.LocationName}</Text>
            </View>
            
            </TouchableOpacity>
        
        
    );
}




function UpcomingEventsScreen({ navigation }) {
    const myContext = useContext(AppContext);
    // event handler function
    const createEventHandler = () => {
        myContext.toggleShowNavBar(false);
        navigation.navigate('Create a New Event');
    }

    const [UpcomingEvents, setUpcomingEvents] = useState([]);

    const getEvents = () => {
        console.log('fetching upcoming events...');
        let fetchurl = Globals.eventsURL;
        fetch(fetchurl)
          .then((response) => response.json())
          .then((json) => {setUpcomingEvents(json)})
          .catch((error) => console.error(error))
    }
      const [fetched,setFetched] = useState(false);

        useEffect(() => {
          if(!fetched) {
            getEvents();
            setFetched(true);
          }
        });
        
    const renderItem = ({ item }) => (
        <EventBox item={item} navigation={navigation} myContext={myContext}  />
    );

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFBF3', height: '100%' }}>
            <View style={{ height: '80%' }}>
                    <FlatList 
                        data={UpcomingEvents}
                        renderItem={renderItem}
                        keyExtractor={item => item.eventId.toString()}
                        style={{height: '100%'}}
                    />
            </View>
            <View style={styles.NewEventButton}>
                <TouchableOpacity onPress={createEventHandler}>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>+ Create New Event</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

UpcomingEventsScreen.navigationOptions = {
    headerTitle: 'Trucks Screen',
    headerLeft: () => {
        return null;
    },
};

export default UpcomingEventsScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 5,
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    NewEventButton: {
        backgroundColor: '#FFFBF3'
    },
    box: {
        width: '95%',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        backgroundColor: '#F8F8F8',
        flex: 1

    },
    inner1: {
        flex: 2,

    },
    inner2: {
        flex: 3
    },

    realImageStyle: {
        height: '100%',
        resizeMode: 'contain',
        width: '100%'

    },
    selectContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        marginHorizontal: 50,
        marginTop: 5,
        width: '75%',
        alignItems: 'center',
        top: 0,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 10,
    },
    selectText: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingVertical: 15,
        color: '#fab400',
    }

})
