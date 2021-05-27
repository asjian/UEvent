import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import ProfileButton from './components/ProfileButton';

const HORIZONTALMARGIN = 20.4;

export default function ProfileScreen({navigation}) {
    const user = {
        username: 'Alex Jian',
        useremail: 'asjian@umich.edu',
        avatarsource: require('./assets/avatar.png'),
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
                <ProfileButton onPress = {() => {}} title = 'My Upcoming Events' />
                <ProfileButton onPress = {() => {}} title = "Events I'm Following" />
                <ProfileButton onPress = {() => {}} title = 'Event Updates' />
                <Text style = {styles.headerText}>Friends</Text>
                <ProfileButton onPress = {() => {}} title = 'Add Friends' />
                <ProfileButton onPress = {() => {}} title = 'Friend Requests' />
                <ProfileButton onPress = {() => {}} title = 'Friends List' />
                <ProfileButton onPress = {() => {}} title = 'Where my Friends are Going' />
                <Text style = {styles.headerText}>Invitations</Text>
                <ProfileButton onPress = {() => {}} title = 'Incoming Invitations' />
                <ProfileButton onPress = {() => {}} title = 'Outgoing Invitations' />
                <Text style = {styles.headerText}>Events I'm Hosting</Text>
                <ProfileButton onPress = {() => {navigation.navigate('HostScreen',user)}} title = 'Manage My Events' />
            </View>
        </ScrollView>
    </SafeAreaView>
    </View>
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