import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, TouchableOpacity } from 'react-native';

function WelcomeScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textStyle}>Welcome to</Text>
            <Text style={styles.textStyle}>EventHub, User!</Text>
            <TouchableOpacity style={styles.findEventsButton} onPress={() => navigation.navigate("FindEvents")}>
                <Text style={styles.findEventsButton}>Find Events</Text>
                
            </TouchableOpacity>
            <TouchableOpacity style={styles.hostEventsButton} onPress={() => navigation.navigate("HostEvents")}>
                <Text style={styles.hostEventsButton}>Host Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Profile")}>
                <Text style={styles.profileButton}>Profile</Text>
            </TouchableOpacity>
        </SafeAreaView>
        
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 200,
    },
    textStyle: {
        fontSize: 50,
        fontWeight: "bold"

    },
    findEventsButton: {
        marginTop: 65,
        width: "80%",
        height: 50,
        fontSize: 50,
        alignItems: "center",

    },
    hostEventsButton: {
        marginTop: 65,
        width: "80%",
        height: 50,
        fontSize: 50,
        alignItems: "center",
    },
    profileButton: {
        marginTop: 65,
        width: "80%",
        height: 50,
        fontSize: 50,
        alignItems: "center",
    }
})