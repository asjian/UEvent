import React,{useState,useContext} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet, Image,} from 'react-native';
import Search from '../screens/Search';
import AppContext from './AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function mapSearchBar({navigation,searchDefaultParams}) {
    const myContext = useContext(AppContext);
    const clearHandler = () => {
        searchDefaultParams.SearchText = '';
        searchDefaultParams.Categories.length = 0;
        searchDefaultParams.TimeRange = {startDate:'',endDate:'',duration:''};
        searchDefaultParams.OtherFilters = [];
        searchDefaultParams.SearchType = 'none';
        myContext.toggleShowNavBar(true);
        navigation.navigate('MainScreen',searchDefaultParams);
    }
    return (
        <TouchableWithoutFeedback onPress = {() => navigation.navigate('Search',searchDefaultParams)}>
            <View style = {styles.container}>
                <Text style = {styles.text}>{searchDefaultParams.SearchText}</Text>
                <View style = {styles.clearIcon}>
                    <Ionicons name = 'close-outline' size = {28} color = '#606060' onPress = {clearHandler}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    text: {
        fontSize: 20,
        paddingVertical: 10,
        marginLeft: 20,
    },
    clearIcon: {
        position: 'absolute',
        right: 10,
    }
})