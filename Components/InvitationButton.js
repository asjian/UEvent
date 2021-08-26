import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View, Dimensions,} from 'react-native';


export default function ProfileButton({onPress, title, location, time}) {
    return (
        <View style={styles.block}>
            <TouchableOpacity onPress = {onPress}>
                <View style={{flexDirection: 'row'}}>
                    <View style = {styles.button}>
                        <Text style = {styles.buttonText}> {title} </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row'}}>
                            <Image
                                source={require('../assets/Vector.png')}
                                style={{width:16, height: 16, marginLeft: 5,tintColor:'orange'}}>
                            </Image>
                            <Text style = {{marginBottom: 5, color: 'orange', fontSize: 16, marginRight: 10, fontWeight: 'bold'}}> {location} </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            <Image
                                source={require('../assets/CalendarIcon.png')}
                                style={{width:16, height: 16, marginLeft: 5}}>
                            </Image>
                            <Text style = {{marginBottom: 5, color: '#03a9f4', fontSize: 16, fontWeight: 'bold'}}> {time} </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                marginBottom: 5
                            }}>
                                <TouchableOpacity style={{
                                borderColor: '#ffcb05',
                                borderWidth: 1,
                                borderRadius: 8,
                                width: (Dimensions.get('window').width - 81.6) / 3,
                                height: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                                }}>
                                    <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: '#ffcb05',
                                    }}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                borderColor: 'red',
                                borderWidth: 1,
                                borderRadius: 8,
                                width: (Dimensions.get('window').width - 81.6) / 3,
                                height: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                                }}>
                                    <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: 'red',
                                    }}>Decline</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                borderColor: '#434343',
                                borderWidth: 1,
                                borderRadius: 8,
                                width: (Dimensions.get('window').width - 81.6) / 3,
                                height: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                                }}>
                                    <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: '#434343',
                                    }}>Ignore</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        
    );
}
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#434343',
        marginBottom: 5,
        marginTop: 5
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
