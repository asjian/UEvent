import React, {useState,Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,ScrollView,Alert} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import CategoryButton from '../objects/categoryButton';

export default function CategoryList({navigation}) {
    const categories = [{name:'Extracurriculars', icon: require('../assets/club.png'), key:0,},
    {name:'Parties', icon: require('../assets/parties.png'),key:1,}, {name:'Social',icon: require('../assets/social.png'),key:2,},
    {name:'Community',icon: require('../assets/community.png'),key:3,},{name:'Career',icon: require('../assets/career.png'),key:4,},
    {name:'Sports',icon: require('../assets/sports.png'),key:5,}, {name:'Games',icon: require('../assets/games.png'),key:6,},
    {name:'Cultural',icon: require('../assets/culture.png'),key:7,},{name:'Music',icon: require('../assets/music.png'),key:8,},
    {name:'Art/Design', icon: require('../assets/artdesign.png'),key:9,},{name:'Food + Drink', icon: require('../assets/food.png'),key:10,}];

    const backParams = {
        Categories: navigation.getParam('Categories'),
        TimeRange: navigation.getParam('TimeRange'),
        OtherFilters: navigation.getParam('OtherFilters'),
    }
    let totalSelections = navigation.getParam('Categories').length;
    const [selectEnabled,setSelectEnabled] = useState(totalSelections>0?true:false);
    const [scrollHeight, setScrollHeight] = useState('76%');

    const linSearchCategories = (catName) => {
        for(let i=0;i<backParams.Categories.length;i++) {
            if (backParams.Categories[i].name == catName)
                return i;
        }
        return -1;
    }
    renderCategory = (obj) => {
        if(linSearchCategories(obj.name) != -1)
            return <CategoryButton id = {obj.id} icon = {obj.icon} name = {obj.name} pressHandler = {categoryPressHandler} isPressed = {true}/>
        else
            return <CategoryButton id = {obj.id} icon = {obj.icon} name = {obj.name} pressHandler = {categoryPressHandler} isPressed = {false}/>
    }
    categoryPressHandler = (id,icon,name,add) => {
        if(add) {
            if(totalSelections == 3) {
                Alert.alert('Limit Reached','You can only choose up to 3 categories',[{text:'Got It'}]);
                return false;
            }
            else {
                backParams.Categories.push({id:id,icon:icon,name:name});
                totalSelections++;
                if(totalSelections > 0) {
                    setSelectEnabled(true);
                }
                return true;
            }
        }
        else {
            const index = linSearchCategories(name);
            backParams.Categories.splice(index,1);
            totalSelections--;
            if(totalSelections < 1) {
                setSelectEnabled(false);
            }
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
            <View style = {[styles.scrollContainer,{height:scrollHeight}]}>
            <Text style = {[styles.instructionsText]}>Select up to 3 categories</Text>
            <View style = {{borderBottomColor: '#d4d4d4',borderBottomWidth: 1.5,marginTop: 5,marginBottom:3,marginHorizontal:-23,}}/>
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
            <TouchableOpacity onPress = {()=>navigation.navigate('Search',backParams)} disabled = {!selectEnabled}>
                <View style = {[styles.selectContainer,{opacity:scrollHeight=='100%'?0.0:selectEnabled?1.0:0.33}]}>
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
        marginLeft: 25,
    },
    selectContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        marginHorizontal: 50,
        marginTop: 5,
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
