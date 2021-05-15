import React from 'react';
import {ImageBackground, StyleSheet, Image, View} from 'react-native';
//I made this yo
import CustomButton from '../objects/button';

function WelcomeScreen({navigation}) {
    //function for button nav
    const pressHandler = () => {
        navigation.navigate('HomeScreen');
    }
    return (
        <ImageBackground 
            style={styles.background}
            source={require('../assets/background.png')}
        >
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
            <View style={styles.buttons}>
                <CustomButton text='find events' onPress={pressHandler}/>
                <CustomButton text='host events' onPress={pressHandler}/>
                <CustomButton text='profile' onPress={pressHandler}/>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        position: 'absolute',
        top: 100
    },
    buttons: {
        position: 'absolute',
        top: 400,
    },
})

export default WelcomeScreen;