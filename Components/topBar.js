import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Search from '../screens/Search';

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
    const searchDefaultParams = {
      Categories: [],
      TimeRange: [],
      OtherFilters: [],
    }
    return (
        <SafeAreaView style={[{flexDirection: 'row'}, {alignItems: 'center'}]}>
            {/* Top left search button */}
            <View style={[{flex: 1} ]}>
                <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("Search",searchDefaultParams)}>
                    <Image style={styles.SearchIconStyle} source={require('../assets/search_icon.png')}/>
                </TouchableOpacity>
            </View>
                
            {/* Event type menu */}
            <View style={styles.DropdownStyle}>
                <TypeSelector style={styles.DropdownStyle}/>
            </View>
            {/* Top right settings button */}
            <View style={[{flex: 1}]}>
                <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("SettingsScreen")}>
                    <Image style={styles.SettingsIconStyle} source={require('../assets/settings_icon.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
    const styles = StyleSheet.create({  
    
    SearchIconStyle : {
        height: 25,
        width: 25,
        alignSelf: 'flex-start',
        marginLeft: 20.4
    },

    SettingsIconStyle : {
        height: 25,
        width: 25,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 20.4
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
