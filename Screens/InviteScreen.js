import React, {useState,Component} from 'react';
import MapSearchBar from '../objects/mapSearchBar';
import {StyleSheet, Dimensions, Text, View, SafeAreaView, TouchableOpacity,ScrollView,Alert} from 'react-native';
import ListButton from '../objects/listButton';
import BackButton from '../objects/backButton';
import PlusButton from '../objects/plusButton';
import PersonSearchBar from '../objects/PersonSearchBar';
import AddMoreButton from '../objects/addPeople';


export default function InviteScreen({navigation}) {

    const event = navigation.getParam('event');

    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <SafeAreaView style={{
            flex: 1,
            position: 'absolute',
            backgroundColor: '#fff',
            width: '100%'
            }}>
                <View style={{width: '90%',
                marginLeft: 20.4}}>
                <BackButton onPress={() => navigation.goBack()} title = 'Current Invites'/>
                </View> 
                <PersonSearchBar/>
                <View style={{position: 'absolute', top: Dimensions.get('window').height - 150, left: Dimensions.get('window').width / 2 - 60}}>
                    <AddMoreButton onPress={()=>navigation.navigate('InvitePeopleScreen', {event:event})}/>
                </View>
            </SafeAreaView>
        </View>
        
    );
    
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        marginLeft: 20,
        width: '90%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 7,
    }
})
