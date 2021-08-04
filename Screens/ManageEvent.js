import React , {useContext} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppContext from '../objects/AppContext';
import Globals from '../../GlobalVariables';
import { InvitePeopleScreen } from './InvitePeople';
import { ManageAttendeesScreen } from './ManageAttendees';
import { createStackNavigator } from '@react-navigation/stack';


    function ManageEventScreen({navigation, route}) {
    const myContext = useContext(AppContext);
    const { item } = route.params;
    return (
        <SafeAreaView style={{}} >
        <ScrollView contentContainerStyle={{height:'100%'}}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontWeight: '500',fontSize: 24, width: '50%', margin: '3%'}}>{item.Name}</Text>
            <View style={styles.close}>
                <AntDesign name='closecircleo' size={30} onPress={() => {navigation.goBack(); myContext.toggleShowNavBar(true);}} />
            </View>
        </View>
        <View style={{}}>
            <Text style={{fontWeight: '500', fontSize: 20, margin: '3%'}}>Analytics</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '500'}}>864</Text>
                <Text style={{textAlign: 'center', color: '#0085FF'}}>Views</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '500'}}>276</Text>
                <Text style={{textAlign: 'center', color: '#0085FF'}}>Follows</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '500'}}>89</Text>
                <Text style={{textAlign: 'center', color: '#0085FF'}}>Attendees</Text>
            </View>
        </View>
        <View style={{}}>
            <Text style={{fontWeight: '500', fontSize: 20, margin: '3%'}}>Manage Event</Text>
        </View>
        <View style={styles.NewEventButton}>
            <TouchableOpacity >
                <View style={styles.selectContainer}>
                    <Text style={styles.selectText}>Edit Event</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.NewEventButton}>
            <TouchableOpacity >
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
            <TouchableOpacity onPress={() => navigation.navigate('Manage Attendees')}>
                <View style={styles.selectContainer}>
                    <Text style={styles.selectText}>Manage Attendees</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
            <TouchableOpacity >
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
    return (
        <Stack.Navigator>
            <Stack.Screen name="Manage Event" component={ManageEventScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Invite People" component={InvitePeopleScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Manage Attendees" component={ManageAttendeesScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    selectContainer: {
        backgroundColor: '#ffffff',
        marginHorizontal: 50,
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
        borderRadius: 10,
    },
    selectText: {
        fontWeight: '500',
        fontSize: 22,
        paddingVertical: 15,
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
        borderRadius: 10,
    },
    cancelText: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingVertical: 15,
        paddingHorizontal: 60,
        color: '#FFFFFF',
    },
    NewEventButton: {
        
    },
    close: {
        position: 'absolute',
        left: 370,
        top: 10,
    }
})