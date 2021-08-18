import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView} from 'react-native';
import BackButton from '../objects/backButton';
import ProfileButton from '../objects/profileButton';

export default function EventsFollowingScreen({navigation}) {
    return (
        <SafeAreaView style={styles.button}>
          <BackButton onPress={() => navigation.navigate('MainScreen')} title = "Events I'm Following"/>
          <ScrollView>
            <ProfileButton onPress = {() => {}} title = 'GARAGE BAR ST.PATRICKS DAY' />
            <ProfileButton onPress = {() => {}} title = 'EECS 494 CONVENTION' />
            <ProfileButton onPress = {() => {}} title = 'ELECTRIC RACING INTEREST MEETING' />
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
