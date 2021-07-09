import React, {useContext}  from 'react';
import { SafeAreaView,View, Text, Button, StyleSheet, Image, ParentView, TouchableOpacity} from 'react-native';
import AppContext from '../objects/AppContext';


const EventBox = () => {
    return (
        <View style={styles.box}>
            <View style={{flex: 2}}>
                <Image style={styles.realImageStyle} source={require('../assets/YC-Circular.png')}/>
            </View>
            <View style={{flex: 4}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '500', fontSize: 13, color: '#09189F', marginBottom: '5%'}}>Sat, May 25  1:00PM - 2:00PM</Text>
                    <Image style={{resizeMode: 'contain', marginLeft: '10%'}} source={require('../assets/NotificationBell.png')} />
                </View>
                <Text style={{fontWeight: "500", fontSize: 16, marginBottom: '5%'}}>Startups 101 - Everything You Need To Know To Start</Text>
                <Text style={{fontWeight: '500', fontSize: 13, color: '#0085FF'}}> Stephen M. Ross School of Business</Text>
            </View>   
        </View>
    );
}

const EventBox2 = () => {
    return (
        <View style={styles.box}>
            <View style={{flex: 2}}>      
                <Image style={styles.realImageStyle} source={require('../assets/MDST.png')}/>
            </View>
           <View style={{flex: 4}}>
               <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '500', fontSize: 13, color: '#09189F', marginBottom: '5%'}}>Sat, May 22  11:00AM - 2:00PM</Text>
                    <Image style={{resizeMode: 'contain', marginLeft: '10%'}} source={require('../assets/NotificationBell.png')} />
               </View>
                
                <Text style={{fontWeight: "500", fontSize: 16, marginBottom: '5%'}}>MDST Work Session</Text>
                <Text style={{fontWeight: '500', fontSize: 13, color: '#0085FF'}}>Online Event (Google Meets)</Text>
           </View>
            
        </View>
    );
}

const EventBox3 = () => {
    return (
        <View style={styles.box}>
            <Image style={styles.realImageStyle} source={require('../assets/Spikeballlogo.png')}/>
            <Text style={{flex:3}}>Spikeball Tournament</Text>
        </View>
    );
}



function UpcomingEventsScreen({ navigation }) {
    const myContext =useContext(AppContext);
    // event handler function
    const createEventHandler = () => {
        myContext.toggleShowNavBar(false);
        navigation.navigate('Create a New Event');
    }

    return (
        <SafeAreaView style={styles.container}>
            <EventBox/>
            <EventBox2/>
            <View style={styles.NewEventButton}>
                <TouchableOpacity onPress={createEventHandler}>
                    <View style = {styles.selectContainer}>
                        <Text style = {styles.selectText}>+ Create New Event</Text>
                    </View>
                </TouchableOpacity>
            </View>
          
            

        </SafeAreaView>
    );
}

UpcomingEventsScreen.navigationOptions = {
    headerTitle: 'Trucks Screen',
    headerLeft: () => {
      return null;
    },
};

export default UpcomingEventsScreen;

const styles = StyleSheet.create({
    container : {
        width: '100%',
        height: '90%',
        padding: 5,
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#FFFBF3'
        
    },
    NewEventButton : {
        margin: 10
    },
    box : {
        width: '95%',
        height: '17%',
        padding: 5,
        margin: 10,
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        backgroundColor: '#F8F8F8'
        
    },
    inner1: {
        flex: 2,
        
     },
     inner2: {
        flex: 3
     },

    realImageStyle : {
        height: '100%',
        resizeMode: 'contain',
        width: '100%'
        
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
        fontSize: 22,
        paddingVertical: 15,
        color: '#fab400',
    }
})
