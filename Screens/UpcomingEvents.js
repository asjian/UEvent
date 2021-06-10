import React from 'react';
import { SafeAreaView,View, Text, Button, StyleSheet, Image} from 'react-native';

function UpcomingEventsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <View style={styles.inner1}>
                    <Image style={styles.realImageStyle} source={require('../assets/ycombinator-logo.png')}/>
                </View>
                <View style={styles.inner2}>
                    <Text>Hello</Text>
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.inner1}>
                    <Image style={styles.realImageStyle} source={require('../assets/Spikeballlogo.png')}/>
                </View>
                <View style={styles.inner2}>
                    <Text>Hello</Text>
                </View>
            </View>
            <View style={styles.NewEventButton}>
                <Button 
                    title= "+ Create New Event"
                    onPress={() => navigation.navigate('Create a New Event')}
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
        
    }
})
