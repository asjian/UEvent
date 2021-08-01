import React, {useState,Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,ScrollView,Alert} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import CategoryButton from '../objects/categoryButton';

export default function CategoryList({navigation}) {
    const categories = [{name:'Extracurriculars', icon: require('../assets/extracurriculars.png'), key:0,},
    {name:'Parties', icon: require('../assets/parties.png'),key:1,}, {name:'Social',icon: require('../assets/social.png'),key:2,},
    {name:'Career',icon: require('../assets/career.png'),key:3,}, {name:'Networking',icon: require('../assets/networking.png'),key:4,},
    {name:'Community',icon: require('../assets/test2.png'),key:5,}, {name:'Fair/Festival',icon: require('../assets/festival.png'),key:6,}, 
    {name:'Greek Life',icon: require('../assets/greeklife.png'),key:7,}, {name:'Sports',icon: require('../assets/sports.png'),key:8,}, 
    {name:'Games',icon: require('../assets/games.png'),key:9,}, {name:'Cultural',icon: require('../assets/cultural.png'),key:10,}, 
    {name:'Activism',icon: require('../assets/activism.png'),key:11,}, {name:'Music',icon: require('../assets/music.png'),key:12,}, 
    {name:'Art/Design', icon: require('../assets/artdesign.png'),key:13,}, {name:'Food + Drink', icon: require('../assets/fooddrink.png'),key:14,}, 
    {name:'Performance', icon: require('../assets/performance.png'),key:15,}, {name:'Presentation', icon: require('../assets/presentation.png'),key:16,}, 
    {name:'Exhibition', icon: require('../assets/exhibition.png'),key:17,}, {name:'Academic', icon: require('../assets/academic.png'),key:18,},
    {name:'Science/Tech', icon: require('../assets/science.png'),key:19,}, {name:'Business/Professional', icon: require('../assets/business.png'),key:20,},
    {name:'Other', icon: require('../assets/other.png'),key:23,}];

    const backParams = {
        SearchType: navigation.getParam('SearchType'),
        SearchText: navigation.getParam('SearchText'),
        Categories: navigation.getParam('Categories'),
        TimeRange: navigation.getParam('TimeRange'),
        OtherFilters: navigation.getParam('OtherFilters'),
        CloseBotSheet: navigation.getParam('CloseBotSheet'),
    }
    let localCategoriesCopy = [];
    for(let i=0;i<backParams.Categories.length;i++) {
        localCategoriesCopy.push(backParams.Categories[i]);
    }

    let totalSelections = navigation.getParam('Categories').length;
    const [scrollHeight, setScrollHeight] = useState('77%');

    const linSearchCategories = (catName) => {
        for(let i=0;i<localCategoriesCopy.length;i++) {
            if (localCategoriesCopy[i].name == catName)
                return i;
        }
        return -1;
    }
    const renderCategory = (obj) => {
        if(linSearchCategories(obj.name) != -1)
            return <CategoryButton id = {obj.id} icon = {obj.icon} name = {obj.name} pressHandler = {categoryPressHandler} isPressed = {true}/>
        else
            return <CategoryButton id = {obj.id} icon = {obj.icon} name = {obj.name} pressHandler = {categoryPressHandler} isPressed = {false}/>
    }
    const categoryPressHandler = (id,icon,name,add) => {
        if(add) {
            if(totalSelections == 3) {
                Alert.alert('Limit Reached','You can only choose up to 3 categories',[{text:'Got It'}]);
                return false;
            }
            else {
                localCategoriesCopy.push({id:id,icon:icon,name:name});
                totalSelections++;
                return true;
            }
        }
        else {
            const index = linSearchCategories(name);
            localCategoriesCopy.splice(index,1);
            totalSelections--;
            return true;
        }
    }
    const backHandler = () => {
        navigation.navigate('MainScreen',backParams);
    }
    const selectHandler = () => {
        backParams.CloseBotSheet = true;
        backParams.Categories.length = 0;
        for(let i=0;i<localCategoriesCopy.length;i++) 
            backParams.Categories.push(localCategoriesCopy[i]);   

        backParams.SearchType = 'filter';
        if(backParams.Categories.length == 0 && (backParams.TimeRange.startDate == '' && backParams.TimeRange.endDate == '' && 
            backParams.TimeRange.startTime == '' && backParams.TimeRange.endTime == '')) {
            if(backParams.SearchText == '')
                backParams.SearchType = 'none';
            else
                backParams.SearchType = 'text';
        }
        navigation.navigate('MainScreen',backParams);
    }
    return (
        <View style = {styles.container}>
            <View style = {styles.headerContainer}>
                <TouchableOpacity onPress = {backHandler}>
                    <Text style = {styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style = {styles.headerText}>Event Categories</Text>
            </View>
            <View style = {[styles.scrollContainer,{height:scrollHeight}]}>
            <Text style = {[styles.instructionsText]}>Select up to 3 categories</Text>
            <View style = {{borderBottomColor: '#d4d4d4',borderBottomWidth: 1.5,marginTop: 5,marginBottom:0,marginHorizontal:-23,}}/>
            <ScrollView /*onMomentumScrollBegin = {() => {setScrollHeight('100%')}} onMomentumScrollEnd = {() => {setScrollHeight('77%')}*/>
                {categories.map((item) => {
                    return (
                        <View key = {item.key}>
                            {renderCategory({id:item.key,icon:item.icon,name:item.name})}
                        </View>
                    )
                })}
            </ScrollView>
            </View>
            <TouchableOpacity onPress = {selectHandler}>
                <View style = {[styles.selectContainer]}>
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
        fontWeight: '600',
        fontSize: 22,
        marginVertical: 15,
    },
    instructionsText: {
        fontWeight: '500',
        fontSize: 18,
        marginTop: 25,
        marginBottom: 10,
        marginLeft: 78,
    },
    backText: {
        fontWeight:'bold',
        fontSize: 18,
        color: '#0085ff',
        left: 23,
        marginRight: 75,
    },
    scrollContainer: {
        marginLeft: 25,
    },
    selectContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        marginHorizontal: 58,
        marginTop: 7,
        width: '70%',
        alignItems: 'center',
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
        fontSize: 26,
        paddingVertical: 10,
        color: '#fab400',
    },
})
