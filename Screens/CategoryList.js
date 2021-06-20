import React, {useState,Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,ScrollView,Alert} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import CategoryButton from '../objects/categoryButton';

export default function CategoryList({navigation}) {
    const categories = [{name:'Student Orgs', icon: require('../assets/parties.png'), key:0,},
    {name:'Parties', icon: require('../assets/parties.png'),key:1,}, {name:'Sports',icon: require('../assets/parties.png'),key:2,},
    {name:'Art/Design', icon: require('../assets/parties.png'),key:3,}];

    const backParams = {
        Categories: navigation.getParam('Categories'),
        TimeRange: navigation.getParam('TimeRange'),
        OtherFilters: navigation.getParam('OtherFilters'),
    }
    let totalSelections = navigation.getParam('Categories').length;

    const linSearchCategories = (catName) => {
        for(let i=0;i<backParams.Categories.length;i++) {
            if (backParams.Categories[i].name == catName)
                return i;
        }
        return -1;
    }
    renderCategory = (obj) => {
        if(linSearchCategories(obj.name) != -1)
            return <CategoryButton icon = {obj.icon} name = {obj.name} pressHandler = {categoryPressHandler} isPressed = {true}/>
        else
            return <CategoryButton icon = {obj.icon} name = {obj.name} pressHandler = {categoryPressHandler} isPressed = {false}/>
    }
    categoryPressHandler = (icon,name,add) => {
        if(add) {
            if(totalSelections == 3) {
                Alert.alert('Limit Reached','You can only choose up to 3 categories',[{text:'Got It'}]);
                return false;
            }
            else {
                backParams.Categories.push({icon:icon,name:name});
                totalSelections++;
                return true;
            }
        }
        else {
            const index = linSearchCategories(name);
            backParams.Categories.splice(index,1);
            totalSelections--;
            return true;
        }
    }
    return (
        <View style = {styles.container}>
            <View style = {styles.headerContainer}>
                <TouchableOpacity onPress = {() => {navigation.navigate('Search',backParams)}}>
                    <Text style = {styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style = {styles.headerText}>Event Categories</Text>
            </View>
            <View style = {styles.scrollContainer}>
            <ScrollView>
            <Text style = {{marginBottom: 10}}></Text>
                {categories.map((item) => {
                    return (
                        <View key = {item.key}>
                            {renderCategory({icon:item.icon,name:item.name})}
                        </View>
                    )
                })}
            </ScrollView>
            </View>
            <TouchableOpacity onPress = {()=>navigation.navigate('Search',backParams)}>
                <Text style = {styles.selectText}>Select</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffbf2',
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 45,
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 26,
        marginVertical: 15,
    },
    backText: {
        fontWeight:'bold',
        fontSize: 18,
        color: '#0085ff',
        left: 23,
        marginRight: 64,
    },
    scrollContainer: {
        height: '65%',
        marginHorizontal: 20.4,
    },
    selectText: {
        fontWeight: 'bold',
        fontSize: 30,
        position: 'absolute',
        left: 166,
        top: 0,
    },
})
