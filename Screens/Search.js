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
        SearchType: navigation.getParam('SearchType'),
        SearchText: navigation.getParam('SearchText'),
        Categories: JSON.parse(JSON.stringify(navigation.getParam('Categories'))),
        TimeRange: JSON.parse(JSON.stringify(navigation.getParam('TimeRange'))),
        OtherFilters: JSON.parse(JSON.stringify(navigation.getParam('OtherFilters'))),
        BotSheetInfo: navigation.getParam('BotSheetInfo'),
        CloseBotSheet: navigation.getParam('CloseBotSheet'),
    }

    const buttonTextDecider = (typeName) => {
        if(typeName == 'Categories') {
            let catList = navigation.getParam('Categories');

            if(catList.length == 0)
                return <Text style = {styles.buttonText}>Event Categories</Text>;  

            else if(catList.length >= 3 && catList[0].name.length + catList[1].name.length + catList[2].name.length >= 27) {
                return (
                    <View>
                        <View style = {styles.innerButton}>
                            <View style = {{backgroundColor: '#f5f5f5', borderRadius: 10, marginHorizontal: 5, paddingVertical: 5, flexDirection: 'row'}}>
                                    <Image source = {catList[0].icon} style = {{width: 20, height: 20, tintColor: '#847cb5', marginRight: 5, marginLeft: 3,}}/>
                                    <Text style = {{fontWeight: '600', fontSize: 17, color: '#847cb5',marginRight: 3,}}>{catList[0].name}</Text>
                            </View>
                            <View style = {{backgroundColor: '#f5f5f5', borderRadius: 10, marginHorizontal: 5, paddingVertical: 5, flexDirection: 'row'}}>
                                    <Image source = {catList[1].icon} style = {{width: 20, height: 20, tintColor: '#847cb5', marginRight: 5, marginLeft: 3,}}/>
                                    <Text style = {{fontWeight: '600', fontSize: 17, color: '#847cb5',marginRight: 3,}}>{catList[1].name}</Text>
                            </View>
                        </View>  
                        <View style = {{marginLeft: 10, flexDirection: 'row', paddingBottom: 14,}}>
                            <View style = {{backgroundColor: '#f5f5f5', borderRadius: 10, marginHorizontal: 5, paddingVertical: 5, flexDirection: 'row'}}>
                                    <Image source = {catList[2].icon} style = {{width: 20, height: 20, tintColor: '#847cb5', marginRight: 5, marginLeft: 3,}}/>
                                    <Text style = {{fontWeight: '600', fontSize: 17, color: '#847cb5',marginRight: 3,}}>{catList[2].name}</Text>
                            </View>
                        </View>  
                    </View>
                )
            }
            else {
                return (
                <View style = {styles.innerButton}>
                    {catList.map((item) => {
                        return (
                            <View key = {item.id} style = {{backgroundColor: '#f5f5f5', borderRadius: 10, marginHorizontal: 5, paddingVertical: 5, flexDirection: 'row'}}>
                                <Image source = {item.icon} style = {{width: 20, height: 20, tintColor: '#847cb5', marginRight: 5, marginLeft: 3,}}/>
                                <Text style = {{fontWeight: '600', fontSize: 17, color: '#847cb5',marginRight: 3,}}>{item.name}</Text>
                            </View>
                        )
                    })}
                </View>
                );
            }  
        } //end of: if typeName == categories
        return <Text style = {styles.buttonText}>Whoops</Text>;   
    }
    const filterHandler = (screenName) => {
        navigation.navigate(screenName,searchDefaultParams);
    }
    const searchTextSubmitHandler = (searchText) => {
        searchDefaultParams.SearchType = 'text';
        searchDefaultParams.SearchText = searchText;
        searchDefaultParams.CloseBotSheet = true;
        navigation.navigate('MainScreen',searchDefaultParams);
    }
    const searchFilterSubmitHandler = () => {
        searchDefaultParams.SearchText = ''; //any search involving both text and filters will be submitted through the text submit, so this is safe
        searchDefaultParams.CloseBotSheet = true;
        if(searchDefaultParams.Categories.length==0) //TEMPORARY SOLUTION FOR TESTING: REVISE LATER, SHOULD CHECK IF ENTIRE SEARCH IS EMPTY
            searchDefaultParams.SearchType = 'none';
        else 
            searchDefaultParams.SearchType = 'filter';
        navigation.navigate('MainScreen',searchDefaultParams);
    }
    const closeHandler = () => { //delete all changes but don't necessarily clear the search
        console.log(searchDefaultParams.BotSheetInfo);
        /*
        if(searchDefaultParams.BotSheetInfo.snapPos == 0 && searchDefaultParams.Categories.length == 0 && searchDefaultParams.SearchText.length == 0) { //also check if search is empty otherwise navbar bugs
            myContext.toggleShowNavBar(true);
        }
        */
        navigation.navigate('MainScreen',{CloseBotSheet:false});
    }
    const iconColor = '#adadad';
    const [searchText, setSearchText] = useState(searchDefaultParams.SearchText);
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

                    <TouchableOpacity onPress = {() => filterHandler('OtherFilters')} style = {styles.buttonStyle}>
                        <Image source = {require('../assets/filter.png')} style = {styles.leftIcon}/>
                        <Text style = {[styles.buttonText,{marginLeft: 17}]}>Other Filters</Text>
                        <AntDesign name = 'right' size = {30} color = '#828181' style = {styles.rightIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {searchFilterSubmitHandler}>
                        <View style = {styles.searchButton}>
                            <Text style = {styles.searchButtonText}>SEARCH</Text>
                        </View>
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
                    <Ionicons name = 'close-circle-outline' size = {38} onPress = {closeHandler}/>
                </View>

                <SearchBar 
                ref={search => this.search = search}
                placeholder = 'Event Names, Organizers, or Tags' 
                onChangeText = {(search) => {setSearchText(search)}}
                value = {searchText}
                onFocus = {() => setSuggestionsVisible(true)}
                onSubmitEditing = {() => {searchTextSubmitHandler(searchText)}}
                autoCorrect = {false}
                autoFocus = {searchText.length != 0}

                inputStyle = {styles.input}
                inputContainerStyle = {styles.inputContainer}
                containerStyle = {styles.searchContainer}
                searchIcon = {suggestionsVisible?<Ionicons name = 'chevron-back' size = {30} color = {iconColor} onPress = {() =>
                {Keyboard.dismiss();this.search.clear();setSuggestionsVisible(false);}}/> : <Ionicons name = 'search-sharp' size = {30} color = {iconColor}/>}
                clearIcon = {<Ionicons name = 'close-outline' size = {28} color = {iconColor} onPress = {() => {this.search.clear()}}/>}
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
        width: '90%',
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
        marginLeft: 10,
        height: 28,
        width: 28,
        tintColor: '#ff8a00',
    },
    rightIcon: {
        position: 'absolute',
        right: 6,
    },
    innerButton: {
        flexDirection: 'row',
        paddingVertical: 14,
        marginLeft: 5,
    },
    searchButton: {
        backgroundColor: '#009af0',
        opacity: 0.5,
        position: 'absolute',
        marginHorizontal: 50,     
        marginTop: 200, //change this later
        width: '75%',
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
    searchButtonText: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingVertical: 10,
        color: 'white',
    },
})
