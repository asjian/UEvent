import React, {useState,useEffect} from 'react';
import MapSearchBar from '../objects/mapSearchBar';
import {StyleSheet, Dimensions, Text, View, SafeAreaView, Image, Keyboard,TouchableOpacity,ScrollView,Alert} from 'react-native';
import ListButton from '../objects/listButton';
import BackButton from '../objects/backButton';
import PlusButton from '../objects/plusButton';
import CreateListButton from '../objects/sendInviteButton';
import PersonSearchBar from '../objects/PersonSearchBar';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Globals from '../../GlobalVariables';

export default function InviteScreen({navigation}) {

    const event = navigation.getParam('event');
    console.log(event);
    const [users,setUsers] = useState([]);
    const [selectedUsers,setSelectedUsers] = useState([]);

    const selectHandler=(ind)=>{
        users.map((item, index)=>{
            if (ind == index) {
                if(!item.isSelected) {
                    setSelectedUsers((prevSelectedUsers) => {
                        return [{userId: item.id.toString(), eventId: event.id.toString()},...prevSelectedUsers]
                    })
                }   
                else {
                    setSelectedUsers((prevSelectedUsers) => {
                        return prevSelectedUsers.filter((prevUser) => prevUser.userId != item.id)
                    })
                }
                item.isSelected = !item.isSelected;
            }
            return {...item};
        })
    }
    const [Names, setNames] = useState("");

    const personsSelected = () => {
        let names = ""
        let count = 0
        let extras = 0
        for (let i = 0; i < users.length; i++) {
            if (count > 2 && users[i].isSelected) {
                extras++
                count++
            }
            else if (users[i].isSelected) {
                if (count == 0) {
                    names += users[i].displayName
                } else {
                    names += ", " + users[i].displayName
                }
                count++
            }
        }
        if (count > 3) {
            names += ', and ' + extras + ' more'
        }
        setNames(names)
    }
    const renderBottom = () => {
        if(pressed) {
            return (
            <ScrollView style={{marginLeft: 20, height: Dimensions.get('window').height - 100, marginTop: 10, flex: 1, width: '90%', marginRight: 20}}>
                {users.map((item, index)=>{
                    return (
                        <View key={item.id} style={{backgroundColor: 'white',
                        marginBottom: 5,
                        borderRadius: 5, 
                        borderWidth: 1,
                        borderColor: item.isSelected?'#FFCB05' : '#FFF',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 1,}}>
                            <TouchableOpacity onPress={()=>{selectHandler(index), personsSelected()}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style = {styles.button}>
                                        <Text style = {styles.buttonText}> {item.displayName} </Text>
                                        <View style={{flexDirection: 'row', marginBottom: 5, marginLeft: 5}}>
                                            <Text numberOfLines={1}>{item.email}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })
                }
            </ScrollView>
            );
        }
        else {
        return (
            <View>
            <View style={{marginLeft: 20, width: '90%', marginRight: 20}}>
                    <Text style = {styles.headerText}>Saved Lists</Text>
                    <ListButton title = 'GOON SQUAD' 
                    members = "Kartikeya Gupta, Alex Jian, Justin Li, and 4 more"
                    onPress={()=>navigation.navigate('InviteListView')}/>
                    <Text style = {styles.headerText}>Previous Lists</Text>
                    <ListButton title = 'EVENTHUB AUG 14' 
                    members = "Alex Jian, Sundeep Ravella, Jiyang Zhou, and 1 more"/>
                </View>
                <View style={{alignSelf: 'flex-end', marginTop: 20, marginRight: 20}}>
                    <PlusButton onPress={() => navigation.navigate('CreateInviteList')}/>
            </View>
            </View>
        );
        }
    }
    const iconColor = '#adadad';
    const [searchText, setSearchText] = useState('');
    const [finalSearch, setFinalSearch] = useState('');
    const [pressed, setPressed] = useState(false);
    const [focused, setFocused] = useState(false);
    
    const changeTextHandler = (search) => {
        setSearchText(search);
    }
    const clear = () => {
        setSearchText('');
        setFinalSearch('');
        setUsers([]);
        if(!focused) {
            setPressed(false);
        }
    }
    const submit = () => { //ONLY WORKS FOR EXACT EMAIL RN :(
        setFinalSearch(searchText);
        setFocused(false);

        fetch(Globals.usersURL + '/json/search/' + searchText)
        .then((response) => response.json())
        .then((json) => {console.log(json);setUsers(json)})
        .catch((error) => console.error(error));
    }
    const inviteHandler = () => {
        console.log('input array');
        console.log(selectedUsers);

        fetch(Globals.inviteesURL + '/json/addListOfInvitees', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedUsers)

        }).then((response) => {
               if(response != "Fail") {
                 setSelectedUsers([]); 
                 setNames([]);
                 clear();
               }
            })
          .catch((error) => console.error(error));
    }

    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <View style={{
            flex: 1,
            position: 'absolute',
            backgroundColor: '#fff',
            width: '100%'
            }}>
            <View style={{flex: 1, backgroundColor: '#ffcb05'}}>
                <View style={{width: '90%',
                    marginLeft: 20.4,
                    marginTop: 50
                    }}>
                    <BackButton onPress={() => navigation.goBack()} title = 'Invite People'/>
                </View> 
                <View style={{flexDirection: 'row', marginLeft: 20, marginRight: 20, marginBottom: 20}}>
                    <View style={{width: Dimensions.get('screen').width - 180, marginRight: 20}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
                            You have selected:
                        </Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                            {Names}
                        </Text>
                    </View>
                    <CreateListButton onPress = {inviteHandler}/>
                </View>
            </View>
                <SearchBar 
                    //ref={search => this.search = search}
                    placeholder = 'Search names or emails' 
                    value = {searchText}
                    onChangeText = {(search) => changeTextHandler(search)}
                    onSubmitEditing = {submit}
                    autoCorrect = {false}
                    onFocus = {() => {setPressed(true);setFocused(true);}}

                    inputStyle = {styles.input}
                    inputContainerStyle = {pressed?styles.inputContainer1:styles.inputContainer2}
                    containerStyle = {pressed?styles.searchContainer2:styles.searchContainer1}

                    searchIcon = {focused?<Ionicons name = 'chevron-back' size = {30} color = {iconColor} 
                                onPress = {() => {Keyboard.dismiss();setSearchText(finalSearch);setPressed(false);setFocused(false)}}/>:
                    <Image source = {require('../assets/search.png')} style = {{width:26,height:27,tintColor:iconColor,marginLeft: 2,}}/>}

                    clearIcon = {<Ionicons name = 'close-outline' size = {28} color = {iconColor} 
                                onPress = {clear}/>}
                />
                {renderBottom()}
            </View>
        </View> 
    );   
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        marginLeft: 20,
        width: '90%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 7,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#434343',
        marginBottom: 5,
        marginTop: 5,
    },
    button: {
        flex: 1,
    },
    icon: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
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
})
