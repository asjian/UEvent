import React, {useState,Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,ScrollView,Alert} from 'react-native';

export default function OtherFilters({navigation}) {
    const backParams = {
        Categories: navigation.getParam('Categories'),
        TimeRange: navigation.getParam('TimeRange'),
        OtherFilters: navigation.getParam('OtherFilters'),
    }
    return (
        <View style = {styles.container}>
            <View style = {styles.headerContainer}>
                <TouchableOpacity onPress = {() => {navigation.navigate('Search',backParams)}}>
                    <Text style = {styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style = {styles.headerText}>Other Filters</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffbf2',
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 40,
        alignItems: 'center',
    },
    backText: {
        fontWeight:'bold',
        fontSize: 18,
        color: '#0085ff',
        left: 23,
        marginRight: 88,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 15,
    },
})