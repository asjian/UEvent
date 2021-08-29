import React, {useState} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,TouchableHighlight,Image, Dimensions} from 'react-native';

export default function DateButton({name,value,pressHandler}) {
    return (
        <TouchableOpacity style={{backgroundColor: '#FFF',
        borderRadius: 8,
        borderColor: name==value?'#fab400':'#0085ff',
        borderWidth: 1,
        height: 55,
        justifyContent: 'center',
        marginHorizontal: 15,
        marginBottom: 20,
        width: Dimensions.get('window').width - 80
        }}
        onPress = {() => {pressHandler(name)}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                color:name==value?'#fab400':'#0085ff',
                }}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
}
