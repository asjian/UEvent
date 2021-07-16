import React,{useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FindScreen from '../screens/FindScreen';
import HostScreen from '../screens/HostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AppContext from '../objects/AppContext';

const Tab = createBottomTabNavigator();

const NavBar = () => {
    const myContext = useContext(AppContext);
    return(
        <Tab.Navigator
         tabBarOptions={{
             showLabel: false,
             style: {
                 position: 'absolute',
                 elevation: 0,
                 backgroundColor: '#fff',
                 borderRadius: 0,
                 height: 95,
                 ...styles.shadow
             }
         }}
        >
            <Tab.Screen name="Find" component={FindScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image 
                                source={require('../assets/search_location_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#FFCB05' : '#00274C',
                                }}
                            />
                            <Text 
                                style={{color: focused ? '#FFCB05' : '#00274C', fontSize: 12}}>
                                FIND
                            </Text>
                        </View>
                    ),
                    tabBarVisible: myContext.navBarVisible
                }}
            />
            <Tab.Screen name="Host" component={HostScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image 
                                source={require('../assets/home_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#FFCB05' : '#00274C',
                                }}
                            />
                            <Text 
                                style={{color: focused ? '#FFCB05' : '#00274C', fontSize: 12}}>
                                HOST
                            </Text>
                        </View>
                    ),
                    tabBarVisible: myContext.navBarVisible
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image 
                                source={require('../assets/user_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#FFCB05' : '#00274C',
                                }}
                            />
                            <Text 
                                style={{color: focused ? '#FFCB05' : '#00274C', fontSize: 12}}>
                                PROFILE
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#00274C',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default NavBar;
