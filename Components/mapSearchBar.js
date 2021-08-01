import React,{useState,useContext} from 'react';
import {View, Text, TouchableWithoutFeedback, Modal, StyleSheet, Image, Keyboard, Dimensions} from 'react-native';
import Search from '../screens/Search';
import AppContext from './AppContext';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import MapFilters from './mapFilters';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

export default function mapSearchBar({navigation,searchDefaultParams}) {
    const myContext = useContext(AppContext);
    const [iconColor,setIconColor] = useState('#adadad');
    const [pressed,setPressed] = useState(false);
    const [searchText, setSearchText] = useState('');

    const backParams = {
        SearchType: searchDefaultParams.SearchType,
        SearchText: searchDefaultParams.SearchText,
        Categories: JSON.parse(JSON.stringify(searchDefaultParams.Categories)),
        TimeRange: JSON.parse(JSON.stringify(searchDefaultParams.TimeRange)),
        OtherFilters: JSON.parse(JSON.stringify(searchDefaultParams.OtherFilters)),
        CloseBotSheet: searchDefaultParams.CloseBotSheet,
    }
    const clearHandler = () => {
        backParams.SearchText = '';
        backParams.CloseBotSheet = true;
        backParams.SearchType = 'filter';

        if(backParams.Categories.length == 0 && backParams.TimeRange.startDate == '' && 
        backParams.TimeRange.endDate == '' && backParams.TimeRange.startTime == '' && 
        backParams.TimeRange.endTime == '')
            backParams.SearchType = 'none';
        /*
        if(backParams.BotSheetInfo.snapPos == 0) {
            myContext.toggleShowNavBar(true);
        }
        */
        navigation.navigate('MainScreen',backParams);
    }
    const submitHandler = (searchText) => {
        console.log('backParams:')
        console.log(backParams);
        backParams.SearchType = 'text';
        if(searchText == '') {
            if(backParams.Categories.length == 0 && backParams.TimeRange.startDate == '' && 
            backParams.TimeRange.endDate == '' && backParams.TimeRange.startTime == '' && 
            backParams.TimeRange.endTime == '')
                backParams.SearchType = 'none';
            else
                backParams.SearchType = 'filter';
        }
        backParams.SearchText = searchText;
        backParams.CloseBotSheet = true;
        navigation.navigate('MainScreen',backParams);
    }
    const onFocusHandler = () => {
        setPressed(true);
    }
    return (
        <View style = {pressed?styles.headerContainer2:styles.headerContainer1}>
            <Text style = {{marginBottom: 20}}></Text>
            <SearchBar 
                ref={search => this.search = search}
                placeholder = 'Search Here' 
                onChangeText = {(search) => {setSearchText(search)}}
                value = {searchText}
                onSubmitEditing = {() => {setPressed(false);submitHandler(searchText)}}
                autoCorrect = {false}
                onFocus = {onFocusHandler}

                inputStyle = {styles.input}
                inputContainerStyle = {pressed?styles.inputContainer1:styles.inputContainer2}
                containerStyle = {pressed?styles.searchContainer2:styles.searchContainer1}
                searchIcon = {pressed?<Ionicons name = 'chevron-back' size = {30} color = {iconColor} onPress = {() =>
                {Keyboard.dismiss();setSearchText(searchDefaultParams.SearchText);setPressed(false);}}/> : <Ionicons name = 'search-sharp' size = {30} color = {iconColor}/>}
                clearIcon = {<Ionicons name = 'close-outline' size = {28} color = {iconColor} onPress = {() => {this.search.clear();clearHandler()}}/>}
            />
            <MapFilters navigation = {navigation} searchParams = {backParams} visible = {!pressed}/>
            <View style = {{opacity:pressed?1.0:0.0,height:pressed?Dimensions.get('window').height:0,backgroundColor:'white'}}>
                <Text style = {styles.suggestionsText}>Suggestions</Text>
            </View>       
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer1: {
        
    },
    headerContainer2: {
        backgroundColor: 'white', 
    },
    searchContainer1: {
        justifyContent:'flex-start',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 15,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchContainer2: {
        justifyContent:'flex-start',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 15,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    input: {
        color: '#000000',
    },
    inputContainer1 :{
        borderRadius: 24,
        borderColor:'#e2e2e2',
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderBottomWidth: 1.5,
        height: 45,
    },
    inputContainer2: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        height: 45,
    },
    close: {
        position: 'absolute',
        left: 360,
        top: 6,
    },
    suggestionsText: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 20.4,
        marginTop: 15,
    },
})
