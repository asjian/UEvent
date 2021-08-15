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
                <BackButton onPress={() => navigation.goBack()} title = 'Invite'/>
                </View> 
                <PersonSearchBar/>
                
                <View style={{marginLeft: 20, width: '90%', marginRight: 20}}>
                    <Text style = {styles.headerText}>Saved Lists</Text>
                    <ListButton title = 'GOON SQUAD' 
                    members = "Kartikeya Gupta, Alex Jian, Justin Li, and 4 more"
                    onPress={()=>navigation.navigate('InviteListView')}/>
                    <Text style = {styles.headerText}>Previous Lists</Text>
                    <ListButton title = 'EVENTHUB AUG 14' 
                    members = "Alex Jian, Sundeep Ravella, Jiyang Zhou, and 1 more"/>
                </View>
                <View style={{alignSelf: 'flex-end', marginTop: 20, marginRight: 20}}>
                    <PlusButton onPress={() => navigation.navigate('CreateInviteList')}/>
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
