import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MyUpcomingScreen from './MyUpcomingScreen';
import EventsFollowingScreen from './EventsFollowingScreen';
import EventUpdatesScreen from './EventUpdatesScreen';
import AddFriendsScreen from './AddFriendsScreen';
import FriendRequestsScreen from './FriendRequestsScreen';
import FriendsListScreen from './FriendsListScreen';
import WhereFriendsScreen from './WhereFriendsScreen';
import IncomingInvScreen from './IncomingInvScreen';
import OutgoingInvScreen from './OutgoingInvScreen';
import ProfileButton from '../objects/profileButton';
import Globals from '../../GlobalVariables';

const HORIZONTALMARGIN = 20.4;

function MainScreen({navigation}) {

    const userEmail = 'sravella@umich.edu'; //this information would likely be passed from the login process, hardcoded for now
    const [user, setUser] = useState({
        'Name': 'Alex Jian',
        'Email': 'asjian@umich.edu',
        'Organization': "No",
        'Admin': "Yes",
        'UpcomingEvents': '1 3 8',
        'EventsHosting': '',
        'avatarsource': require('../assets/avatar.jpeg'),
        'alreadyFetched': false,
    })
    const getUser = () => {
        console.log('fetching user...');
        const fetchurl = Globals.usersURL + '?Email=' + userEmail;

        fetch(fetchurl)
          .then((response) => response.json())
          .then((json) => {setUser({...json[0],...{'avatarsource':require('../assets/avatar.jpeg'),'alreadyFetched':true}})})
          .catch((error) => console.error(error))
    }
    useEffect(() => {
        if(!user.alreadyFetched) {
            getUser();
        }0
    }, [navigation]);
    /*
    console.log('fetching categories...')
    fetch('http://192.168.1.219:8080/EventHub/rest/categories')
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(error))
    */

    return (
    <View style = {styles.screenContainer}>
    <SafeAreaView>
        <ScrollView contentContainerStyle = {styles.scrollContainer}>
            <View style = {styles.profileContainer}>
                <Image source = {user.avatarsource} style = {styles.image}/>
                <Text style = {styles.nameText}>{user.Name}</Text>
                <Text style = {styles.emailText}>{user.Email}</Text>
                {/*interest icons go here, do later*/}
            </View>
            <View style={styles.buttonContainer}>
                <Text style = {styles.headerText}>My Event Info</Text>
                <ProfileButton onPress = {() => navigation.navigate('MyUpcomingScreen')} title = 'My Upcoming Events' />
                <ProfileButton onPress = {() => navigation.navigate('EventsFollowingScreen')} title = "Events I'm Following" />
                <ProfileButton onPress = {() => navigation.navigate('EventUpdatesScreen')} title = 'Event Updates' />
                <Text style = {styles.headerText}>Friends</Text>
                <ProfileButton onPress = {() => navigation.navigate('AddFriendsScreen')} title = 'Add Friends' />
                <ProfileButton onPress = {() => navigation.navigate('FriendRequestsScreen')} title = 'Friend Requests' />
                <ProfileButton onPress = {() => navigation.navigate('FriendsListScreen')} title = 'Friends List' />
                <ProfileButton onPress = {() => navigation.navigate('WhereFriendsScreen')} title = 'Where my Friends are Going' />
                <Text style = {styles.headerText}>Invitations</Text>
                <ProfileButton onPress = {() => navigation.navigate('IncomingInvScreen')} title = 'Incoming Invitations' />
                <ProfileButton onPress = {() => navigation.navigate('OutgoingInvScreen')} title = 'Outgoing Invitations' />
                <Text style = {styles.headerText}>Events I'm Hosting</Text>
                <ProfileButton onPress = {() => {navigation.navigate('HostScreen',user)}} title = 'Manage My Events' />
            </View>
        </ScrollView>
    </SafeAreaView>
    </View>
    );
}
const screens = {
    MainScreen: {
        screen: MainScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    MyUpcomingScreen: {
        screen: MyUpcomingScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    EventsFollowingScreen: {
        screen: EventsFollowingScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    EventUpdatesScreen: {
        screen: EventUpdatesScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    AddFriendsScreen: {
        screen: AddFriendsScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    FriendRequestsScreen: {
      screen: FriendRequestsScreen,
      navigationOptions: {
        headerShown: false
      },
    },
    FriendsListScreen: {
        screen: FriendsListScreen,
        navigationOptions: {
          headerShown: false
        },
    },
    WhereFriendsScreen: {
        screen: WhereFriendsScreen,
        navigationOptions: {
          headerShown: false
        },
    },
    IncomingInvScreen: {
        screen: IncomingInvScreen,
        navigationOptions: {
          headerShown: false
        },
    },
    OutgoingInvScreen: {
        screen: OutgoingInvScreen,
        navigationOptions: {
          headerShown: false
        },
    },
}
const ProfileNavigator = createStackNavigator(screens);

const ProfileContainer = createAppContainer(ProfileNavigator);

export default function FindScreen() {
    return (
        <ProfileContainer/>
    );
}
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
    }
})
