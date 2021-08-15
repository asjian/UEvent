import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, Modal, StyleSheet, Image, Keyboard, Dimensions} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


export default function PersonSearchBar() {
    const [pressed,setPressed] = useState(false);
    const [iconColor,setIconColor] = useState('#adadad');

    return (
        <SearchBar 
        placeholder = 'Search Here' 
        onSubmitEditing = {() => {setPressed(false)}}
        autoCorrect = {false}

        inputStyle = {styles.input}
        inputContainerStyle = {pressed?styles.inputContainer1:styles.inputContainer2}
        containerStyle = {pressed?styles.searchContainer2:styles.searchContainer1}
        searchIcon = {pressed?<Ionicons name = 'chevron-back' size = {30} color = {iconColor} onPress = {() => setPressed(false)}/>:
        <Image source = {require('../assets/search.png')} style = {{width:26,height:27,tintColor:iconColor,marginLeft: 2,}}/>}
        clearIcon = {<Ionicons name = 'close-outline' size = {28} color = {iconColor} onPress = {() => {this.search.clear();clearHandler()}}/>}
        />
    );
  
}

const styles = StyleSheet.create({
    headerContainer1: {
        
    },
    headerContainer2: {
        backgroundColor: 'white', 
    },
    searchContainer1: {
        justifyContent:'flex-start',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 15,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchContainer2: {
        justifyContent:'flex-start',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 15,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    input: {
        color: '#000000',
    },
    inputContainer1 :{
        borderRadius: 24,
        borderColor:'#e2e2e2',
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderBottomWidth: 1.5,
        height: 45,
    },
    inputContainer2: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        height: 45,
    },
    close: {
        position: 'absolute',
        left: 360,
        top: 6,
    },
    suggestionsText: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 20.4,
        marginTop: 15,
    },
})
