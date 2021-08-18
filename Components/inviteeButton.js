import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View, Dimensions,} from 'react-native';


export default function inviteeButton({onPress, name, email}) {
    return (
        <View style={styles.block}>
            <TouchableOpacity onPress = {onPress}>
                <Text style = {styles.buttonText}>{name}</Text>
                <Text style = {styles.buttonText}>{email}</Text>
            </TouchableOpacity>
        </View>
        
    );
}
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#434343',
        marginBottom: 5,
        marginTop: 5,
    },
    button: {
        flex: 1,
    },
    icon: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    block: {
        backgroundColor: 'white',
        marginBottom: 5,
        borderRadius: 5,
        shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1, 
    },
})