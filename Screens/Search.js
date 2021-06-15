import { StatusBar } from 'expo-status-bar';
import React, {useState,Component} from 'react';
import {StyleSheet, Text, View,SafeAreaView,Keyboard,TouchableWithoutFeedback,TouchableOpacity,ScrollView,Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import CategoryList from './CategoryList';
import {AntDesign} from '@expo/vector-icons';

export default function Search({navigation}) {

    const searchSubmitHandler = (searchText) => {
        console.log(searchText);
    }
    const iconColor = '#adadad';
    const [searchText, setSearchText] = useState('');

    return (
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        <View style = {styles.outerContainer}>
        <View style = {styles.innerContainer}>
                <Text style = {styles.headerText}>Search</Text>
                <View style = {styles.close}>
                    <Ionicons name = 'close-circle-outline' size = {38} onPress = {() => navigation.goBack()}/>
                </View>

                <SearchBar 
                ref={search => this.search = search}
                placeholder = 'Event Names, Organizers, or Tags' 
                onChangeText = {(search) => {setSearchText(search)}}
                value = {searchText}
                onSubmitEditing = {() => {searchSubmitHandler(searchText)}}
                
                inputStyle = {styles.input}
                inputContainerStyle = {styles.inputContainer}
                containerStyle = {styles.searchContainer}
                searchIcon = {<Ionicons name = 'search-sharp' size = {30} color = {iconColor}/>}
                clearIcon = {<Ionicons name = 'close-outline' size = {28} color = {iconColor} onPress = {() => this.search.clear()}/>}
                />

                <View>
                    <Text style = {[styles.headerText,{marginTop: 62, marginBottom: 22}]}>Filters</Text>

                    <TouchableOpacity onPress = {() => navigation.push('CategoryList')} style = {styles.buttonStyle}>
                        <Image source = {require('../assets/categories.png')} size = {30} style = {styles.leftIcon}/> 
                        <Text style = {styles.buttonText}>Event Categories</Text>
                        <AntDesign name = 'right' size = {30} color = '#828181' style = {styles.rightIcon}/>
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress = {() => navigation.push('CategoryList')} style = {styles.buttonStyle}>
                        <Image source = {require('../assets/clock.png')} size = {30} style = {styles.leftIcon}/> 
                        <Text style = {[styles.buttonText, {marginLeft: 18}]}>Time Range</Text>
                        <AntDesign name = 'right' size = {30} color = '#828181' style = {[styles.rightIcon,{marginLeft: 148}]}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() => navigation.push('CategoryList')} style = {styles.buttonStyle}>
                        <Image source = {require('../assets/filter.png')} size = {30} style = {styles.leftIcon}/> 
                        <Text style = {[styles.buttonText,{marginLeft: 17}]}>Other Filters</Text>
                        <AntDesign name = 'right' size = {30} color = '#828181' style = {[styles.rightIcon, {marginLeft:140}]}/>
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
        marginLeft: 10,
        marginRight: 15,
        backgroundColor: '#fffbf2',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    input: {
        color: '#000000'
    },
    inputContainer :{
        borderRadius: 25,
        backgroundColor: '#d7d7d7',
    },
    close: {
        position: 'absolute',
        left: 360,
        top: 12,
    },
    headerText: {
        fontSize: 27,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 20.4,
    },
    buttonStyle: {
        backgroundColor: '#ffffff',
        height: 50,
        width: 345,
        shadowOffset: {
            width: 0,
            height: 0.25,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        borderRadius: 10,
        marginHorizontal: 20.4,
        marginBottom: 30,
        width: '88%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '600',
        opacity: 0.5,
        marginLeft: 15,
    },
    leftIcon: {
        marginLeft: 15,
    },
    rightIcon: {
        marginLeft: 95,
    },
})
