import { StatusBar } from 'expo-status-bar';
import React, {useState,Component} from 'react';
import {StyleSheet, Text, View,SafeAreaView,Keyboard,TouchableWithoutFeedback,TouchableOpacity,ScrollView} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

function CategoryList({navigation}) {
    console.log('category list');
    const categories = [{name:'Student Orgs',key:0,},{name:'Parties',key:1,},{name:'Sports',key:2,},{name:'Art/Design',key:3,}];

    return (
        <View style = {categoryStyles.container}>
            <ScrollView>
                {categories.map((item) => {
                    return (
                        <View key = {item.key}>
                            <TouchableOpacity>
                                <Text>item.name</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
            <TouchableOpacity onPress = {navigation.navigate('SearchScreen')}>
                <Text>Select</Text>
            </TouchableOpacity>
        </View>
    )
}
const categoryStyles = StyleSheet.create({
    container: {
        height: '80%',
        marginTop: 'auto',
        marginBottom: 50,
        backgroundColor: '#fffbf2',
    },
})
function SearchScreen({navigation,toggleVisbility}) {
    console.log('reached Search Screen');
    const [searchText, setSearchText] = useState('');

    return (
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        <View style = {styles.container}>
                <Text style = {styles.headerText}>Search</Text>
                <View style = {styles.close}>
                    <AntDesign name = 'closecircleo' size = {30} onPress = {() => toggleVisbility(false)}/>
                </View>
                <SearchBar placeholder = 'Event Names' 
                onChangeText = {(search) => {setSearchText(search); console.log(searchText)}}
                value = {searchText}
                lightTheme = {true}
                containerStyle = {styles.searchContainer}/>
                <View>
                    <Text style = {styles.headerText}>Filters</Text>
                    <TouchableOpacity onPress = {()=>{console.log('pressed');navigation.navigate('CategoryList')}}> 
                        <Text style = {styles.headerText}>Event Categories</Text>
                    </TouchableOpacity>
                </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const SearchNavigator = createSwitchNavigator(
    {
    SearchScreen,
    CategoryList,
    },
    {
    intialRouteName: 'SearchScreen'
    },
)

const SearchContainer = createAppContainer(SearchNavigator);

export default function Search() {
    return <SearchContainer />
}

const styles = StyleSheet.create({
    container: {
        height: '80%',
        marginTop: 'auto',
        marginBottom: 50,
        backgroundColor: '#fffbf2',
    },
    searchContainer: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#fffbf2',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    close: {
        position: 'absolute',
        left: 350,
        top: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 20.4,
    },
    
})