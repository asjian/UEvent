import React , {useContext, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Modal, TextInput, Pressable, Alert, Dimensions} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AppContext from '../objects/AppContext';
import Globals from '../../GlobalVariables';
import { ManageAttendeesScreen } from './ManageAttendees';
import { createStackNavigator } from '@react-navigation/stack';
import EditEventScreen from './EditEvent';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../objects/backButton';
import ProfileButton from '../objects/profileButton';
import AddMoreScreen from './AddMoreScreen';
import CreateInviteList from './CreateInviteList';
import InviteListView from './InviteListView';
import InvitePeopleScreen from './InvitePeopleScreen';
import InviteScreen from './InviteScreen';

    function ManageEventScreen({navigation, route}) {
        const myContext = useContext(AppContext);
        const { item } = route.params;
        const event = item;
        const [modalVisible, setModalVisible] = useState(false);
        const [announcement, setAnnoucement] = useState('');
    
        

        const SendUpdate = () => {
            
            if (announcement === '') {
                Alert.alert('Error','Cannot send empty update');
                // width - 428
                // height - 926
            }
            else {
                // post to api
                fetch(Globals.updatesURL + '/json/add', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        updates: announcement,
                        eventId: item.id
                        }
                        )
                })
			    .then(() => { 
                    setModalVisible(false); 
                    setAnnoucement(''); 
                    console.log(announcement); 
                    console.log('posted'); 
                    
                })
                .catch((error) => console.error(error));
                // text is in announcement variable
                // clear announcement
                
                // exit
               
                
            }
            
        }
        const windowWidth1 = Dimensions.get('window').width;

        const cancelEvent = () => {
            console.log(Globals.eventsURL + '/delete/' + item.id);
            fetch(Globals.eventsURL + '/delete/' + item.id, {method: 'delete',})
            .then(() => console.log('delete successful'))
            .catch((error) => console.error(error));
        
            navigation.goBack();

        }


    return (
            <View style={{backgroundColor: '#fff'}} >
            <View style={{backgroundColor: '#FFF', marginBottom: 20,}}>
                <View style={{alignItems: 'center', marginLeft: 20, marginTop: 50, flexDirection: 'row'}}>
                    <BackButton onPress={() => {navigation.goBack(); myContext.toggleShowNavBar(true);}} title = {item.name}/>
                </View>
                <View style={{marginLeft: 35}}>
                    <Text style={{fontSize: 22,
                    color: '#434343',
                    fontWeight: 'bold',
                    marginTop: 28,
                    marginBottom: 7,}}>Analytics -</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginTop: 20}}>
                    <View style={{flex: 1}}>
                        <Image source={require('../assets/star.png')} style={{alignSelf: 'center', height: 20, width: 20, tintColor: '#434343'}}/>
                        <Text style={{textAlign: 'center', fontSize: Globals.HR(18), color: '#434343', fontWeight: 'bold'}}>864</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Image source={require('../assets/invitation.png')} style={{alignSelf: 'center', height: 20, width: 20, tintColor: '#434343'}}/>
                        <Text style={{textAlign: 'center', fontSize: Globals.HR(18), color: '#434343', fontWeight: 'bold'}}>276</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Image source={require('../assets/attendees.png')} style={{alignSelf: 'center', height: 20, width: 20, tintColor: '#434343'}}/>

                        <Text style={{textAlign: 'center', fontSize: Globals.HR(18), color: '#434343', fontWeight: 'bold'}}>89</Text>
                    </View>
                </View>
            </View>
            <View style={{marginLeft: 35, marginBottom: 20}}>
                    <Text style={{fontSize: 22,
                    color: '#434343',
                    fontWeight: 'bold',
                    marginTop: 28,
                    marginBottom: 7,}}>Manage Event -</Text>
                </View>
            <ScrollView style={{marginLeft: 20, marginRight: 20, height: '100%'}}>
            <View style={{flex: 1,
            }}>
                
            
                <TouchableOpacity style={{backgroundColor: '#FFF',
                borderRadius: 8,
                borderColor: '#0085ff',
                borderWidth: 1,
                height: 55,
                justifyContent: 'center',
                marginHorizontal: 15,
                marginBottom: 20,
                }}
                onPress={() => {console.log(item);navigation.navigate('Edit Event', { screen: 'Form', params: {item: item} })}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                        source={require('../assets/attendees.png')}
                        style={{height:18, width: 18, marginLeft: 20, marginRight: 10, tintColor: '#0085ff'}}
                        ></Image>
                        <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#0085ff',
                        }}>Edit Event</Text>
                    </View>
                </TouchableOpacity>
                <Modal 
                    visible={modalVisible}
                    transparent={true}
                    animationType='fade'
                >
                    <SafeAreaView style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalClose}>
                                <AntDesign name='closecircleo' size={30} onPress={() => {setModalVisible(false); setAnnoucement('');}} />
                            </View>
                            <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '500'}}>Send an Event Update</Text>
                            <Text style={{textAlign: 'auto', fontSize: 16, fontWeight: '500', marginTop: 10}}>Enter the update here:</Text>
                            <View style={styles.textAreaContainer}>
                                <TextInput 
                                    multiline={true}
                                    style={{margin: 10}}
                                    placeholder='All followers will be notified'
                                    onChangeText={(text) => setAnnoucement(text)}
                                />
                            </View>
                            <TouchableOpacity onPress={SendUpdate}>
                                <View style={styles.UpdateContainer}>
                                    <Text style={styles.UpdateText}>Send Update</Text>
                                </View>
                            </TouchableOpacity>
                                
                        </View>
                    </SafeAreaView>
                </Modal>
                
                <TouchableOpacity style={{backgroundColor: '#FFF',
                borderRadius: 8,
                borderColor: '#434343',
                borderWidth: 1,
                height: 55,
                justifyContent: 'center',
                marginHorizontal: 15,
                marginBottom: 20,
                }}
                onPress={() => navigation.navigate('InviteScreen', {event: item})}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                        source={require('../assets/attendees.png')}
                        style={{height:18, width: 18, marginLeft: 20, marginRight: 10, tintColor: '#434343'}}
                        ></Image>
                        <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#434343',
                        }}>Invite People</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={{backgroundColor: '#FFF',
                borderRadius: 8,
                borderColor: '#434343',
                borderWidth: 1,
                height: 55,
                justifyContent: 'center',
                marginHorizontal: 15,
                marginBottom: 20,
                }}
                onPress={() => navigation.navigate('Manage Attendees', { apiData: item})}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                        source={require('../assets/attendees.png')}
                        style={{height:18, width: 18, marginLeft: 20, marginRight: 10, tintColor: '#434343'}}
                        ></Image>
                        <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#434343',
                        }}>Manage Attendees</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#FFF',
                borderRadius: 8,
                borderColor: '#434343',
                borderWidth: 1,
                height: 55,
                justifyContent: 'center',
                marginHorizontal: 15,
                marginBottom: 20,
                }}
                onPress={() => setModalVisible(true)} title = 'Make Announcement'>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                        source={require('../assets/attendees.png')}
                        style={{height:18, width: 18, marginLeft: 20, marginRight: 10, tintColor: '#434343'}}
                        ></Image>
                        <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#434343',
                        }}>Make Announcement</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#FFF',
                borderRadius: 8,
                borderColor: 'red',
                borderWidth: 1,
                height: 55,
                justifyContent: 'center',
                marginHorizontal: 15,
                marginBottom: 20,
                }}
                onPress={cancelEvent}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                        source={require('../assets/attendees.png')}
                        style={{height:18, width: 18, marginLeft: 20, marginRight: 10, tintColor: 'red'}}
                        ></Image>
                        <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: 'red',
                        }}>Cancel Event</Text>
                    </View>
                </TouchableOpacity>

            </View>
            </ScrollView>
        </View>
    );
}

const Stack = createStackNavigator()

export default function ManageEventStack({ navigation }) {
    const nav = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Manage Event" component={ManageEventScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Edit Event" component={EditEventScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InviteScreen" component={InviteScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InvitePeopleScreen" component={InvitePeopleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateInviteList" component={CreateInviteList} options={{ headerShown: false}}/>
            <Stack.Screen name="InviteListView" component={InviteListView} options={{ headerShown: false}}/>
            <Stack.Screen name="AddMoreScreen" component={AddMoreScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Manage Attendees" component={ManageAttendeesScreen} 
                options= {({route, navigation}) => ({ 
                    headerTitle: 'Attendees',
                    headerTitleStyle: {fontSize:Globals.HR(24), fontWeight:'700'},
                    headerStyle: {
                        backgroundColor: '#FFF9F9'
                    },
                    headerBackTitleStyle: styles.headerButtonStyle,
                    headerBackImage: null,
                    headerLeft: () => (
                        <TouchableOpacity style={{marginLeft: Globals.WR(15)}} onPress={() => navigation.goBack()} >
                            <Text style={styles.headerButtonStyle}>Back</Text>
                        </TouchableOpacity> ),
                    headerRight: () => ( 
                    <TouchableOpacity style={{marginRight: Globals.WR(15)}} onPress={() => navigation.goBack()} > 
                        <Text style={styles.headerButtonStyle}>Done</Text> 
                    </TouchableOpacity> ) ,
                
                })}
                     />
        </Stack.Navigator>
    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const styles = StyleSheet.create({
    selectContainer: {
        backgroundColor: '#ffffff',
        marginHorizontal: Globals.WR(50),
        margin: '3%',
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
        borderRadius: Globals.HR(10),
    },
    selectText: {
        fontWeight: '500',
        fontSize: Globals.HR(22),
        paddingVertical: Globals.HR(15),
        color: '#0085FF',
    },
    cancelContainer: {
        backgroundColor: '#FF4646',
        margin: '8%',
        width: '100%',
        alignItems: 'center',

        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: Globals.HR(10),
    },
    cancelText: {
        fontWeight: 'bold',
        fontSize: Globals.HR(22),
        paddingVertical: Globals.HR(15),
        paddingHorizontal: Globals.WR(60),
        color: '#FFFFFF',
    },
    NewEventButton: {
        
    },
    close: {
        position: 'absolute',
        left: windowWidth - 40,
        top: 10,
    },
    modalView: {
        margin: windowHeight / 92.6,
        backgroundColor: "#FFF9F9",
        borderRadius: windowHeight / 46.3,
        padding: windowHeight / 26.46,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '75%',
        width: '85%'
      },
    modalClose: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    centeredView: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textAreaContainer: { 
        height: '60%', 
        width: '85%',
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#EEEEEE'
    },
    UpdateContainer: {
        backgroundColor: '#00AE46',
        margin: '8%',
        width: '100%',
        alignItems: 'center',

        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: windowHeight / (windowHeight / 10),
    },
    UpdateText: {
        fontWeight: 'bold',
        fontSize: windowHeight / 42.06,
        paddingVertical: windowHeight / 61.73,
        paddingHorizontal: windowWidth / 7.13,
        color: '#FFFFFF',
    },
    checkboxBase: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        borderColor: '#000000',
        borderWidth: 0.5,
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#0085FF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    
    checkboxLabel: {
        marginLeft: 13,
        fontWeight: '500',
        fontSize: 18,
    },
    headerButtonStyle : {
        fontSize: Globals.HR(18),
        color: '#0085FF',
        fontWeight: '700',
        margin: Globals.HR(5)
    }
})
