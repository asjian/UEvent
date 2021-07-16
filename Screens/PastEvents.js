import React, { useContext } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AppContext from '../objects/AppContext';


function PastEventsScreen({ navigation }) {
    const myContext = useContext(AppContext);
    // event handler function
    const createEventHandler = () => {
        myContext.toggleShowNavBar(false);
        navigation.navigate('Create a New Event');
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#FFFBF3', width: '100%', height: '100%' }}>
            <View style={{ height: '60%' }}>


                <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


                    {/*<Text style={{ fontSize: 25, fontWeight: '500', color: '#000000' }}>You have not organized any events in the past</Text>*/}




                </ScrollView>
            </View>
            <View >
                <TouchableOpacity onPress={createEventHandler}>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>+ Create New Event</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default PastEventsScreen;

const styles = StyleSheet.create({
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
        fontSize: 22,
        paddingVertical: 15,
        color: '#fab400',
    }
})
