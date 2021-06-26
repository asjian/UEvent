import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState,useContext} from 'react';
import {StyleSheet, Text, View,SafeAreaView,Keyboard,TouchableWithoutFeedback,TouchableOpacity,Modal,Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import CategoryList from './CategoryList';
import {AntDesign} from '@expo/vector-icons';
import AppContext from '../objects/AppContext';

export default function Search({navigation}) {
    /*navigation.addListener('didFocus', () => {
        console.log('focused 2');
        setCategoryLabel('Selection');
    });*/
    const myContext = useContext(AppContext);

    const searchDefaultParams = {
        Categories: navigation.getParam('Categories'),
        TimeRange: navigation.getParam('TimeRange'),
        OtherFilters: navigation.getParam('OtherFilters'),
    }
    const buttonTextDecider = (typeName) => {
        if(typeName == 'Categories') {
            if(navigation.getParam('Categories').length == 0)
                return <Text style = {styles.buttonText}>Event Categories</Text>;     
        }
        return <Text style = {styles.buttonText}>Whoops</Text>;   
    }
    const filterHandler = (screenName) => {
        navigation.navigate(screenName,searchDefaultParams);
    }
    const searchSubmitHandler = (searchText) => {
        console.log(searchText);
    }
    const clearSearch = () => {
        myContext.toggleShowNavBar(true);
        navigation.getParam('Categories').length = 0;
        navigation.getParam('TimeRange')['startDate'] = '';navigation.getParam('TimeRange')['endDate'] = '';navigation.getParam('TimeRange')['duration'] = '';
        navigation.getParam('OtherFilters').length = 0;
    }
    const iconColor = '#adadad';
    const [searchText, setSearchText] = useState('');
    const [suggestionsVisible,setSuggestionsVisible] = useState(false);

    const renderBottom =  () => {
        if(suggestionsVisible) {
            return(
                <View>
                    <TouchableOpacity onPress = {() => Keyboard.dismiss()}>
                    <Text style = {[styles.headerText,{marginTop: 40, marginBottom: 22}]}>Suggestions</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View>
                    <Text style = {[styles.headerText,{marginTop: 62, marginBottom: 22}]}>Filters</Text>

                    <TouchableOpacity onPress = {() => filterHandler('CategoryList')} style = {styles.buttonStyle}>
                        <Image source = {require('../assets/categories.png')} style = {styles.leftIcon}/>
                        {buttonTextDecider('Categories')}
                        <AntDesign name = 'right' size = {30} color = '#828181' style = {styles.rightIcon}/>
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress = {() => filterHandler('TimeRange')} style = {styles.buttonStyle}>
                        <Image source = {require('../assets/clock.png')} style = {styles.leftIcon}/>
                        <Text style = {[styles.buttonText, {marginLeft: 18}]}>Time Range</Text>
                        <AntDesign name = 'right' size = {30} color = '#828181' style = {styles.rightIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() => filterHandler('CategoryList')} style = {styles.buttonStyle}>
                        <Image source = {require('../assets/filter.png')} style = {styles.leftIcon}/>
                        <Text style = {[styles.buttonText,{marginLeft: 17}]}>Other Filters</Text>
                        <AntDesign name = 'right' size = {30} color = '#828181' style = {styles.rightIcon}/>
                    </TouchableOpacity>

                </View>
            );
        }
    }

    return (
        <View style = {styles.outerContainer}>
        <View style = {styles.innerContainer}>
                <Text style = {styles.headerText}>Search</Text>
                <View style = {styles.close}>
                    <Ionicons name = 'close-circle-outline' size = {38} onPress = {() => {clearSearch();navigation.goBack();}}/>
                </View>

                <SearchBar 
                ref={search => this.search = search}
                placeholder = 'Event Names, Organizers, or Tags' 
                onChangeText = {(search) => {setSearchText(search)}}
                value = {searchText}
                onFocus = {() => setSuggestionsVisible(true)}
                onSubmitEditing = {() => {searchSubmitHandler(searchText)}}
                autoCorrect = {false}

                inputStyle = {styles.input}
                inputContainerStyle = {styles.inputContainer}
                containerStyle = {styles.searchContainer}
                searchIcon = {suggestionsVisible?<Ionicons name = 'chevron-back' size = {30} color = {iconColor} onPress = {() =>
                {Keyboard.dismiss();this.search.clear();setSuggestionsVisible(false);}}/> : <Ionicons name = 'search-sharp' size = {30} color = {iconColor}/>}
                clearIcon = {<Ionicons name = 'close-outline' size = {28} color = {iconColor} onPress = {() => this.search.clear()}/>}
                />
                {renderBottom()}
        </View>
        </View>
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
        justifyContent:'flex-start',
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
        borderColor:'#e2e2e2',
        backgroundColor: '#ffffff',
        borderWidth: 1.75,
        borderBottomWidth: 1.75,
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
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
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
        marginLeft: 20,
        paddingVertical: 14,
        color: '#ff8a00',
    },
    leftIcon: {
        marginLeft: 15,
        height: 28,
        width: 28,
        tintColor: '#ff8a00',
    },
    rightIcon: {
        position: 'absolute',
        right: 10,
    },
})
const modalStyles = StyleSheet.create({
    container: {
        height: '75%',
        marginTop: 'auto',
        backgroundColor: '#fffbf2'
    },
    modal: {
        margin:20,
    }
})
