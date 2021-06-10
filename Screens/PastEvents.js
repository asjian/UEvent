import React from 'react';
import { SafeAreaView,View, Text, Button} from 'react-native';


function PastEventsScreen({ navigation }) {
    return (
        <SafeAreaView>
            <Button 
                title= "+ Create New Event"
                onPress={() => navigation.navigate('Create a New Event')}
            />

        </SafeAreaView>
    );
}

export default PastEventsScreen;
