import React, {useState,Component} from 'react';
import {StyleSheet, Text, View,SafeAreaView,Keyboard,TouchableWithoutFeedback,TouchableOpacity,ScrollView} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

export default function CategoryList({navigation}) {
    console.log('reached category list');
    const categories = [{name:'Student Orgs',key:0,},{name:'Parties',key:1,},{name:'Sports',key:2,},{name:'Art/Design',key:3,}];

    return (
        <View style = {categoryStyles.container}>
            <View style = {categoryStyles.scrollContainer}>
            <ScrollView>
                {categories.map((item) => {
                    return (
                        <View key = {item.key}>
                            <TouchableOpacity>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
            </View>
            <TouchableOpacity onPress = {()=>navigation.goBack()}>
                <Text style = {categoryStyles.buttonText}>Select</Text>
            </TouchableOpacity>
        </View>
    )
}
const categoryStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fffbf2',
    },
    scrollContainer: {
        height: '70%',
        marginTop: 50,
        marginLeft: 20.4,
    },
    buttonText: {
        marginLeft: 165,
        fontWeight: 'bold',
        fontSize: 30,
    }
})