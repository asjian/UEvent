import React, {useContext} from 'react';
import { SafeAreaView,View, Text, Button} from 'react-native';
import AppContext from '../objects/AppContext';


function PastEventsScreen({ navigation }) {
    const myContext =useContext(AppContext);
    // event handler function
    const createEventHandler = () => {
        myContext.toggleShowNavBar(false);
        navigation.navigate('Create a New Event');
    }
    return (
        <SafeAreaView>
            <Button 
                title= "+ Create New Event"
                onPress={createEventHandler}
            />

        </SafeAreaView>
    );
}

export default PastEventsScreen;
