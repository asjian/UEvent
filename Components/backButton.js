import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View,} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

export default function BackButton({onPress, title}) {
    return (
        <View style={styles.button}>
            <View style={styles.icon}>
                <TouchableOpacity onPress = {onPress}>
                    <AntDesign name = 'left' size = {24} color = '#000000'/> 
                </TouchableOpacity>
            </View>
           
            <Text style = {styles.buttonText}> {title} </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    button: {
        flex: 1,
        paddingBottom: 20.4,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    icon: {
         
    },
    buttonText: {
        marginLeft: 20.4,
        fontSize: 24,
        fontWeight: 'bold'
    }
})