import React, { Component } from 'react';
import { SafeAreaView, View, Text, Settings, TouchableOpacity, StyleSheet, Image, Modal, Button, setItems } from 'react-native';
import NavBar from '../screens/NavBar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SearchScreen from './SearchScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SettingsScreen from './SettingsScreen';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';






const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();



// Dropdown menu to pick event type
const TypeSelector = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('all events');
  const [items, setItems] = useState([
    {label: 'All Events', value: 'all events'},
    {label: 'Private Events', value: 'private events'},
    {label: 'My Events', value: 'my events'}
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}





function FindEventsScreen({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
            {/* Top left search button */}
            <View style={[{flex: 1} ]}>
                <TouchableOpacity style = {styles.SearchButton} onPress={() => setModalVisible(true)}>
                    <Image style={styles.SearchIconStyle} source={require('../SearchIcon.png')}/>
                </TouchableOpacity>
            </View>
                
            {/* Event type menu */}
            <View style={styles.DropdownStyle}>
                <TypeSelector style={styles.DropdownStyle}/>
            </View>
            {/* Top right settings button */}
            <View style={[{flex: 1}]}>
                <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("SettingsScreen")}>
                    <Image style={styles.SettingsIconStyle} source={require('../SettingsIcon.png')} />
                </TouchableOpacity>
            </View>
            {/* Search pop up */}
            <Modal
                animationType= "slide"
                transparent={false}
                visible = {modalVisible}
            >
                <View style={styles.centeredView}>
                    <View styles={styles.modalView}>
                        <Text>Search</Text>
                        <Button title="X" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
    const styles = StyleSheet.create({  
    
    SearchIconStyle : {
        height: 40,
        width: 40,
        marginRight: 65
    },

    SettingsIconStyle : {
        height: 40,
        width: 40,
        marginLeft: 65
    },
    
    PopUpStyle : {
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 20,
        padding: 35,
        margin: 20
    },
    modalView: {
        margin: 70,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 400,
        height: 650
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },

      DropdownStyle: {
        alignItems: 'center',
        width: 175,
        flex:2,
    }
})

export default FindEventsScreen;