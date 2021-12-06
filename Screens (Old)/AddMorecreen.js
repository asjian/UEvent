import React, {useState,Component} from 'react';
import MapSearchBar from '../objects/mapSearchBar';
import {StyleSheet, Dimensions, Text, View, SafeAreaView, TouchableOpacity,ScrollView,Alert} from 'react-native';
import ListButton from '../objects/listButton';
import BackButton from '../objects/backButton';
import PlusButton from '../objects/plusButton';
import PersonSearchBar from '../objects/PersonSearchBar';


export default function InviteScreen({navigation}) {
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
                <BackButton onPress={() => navigation.goBack()} title = 'Add More'/>
                </View> 
                <PersonSearchBar/>
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
