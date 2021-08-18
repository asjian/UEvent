import React, {useState,Component} from 'react';
import MapSearchBar from '../objects/mapSearchBar';
import {StyleSheet, Dimensions, Text, View, SafeAreaView, TouchableOpacity, Image,ScrollView,Alert} from 'react-native';
import ListButton from '../objects/listButton';
import BackButton from '../objects/backButton';
import PlusButton from '../objects/plusButton';
import PersonSearchBar from '../objects/PersonSearchBar';
import AddMoreButton from '../objects/addPeople';


export default function InviteScreen({navigation, route}) {

    // const event = navigation.getParam('event');
    const { event } = route.params;

    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <View style={{
            flex: 1,
            position: 'absolute',
            backgroundColor: '#fff',
            width: '100%'
            }}>
                <View style={{backgroundColor: '#ffcb05'}}>
                <View style={{width: '90%',
                marginLeft: 20, marginTop: 50}}>
                <BackButton onPress={() => navigation.goBack()} title = 'Current Invites'/>
                </View> 
                <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>
                            You have invited:
                        </Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>
                            Jason Derulo, Macklemore, Machine Gun Kelly, and 21 others
                        </Text>
                    </View>
                        
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    shadowColor: '#000',
                    width: 120,
                    borderRadius: 20,
                    justifyContent: 'center',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1,}}
                    onPress={()=>navigation.navigate('InvitePeopleScreen', {event: event})}>
                        <View style={{padding: 7, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{justifyContent: 'center', marginRight: 5, fontWeight: 'bold', color: '#ffcb05', fontSize: 14}}>ADD MORE</Text>
                            <Image source={require('../assets/arrow.png')} style={{height: 12, width:12, tintColor: '#ffcb05'}}/>
                        </View>  
                    </TouchableOpacity>
                </View>
                </View>
            </View>
                <PersonSearchBar navigation={navigation} parentScreen='InviteScreen' />
                
            </View>
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
