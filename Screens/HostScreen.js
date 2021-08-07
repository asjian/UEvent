import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions,TouchableOpacity,Text } from 'react-native';
import HostNavBar from '../routes/HostNavBar';
import CreateNewEventScreen from './CreateNewEvent';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ManageEventScreen from './ManageEvent';
import ManageEventStack from './ManageEvent';
import AppContext from '../objects/AppContext';

const Stack = createStackNavigator()

const windowHeight = Dimensions.get('window').height;

function HostScreen(props) {
    const myContext = useContext(AppContext)
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Events I'm Hosting"
                component={HostNavBar}
                options = {({navigation}) => ({
                    headerStyle: {
                        height: 90,
                        backgroundColor: '#FFFBF3',
                        shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 24,
                        marginLeft: -5,
                    },
                    headerLeft: null,
                    /*
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress = {() => {myContext.toggleShowNavBar(false);navigation.navigate('Create a New Event')}}>
                                <Text style = {{fontWeight:'bold',fontSize:16,color:'#0085ff',marginRight:20,marginTop:2,}}>+Create</Text>
                            </TouchableOpacity>
                        )
                    },  
                    */
                    
                })          
                }
            />
            <Stack.Screen name="Create a New Event" component={CreateNewEventScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Manage Event' component={ManageEventStack} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

export default HostScreen;
