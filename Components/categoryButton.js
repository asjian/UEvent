import React, {useState} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

export default function CategoryButton({icon,name,pressHandler,isPressed}) { //icon should be of form require(PATH)
    const [pressed,setPressed] = useState(isPressed);

    let initialColor = '#847cb5';
    if(isPressed)
        initialColor = '#fab400';

    const [color,setColor] = useState(initialColor);

    const myPressHandler = () => {
        let success = false;
        if(pressed  == false) {
            success = pressHandler(icon,name,true);
            if(success)
                setColor('#fab400');
        }
        else {
            success = pressHandler(icon,name,false);
            if(success)
                setColor('#847cb5');
        }
        if(success)
            setPressed(!pressed);
    }
    return (
        <TouchableOpacity onPress = {myPressHandler}>
            <View style = {styles.container}>
                <Image source = {icon} tintColor = {color} style = {styles.icon}/>
                <View style = {styles.textContainer}>
                    <Text style = {[styles.text,{color:color}]}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 367,
    },
    icon: {
        left:20,
        width: 30,
        height: 30,
        marginRight: -23,
    },
    textContainer: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontWeight: '500',
        fontSize: 23,
        marginVertical: 16,
    },
    check: {

    },
})