import React , {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Modal, TextInput, Pressable, Alert, Dimensions} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AppContext from '../objects/AppContext';
import Globals from '../../GlobalVariables';
import { InvitePeopleScreen } from './InvitePeople';
import { ManageAttendeesScreen } from './ManageAttendees';
import { createStackNavigator } from '@react-navigation/stack';
import EditEventScreen from './EditEvent';
import { useNavigation } from '@react-navigation/native';


    function ManageEventScreen({navigation, route}) {
        const myContext = useContext(AppContext);
        const { item } = route.params;
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
            .then(() => {console.log('delete successful');navigation.goBack();myContext.toggleShowNavBar(true)})
            .catch((error) => console.error(error));
        }


    return (
            <SafeAreaView style={{backgroundColor: '#FFF9F9', height: '100%', width: '100%'}} >
            <ScrollView contentContainerStyle={{height:'100%'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text style={{fontWeight: '500',fontSize: Globals.HR(30), width: '50%', margin: '3%'}}>{item.name}</Text>
                <View style={styles.close}>
                    <AntDesign name='closecircleo' size={Globals.HR(30)} onPress={() => {navigation.goBack(); myContext.toggleShowNavBar(true);}} />
                </View>
            </View>
            <View style={{}}>
                <Text style={{fontWeight: '500', fontSize: Globals.HR(24), margin: '3%'}}>Analytics</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center', fontSize: Globals.HR(24), fontWeight: '500'}}>864</Text>
                    <Text style={{textAlign: 'center', color: '#0085FF', fontSize: Globals.HR(14)}}>Views</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center', fontSize: Globals.HR(24), fontWeight: '500'}}>276</Text>
                    <Text style={{textAlign: 'center', color: '#0085FF', fontSize: Globals.HR(14)}}>Follows</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center', fontSize: Globals.HR(24), fontWeight: '500'}}>89</Text>
                    <Text style={{textAlign: 'center', color: '#0085FF', fontSize: Globals.HR(14)}}>Attendees</Text>
                </View>
            </View>
            <View style={{}}>
                <Text style={{fontWeight: '500', fontSize: Globals.HR(24), margin: '3%'}}>Manage Event</Text>
            </View>
            <View style={styles.NewEventButton}>
                <TouchableOpacity onPress={() => {console.log(item);navigation.navigate('Edit Event', { screen: 'Form', params: {item: item} })}}>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>Edit Event</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
            <View style={styles.NewEventButton}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>Make Announcement</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.NewEventButton}>
                <TouchableOpacity onPress={() => navigation.navigate('Invite People')}>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>Invite People</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.NewEventButton}>
                <TouchableOpacity onPress={() => navigation.navigate('Manage Attendees', { apiData: item})}>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>Manage Attendees</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={cancelEvent}>
                    <View style={styles.cancelContainer}>
                        <Text style={styles.cancelText}>Cancel Event</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Stack = createStackNavigator()

export default function ManageEventStack({ navigation }) {
    const nav = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Manage Event" component={ManageEventScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Edit Event" component={EditEventScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Invite People" component={InvitePeopleScreen} options={{ headerShown: true }} />
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
