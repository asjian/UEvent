import React, {useState} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,TouchableHighlight,Image} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

export default function CategoryButton({icon,name,pressHandler,isPressed}) { //icon should be of form require(PATH)
    const [pressed,setPressed] = useState(isPressed);

    let initialColor = '#09189e';
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
                setColor('#09189e');
        }
        if(success)
            setPressed(!pressed);
    }
    return (
        <TouchableOpacity onPress = {myPressHandler}>
            <View style = {styles.container}>
                <Image source = {icon} style = {[styles.icon, {tintColor:color}]}/>
                <View style = {styles.textContainer}>
                    <Text style = {[styles.text,{color:color}]}>{name}</Text>
                </View>
                <Image source = {require('../assets/check.png')} style = {[styles.check,{opacity:pressed?1.0:0.0,tintColor:'#fab400'}]}/>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 367,
        borderBottomColor: 'black',
    },
    icon: {
        left:10,
        width: 30,
        height: 30,
        marginRight: -25,
    },
    textContainer: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontWeight: '600',
        fontSize: 22,
        paddingVertical: 20,
        opacity: 0.9,
    },
    check: {
        width: 28,
        height: 28,
        right: 45,
    },
})
