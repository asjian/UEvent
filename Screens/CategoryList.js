import React, {useState,Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,ScrollView,Alert} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import CategoryButton from '../objects/categoryButton';

export default function CategoryList({navigation}) {
    const categories = [{name:'Extracurriculars', icon: require('../assets/club.png'), key:0,},
    {name:'Parties', icon: require('../assets/parties.png'),key:1,}, {name:'Social',icon: require('../assets/social.png'),key:2,},
    {name:'Community',icon: require('../assets/community.png'),key:3,},{name:'Career',icon: require('../assets/career.png'),key:4,},
    {name:'Sports',icon: require('../assets/sports.png'),key:5,}, {name:'Art/Design', icon: require('../assets/artdesign.png'),key:6,}];

    const backParams = {
        Categories: navigation.getParam('Categories'),
        TimeRange: navigation.getParam('TimeRange'),
        OtherFilters: navigation.getParam('OtherFilters'),
    }
    let totalSelections = navigation.getParam('Categories').length;
    const [showInstructions,setShowInstructions] = useState('flex');

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
            <Text style = {[styles.instructionsText]}>Select up to 3 categories</Text>
            <View style = {{borderBottomColor: '#d4d4d4',borderBottomWidth: 1.5,marginTop: 12,marginBottom:5,marginHorizontal:-23,}}/>
            <ScrollView>
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
                <View style = {styles.selectContainer}>
                    <Text style = {styles.selectText}>Select</Text>
                </View>
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
        marginTop: 40,
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 15,
    },
    instructionsText: {
        fontWeight: '500',
        fontSize: 20,
        marginTop: 25,
        marginBottom: 10,
        marginLeft: 67,
    },
    backText: {
        fontWeight:'bold',
        fontSize: 18,
        color: '#0085ff',
        left: 23,
        marginRight: 64,
    },
    scrollContainer: {
        height: '75%',
        marginHorizontal: 25,
    },
    selectContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        marginHorizontal: 50,
        width: '75%',
        alignItems: 'center',
        top: 0,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 10,
    },
    selectText: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingVertical: 10,
        color: '#fab400',
    },
})
