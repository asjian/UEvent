import React, { useContext, useState, useEffect,useRef } from 'react';
import { SafeAreaView, View, Text, Animated, StyleSheet, Image, TouchableHighlight, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
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
    /*
    const [visible,setVisible] = useState(true);
    const [offset,setOffset] = useState(0);
    const [up,setUp] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    
    const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
    const fadeOut = () => {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start(({finished}) => {if(finished)setVisible(false)});
    };
    
    const handleVisibility = (nativeEvent) => {
        const currentOffset = nativeEvent.contentOffset.y;
        console.log('currentOffset: ' + currentOffset);
        //console.log('offset: ' + offset);
        setUp(currentOffset<offset?true:false);
        setOffset(currentOffset);
    }
    */
    return (
        <SafeAreaView style={{ backgroundColor: '#FFFBF3', height: '100%' }}>
            <View style={{ height: '92%' }}>

                    <FlatList 
                        data={UpcomingEvents}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        style={{height: '100%'}}
                        //onScroll = {({nativeEvent}) => handleVisibility(nativeEvent)}
                        //onMomentumScrollBegin = {() => {console.log('momentum');if(up){setVisible(true);fadeIn()}}}
                        //onEndReachedThreshold = {0.01}
                        //onEndReached = {() => {console.log('maybe end');if(offset > 5){console.log('end');fadeOut()}}}
                        contentContainerStyle = {{paddingTop:20,paddingBottom:80}}
                    />   
                    
                    <TouchableHighlight activeOpacity = {0.7} onPress={createEventHandler}>
                        <View style = {styles.selectContainer}>
                            <Text style={[styles.selectText,{paddingHorizontal:50}]}>+ Create New Event</Text>
                        </View>
                    </TouchableHighlight>
                    
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
        marginBottom: 20,
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
        left: 52,
        bottom: 20,
        
        width: '75%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 50,
    },
    selectInvisible: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        marginHorizontal: 50,
        bottom: 20,
        width: '0%',
        alignItems: 'center',
    },
    selectText: {
        fontWeight: '600',
        fontSize: 22,
        paddingVertical: 15,
        color: '#fab400',
    }

})
