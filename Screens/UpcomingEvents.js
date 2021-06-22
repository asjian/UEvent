import React, {useContext}  from 'react';
import { SafeAreaView,View, Text, Button, StyleSheet, Image, ParentView} from 'react-native';
import AppContext from '../objects/AppContext';


const EventBox = () => {
    return (
        <View style={styles.box}>
            <Image style={styles.realImageStyle} source={require('../assets/ycombinator-logo.png')}/>
            <Text style={{flex: 3}}>Startups 101 - Everything You Need To Know To Start</Text>
        </View>
    );
}

const EventBox2 = () => {
    return (
        <View style={styles.box}>
            <Image style={styles.realImageStyle} source={require('../assets/Spikeballlogo.png')}/>
            <Text style={{flex:3}}>Spikeball Tournament</Text>
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
        myContext.toggleShowNavBar();
        navigation.navigate('Create a New Event');
    }

    return (
        <SafeAreaView style={styles.container}>
            <EventBox/>
            <EventBox2/>
            <EventBox3/>
            <View style={styles.NewEventButton}>
                <Button 
                    title= "+ Create New Event"
                    onPress={createEventHandler}
                    style={styles.NewEventButton}

                />
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
        
    },
    NewEventButton : {
        margin: 10
    },
    box : {
        width: '95%',
        height: '20%',
        padding: 5,
        borderWidth: 1,
        margin: 10,
        flexDirection: 'row'
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
        flex: 2
        
    }
})
