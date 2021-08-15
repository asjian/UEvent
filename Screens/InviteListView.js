import React, {useState,Component} from 'react';
import MapSearchBar from '../objects/mapSearchBar';
import {StyleSheet, Dimensions, Modal, Text, View, Image, TouchableOpacity,ScrollView,Alert} from 'react-native';
import PersonButton from '../objects/PersonButton';
import BackButton from '../objects/backButton';
import CreateListButton from '../objects/createListButton';
import { SearchBar } from 'react-native-elements';
import PersonSearchBar from '../objects/PersonSearchBar';
import Users from '../dummies/users';
import SendButton from '../objects/sendButton';
import AddPeople from '../objects/addPeople';

export default function InviteListView({navigation}) {

    const [users, setUsers] = useState(Users);
    const [isModalVisable, setIsModalVisable] = useState(false);

    const changeModalVisable=(bool)=>{
        setIsModalVisable(bool)
    }
    console.log(users)
    const removeUser = (id) => {
        const newList = users.filter((item) => item.id !== id);
 
        setUsers(newList);
    }

    return (
        <View style={{
            flex: 1,
            position: 'absolute',
            backgroundColor: '#fff',
            width: '100%'
            }}>
            <View style={{flex: 1}}>
                <View style={{width: '90%',
                    marginLeft: 20.4,
                    marginTop: 50,
                    }}>
                    <BackButton onPress={() => navigation.goBack()} title = 'GOON SQUAD'/>
                </View> 
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 20}}>
                    <AddPeople onPress={()=>navigation.navigate('AddMoreScreen')}/>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', marginRight: 20}}>
                    <SendButton/>
                </View>
            </View>
            <View style={{flex: 1}}>
            <ScrollView style={{marginLeft: 20, height: Dimensions.get('window').height - 100, marginTop: 10, flex: 1, width: '90%', marginRight: 20}}>
                    {users.map((item, index)=>{
                        return (
                            <View key={item.key} style={{backgroundColor: 'white',
                            marginBottom: 5,
                            borderRadius: 5, 
                            borderWidth: 1,
                            borderColor: item.isSelected?'#FFCB05' : '#FFF',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 1,}}>
                                <View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style = {styles.button}>
                                            <Text style = {styles.buttonText}> {item.name} </Text>
                                            <View style={{flexDirection: 'row', marginBottom: 5, marginLeft: 5}}>
                                                <Text numberOfLines={1}>{item.email}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={{justifyContent: 'center', marginRight: 10}}
                                        onPress={()=>removeUser(item.id)}>
                                            <Image style={{width: 25, height: 25}} source={require('../assets/minus.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                    }
                </ScrollView>
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
        marginTop: 15,
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
})
