import React, { useContext, useState, useEffect,useRef } from 'react';
import { SafeAreaView, View, Text, Animated, StyleSheet, Image, TouchableHighlight, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AppContext from '../objects/AppContext';
import Globals from '../../GlobalVariables';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ManageEventScreen from './ManageEvent';
import { useIsFocused } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const EventBox = ({navigation, myContext, item}) => {
    return (
        
            <TouchableOpacity onPress={() => {myContext.toggleShowNavBar(false); navigation.navigate('EventDetailsScreen', {user: myContext.user, currentEvent: item} );}} style={styles.box}>
            <View style={{ flex: 2 }}>
                <Image style={styles.realImageStyle} source={require('../assets/user_icon.png')} />
            </View>
            <View style={{ flex: 6 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ fontWeight: '500', fontSize: windowHeight / 71.23, color: '#0085FF', marginBottom: '3%' }}>{Globals.formatDate(item.startTime)} - {Globals.formatDate(item.endTime)}</Text>
                    {/* <Image style={{ resizeMode: 'contain', flex: 1 }} source={require('../assets/NotificationBell.png')} /> */}
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "500", fontSize: windowHeight / 57.88, marginBottom: '3%' }}>{item.name}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '500', fontSize: windowHeight / 71.23, color: '#09189F' }}>{item.locationName}</Text>
                </View>
            </View>
            
            </TouchableOpacity>
        
        
    );
}
function UpcomingEventsScreen({ navigation }) {
    const myContext = useContext(AppContext);
    const UpcomingIsFocused = useIsFocused();
    // event handler function
    const createEventHandler = () => {
        myContext.toggleShowNavBar(false);
        navigation.navigate('Create a New Event');
    }

    const [UpcomingEvents, setUpcomingEvents] = useState([]);


    const getEvents = () => {
        console.log('fetching upcoming events...');
        let fetchurl = Globals.eventsURL + '/getHostedEvents/' + myContext.user.id;
        fetch(fetchurl)
          .then((response) => response.json())
          .then((json) => {

            const upcomingData = json.filter(function (events)  {
                let dateobj = Globals.createDateAsUTC(events.endTime.substr(0,4), events.endTime.substr(5,2), events.endTime.substr(8,2),
                events.endTime.substr(11,2), events.endTime.substr(14,2), events.endTime.substr(17,2));
                
                return new Date() < dateobj;
            });
            setUpcomingEvents(upcomingData);
            
            })
          .catch((error) => console.error(error))
    }   
      const [fetched,setFetched] = useState(false);
    //   useFocusEffect(
    //     React.useCallback(() => {
    //         if(!fetched) { 
    //             getEvents();
    //             setFetched(true);
    //         }
    //         const unsubscribe = () => {if(fetched && !isFocused)setFetched(false);};
    //         return () => unsubscribe();
    //     })         
    //   );
    useEffect(() => {
        if(UpcomingIsFocused) {
          getEvents();
        }  
         
      }, [navigation,UpcomingIsFocused]);

    const renderItem = ({ item }) => {
        console.log('Start time:' + item.startTime);
        console.log('End time:' + item.endTime);
        return (
            <EventBox item={item} navigation={navigation} myContext={myContext}  />
        )
        
    };

    const EmptyListMessage = () => {
		return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: Globals.HR(24), textAlign: 'center', padding: Globals.HR(20), justifyContent: 'center', flex: 1, fontWeight: '500', color: 'rgba(0, 0, 0, 0.5)', width: '80%'}}>You don't have any upcoming events</Text>
            </View>

		);
	}
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
                        ListEmptyComponent={EmptyListMessage}
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
