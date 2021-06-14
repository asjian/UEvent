import { StatusBar } from 'expo-status-bar';
import React, {useState,Component} from 'react';
import {StyleSheet, Text, View,SafeAreaView,Keyboard,TouchableWithoutFeedback,TouchableOpacity,ScrollView} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import CategoryList from './CategoryList';

export default function Search({navigation}) {
    console.log('reached Search Screen');
    const [searchText, setSearchText] = useState('');

    return (
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        <View style = {styles.outerContainer}>
        <View style = {styles.innerContainer}>
                <Text style = {styles.headerText}>Search</Text>
                <View style = {styles.close}>
                    <AntDesign name = 'closecircleo' size = {30} onPress = {() => navigation.goBack()}/>
                </View>
                <SearchBar placeholder = 'Event Names' 
                onChangeText = {(search) => {setSearchText(search); console.log(searchText)}}
                value = {searchText}
                lightTheme = {true}
                containerStyle = {styles.searchContainer}/>
                <View>
                    <Text style = {styles.headerText}>Filters</Text>
                    <TouchableOpacity onPress = {() => navigation.push('CategoryList')}> 
                        <Text style = {styles.headerText}>Event Categories</Text>
                    </TouchableOpacity>
                </View>
        </View>
        </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#fffbf2',
        flex: 1,
    },
    innerContainer: {
        marginTop: 50,
    },
    searchContainer: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#fffbf2',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    close: {
        position: 'absolute',
        left: 350,
        top: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 20.4,
    },
    
})
