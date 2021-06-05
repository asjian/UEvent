import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
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
//import GlobalVariables from '../../GlobalStyles';

const HORIZONTALMARGIN = 20.4;

function MainScreen({navigation}) {
    const user = {
        username: 'Alex Jian',
        useremail: 'asjian@umich.edu',
        avatarsource: require('../assets/avatar.jpeg'),
    }

    return (
    <View style = {styles.screenContainer}>
    <SafeAreaView>
        <ScrollView contentContainerStyle = {styles.scrollContainer}>
            <View style = {styles.profileContainer}>
                <Image source = {user.avatarsource} style = {styles.image}/>
                <Text style = {styles.nameText}>{user.username}</Text>
                <Text style = {styles.emailText}>{user.useremail}</Text>
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

const ProfileNavigator = createSwitchNavigator(
    {
        MainScreen,
        MyUpcomingScreen,
        EventsFollowingScreen,
        EventUpdatesScreen,
        AddFriendsScreen,
        FriendRequestsScreen,
        FriendsListScreen,
        WhereFriendsScreen,
        IncomingInvScreen,
        OutgoingInvScreen
    },
    {initialRouteName: 'MainScreen'
    },
)

const ProfileContainer = createAppContainer(ProfileNavigator);

export default function ProfileScreen({navigation}){
    return (
        <ProfileContainer/>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex:1,
        backgroundColor:'#fff9f9',
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
