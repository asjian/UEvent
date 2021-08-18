import React, {useState,useContext} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {createAppContainer} from 'react-navigation';
//import {createStackNavigator} from 'react-navigation-stack';
import { createStackNavigator } from '@react-navigation/stack';

import MyUpcomingScreen from './MyUpcomingScreen';
import EventsFollowingScreen from './EventsFollowingScreen';
import EventUpdatesScreen from './EventUpdatesScreen';
import IncomingInvScreen from './IncomingInvScreen';
import OutgoingInvScreen from './OutgoingInvScreen';
import ProfileButton from '../objects/profileButton';
import Globals from '../../GlobalVariables';
import AppContext from '../objects/AppContext';
import EventDetailsScreen from './EventDetailsScreen';
import InviteScreen from './InviteScreen';
import CreateInviteList from './CreateInviteList';
import InviteListView from './InviteListView';
import AddMoreScreen from './AddMoreScreen';
import InviteUser from './InviteUser';
import InvitePeopleScreen from './InvitePeopleScreen';
import { ManageAttendeesScreen } from './ManageAttendees';
import ManageEventStack from './ManageEvent';

const HORIZONTALMARGIN = 20.4;

function MainScreen({navigation}) {  
    const myContext = useContext(AppContext);
    const user = {...myContext.user,...{'avatarsource':require('../assets/avatar.jpeg')}}; //that last avatarsource thing is temporary
    const params = {user:user}
    /*
    console.log('fetching categories...')
    fetch('http://47.252.19.227/EventHub/rest/categories')
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(error))
    */
    const [colEvents,setColEvents] = useState([]);

    const getEvents = () => {
        let fetchurl = Globals.eventsURL;
        console.log('getting events');
        fetch(fetchurl)
          .then((response) => response.json())
          .then((json) => {setColEvents(json)})
          .catch((error) => console.error(error))
    }
    const collisionCheck = (lat,lng) => {
        //console.log(colEvents);
        const mindist = 0.0001414;
        for(let i=0; i<colEvents.length;i++) {
            if(Math.sqrt((lat - colEvents[i].Latitude)*(lat - colEvents[i].Latitude) + 
            (lng - colEvents[i].Longitude)*(lng - colEvents[i].Longitude)) < mindist) {
                console.log('true');
                return true;
            }
        }
        console.log('false');
        return false;
    }
    const postEvent = () => {
        //Assume these are the coordinates gotten from the address
        let latitude = 42.27753;
        let longitude = -83.74289;
        const offsets = [{lat:0.000150,lng:0.000150},{lat:0.000225,lng:0.000225},{lat:0.000075,lng:0.000075},{lat:0.000300,lng:0.000300}];
        //Check for collisions. While there are collisions, keep trying different spots on the grid
        let collision = collisionCheck(latitude,longitude);
        let newLatitude = latitude;
        let newLongitude = longitude;
        let offsetIndex = 0;

        while(collision) {
            //if not a special location:
            const latOffset = offsets[offsetIndex].lat;
            const lngOffset = offsets[offsetIndex].lng;
            
            newLatitude = latitude + latOffset;
            newLongitude = longitude + lngOffset;
            if(!collisionCheck(newLatitude,newLongitude)) 
                break;
            
            newLatitude = latitude + latOffset;
            newLongitude = longitude - lngOffset;
            if(!collisionCheck(newLatitude,newLongitude)) 
                break;    

            newLatitude = latitude - latOffset;
            newLongitude = longitude + lngOffset;
            if(!collisionCheck(newLatitude,newLongitude)) 
                break;     
            
            newLatitude = latitude - latOffset;
            newLongitude = longitude - lngOffset;
            if(!collisionCheck(newLatitude,newLongitude)) 
                break;

            newLatitude = latitude + 0;
            newLongitude = longitude + lngOffset;
            if(!collisionCheck(newLatitude,newLongitude)) 
                break;

            newLatitude = latitude + 0;
            newLongitude = longitude - lngOffset;
            if(!collisionCheck(newLatitude,newLongitude)) 
                break;

            newLatitude = latitude + latOffset;
            newLongitude = longitude + 0;
            if(!collisionCheck(newLatitude,newLongitude)) 
                break;

            newLatitude = latitude - latOffset;
            newLongitude = longitude + 0;
            collision = collisionCheck(newLatitude,newLongitude)
            if(!collision) 
                break;

            offsetIndex++;
        }
        latitude = newLatitude;
        longitude = newLongitude;
        console.log(latitude + ', ' + longitude);
        
        fetch('https://retoolapi.dev/CNVOvx/collisionevents', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: 'Z West Party 3',
            Latitude: latitude,
            Longitude: longitude,
            }
        )
        }); 
        
    }  
    return (
    <View style = {styles.screenContainer}>
    <SafeAreaView>
        <ScrollView contentContainerStyle = {styles.scrollContainer}>
            <View style = {styles.profileContainer}>
                <Image source = {user.avatarsource} style = {styles.image}/>
                <Text style = {styles.nameText}>{user.displayName}</Text>
                <Text style = {styles.emailText}>{user.email}</Text>
                {/*interest icons go here, do later*/}
            </View>
            <View style={styles.buttonContainer}>
                <Text style = {styles.headerText}>My Event Info</Text>
                <ProfileButton onPress = {() => navigation.navigate('MyUpcomingScreen', params)} title = 'My Upcoming Events' />
                <ProfileButton onPress = {() => navigation.navigate('EventsFollowingScreen',params)} title = "Events I'm Following" />
                <ProfileButton onPress = {() => navigation.navigate('EventUpdatesScreen')} title = 'Event Updates' />
                <Text style = {styles.headerText}>Invitations</Text>
                <ProfileButton onPress = {() => navigation.navigate('IncomingInvScreen')} title = 'Incoming Invitations' />
                <ProfileButton onPress = {() => navigation.navigate('OutgoingInvScreen')} title = 'Outgoing Invitations' />
                <Text style = {styles.headerText}>Events I'm Hosting</Text>
                <ProfileButton onPress = {() => {
                    navigation.dangerouslyGetParent().dangerouslyGetParent().navigate('Host');
                }} title = 'Manage My Events' />
            </View>
        </ScrollView>
    </SafeAreaView>
    </View>
    );
}
// const screens = {
//     MainScreen: {
//         screen: MainScreen,
//         navigationOptions: {
//             headerShown: false
//         },
//     },
//     MyUpcomingScreen: {
//         screen: MyUpcomingScreen,
//         navigationOptions: {
//             headerShown: false
//         },
//     },
//     EventsFollowingScreen: {
//         screen: EventsFollowingScreen,
//         navigationOptions: {
//             headerShown: false,
//         },
//     },
//     EventUpdatesScreen: {
//         screen: EventUpdatesScreen,
//         navigationOptions: {
//             headerShown: false,
//         },
//     },
//     IncomingInvScreen: {
//         screen: IncomingInvScreen,
//         navigationOptions: {
//           headerShown: false
//         },
//     },
//     OutgoingInvScreen: {
//         screen: OutgoingInvScreen,
//         navigationOptions: {
//           headerShown: false
//         },
//     },
//     EventDetailsScreen: {
//         screen: EventDetailsScreen,
//         navigationOptions: {
//           headerShown: false
//         },
//     },
//     InviteScreen: {
//         screen: InviteScreen,
//         navigationOptions: {
//           headerShown: false
//         },
//     },
//     CreateInviteList: {
//         screen: CreateInviteList,
//         navigationOptions: {
//           headerShown: false
//         }
//     },
//     InviteListView: {
//         screen: InviteListView,
//         navigationOptions: {
//           headerShown: false
//         }
//     },
//     AddMoreScreen: {
//         screen: AddMoreScreen,
//         navigationOptions: {
//             headerShown: false
//         }
//     },
//     InviteUser: {
//         screen: InviteUser,
//         navigationOptions: {
//             headerShown: false,
//         }
//     }
// }
// const ProfileNavigator = createStackNavigator(screens);

const ProfileNavigator = createStackNavigator();

export default function ProfileNavigator1({ navigation }) {
    
    return (
        <ProfileNavigator.Navigator>
            <ProfileNavigator.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="MyUpcomingScreen" component={MyUpcomingScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="EventsFollowingScreen" component={EventsFollowingScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="EventUpdatesScreen" component={EventUpdatesScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="IncomingInvScreen" component={IncomingInvScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="OutgoingInvScreen" component={OutgoingInvScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="EventDetailsScreen" component={EventDetailsScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="InviteScreen" component={InviteScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="CreateInviteList" component={CreateInviteList} options={{ headerShown: false}}/>
            <ProfileNavigator.Screen name="InviteListView" component={InviteListView} options={{ headerShown: false}}/>
            <ProfileNavigator.Screen name="AddMoreScreen" component={AddMoreScreen} options={{ headerShown: false}}/>
            <ProfileNavigator.Screen name="InviteUser" component={InviteUser} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="InvitePeopleScreen" component={InvitePeopleScreen} options={{ headerShown: false }} />
            <ProfileNavigator.Screen name="Manage Event" component={ManageEventStack} options={{ headerShown: false }} />
        </ProfileNavigator.Navigator>
    )
}

// const ProfileContainer = createAppContainer(ProfileNavigator1);

// export default function FindScreen() {
//     return (
//         <ProfileContainer/>
//     );
// }
const styles = StyleSheet.create({
    screenContainer: {
        flex:1,
        backgroundColor:'#fff',
    },
    profileContainer: {
        flex:1,
        width: '100%',
        alignItems: 'center',
    },
    scrollContainer: {
        alignItems:'flex-start',
        paddingBottom: 90
    },
    buttonContainer: {
        flex: 1,
        marginLeft: HORIZONTALMARGIN,
        width: '90%',
    },
    image: {
        flex: 1,
        width: 75,
        height: 75,
        marginTop: 40,
        resizeMode: 'contain',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    emailText: {
        fontSize: 16,
        opacity: 0.5,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 7,
    },
    headerButtonStyle : {
        fontSize: Globals.HR(18),
        color: '#0085FF',
        fontWeight: '700',
        margin: Globals.HR(5)
    }
})
