import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useContext } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Formik } from 'formik';
import CheckBox from '@react-native-community/checkbox';
import {AntDesign} from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppContext from '../objects/AppContext';
import SearchableDropdown from 'react-native-searchable-dropdown';
import EventTypeSelector from '../objects/FormObjects.js/EventTypeSelector';
import PrivacySelector from '../objects/FormObjects.js/PrivacySelector';
import ContentTypeSelector from '../objects/FormObjects.js/ContentTypeSelector';
import InPersonSelector from '../objects/FormObjects.js/InPersonSelector';
import StartDateSelector from '../objects/FormObjects.js/StartDateSelector';
import EndDateSelector from '../objects/FormObjects.js/EndDateSelector';
import StartTimeSelector from '../objects/FormObjects.js/StartTimeSelector';
import EndTimeSelector from '../objects/FormObjects.js/EndTimeSelector';

// Header
function Header({navigation}) {
    const myContext =useContext(AppContext);
    // event handler function
    const closeHandler = () => {
        myContext.toggleShowNavBar(true);
        navigation.dangerouslyGetParent().goBack();
    }
    return (
        <View style = {styles.outerContainer}>
        <View style = {styles.innerContainer}>
                <Text style = {styles.headerText}>Create A New Event</Text>
                <View style = {styles.close}>
                    <AntDesign name = 'closecircleo' size = {30} onPress = {closeHandler}/>
                </View> 
               
        </View>
        </View>
    );
}

// Components

const Back = () => {
        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("MoreInformation")}>
                <Image source={require('../assets/Back.png')}/>
        </TouchableOpacity>
    
}

const Next = ({navigation}) => {

    return (
        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("MoreInformation")}>
            <Image source={require('../assets/Next.png')}/>
        </TouchableOpacity>
    );
    
}

// Screens
// First slide
function EventInformation({navigation}) {
    return (
        <SafeAreaView>
            
                <Formik
                    initialValues={{ EventTitle: '', OrganizerName: '', EventType: '', ContentType: '', Tags: '', Privacy: '' }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {(formikprops) => (
                        <ScrollView style={styles.scrollContainer}>
                            <View>
                            <Header navigation={navigation}/>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Image style={{margin: 20, flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                                <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Gray-Progress-Bar.png')}/>
                                <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Gray-Progress-Bar.png')}/>
                                <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Gray-Progress-Bar.png')}/>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}> 
                                    Event Title:
                                </Text>
                                <TextInput 
                                    style={styles.InputBox}
                                    placeholder='Eg: MProduct Interest Meeting'
                                    onChangeText={formikprops.handleChange('EventTitle')}
                                    value={formikprops.values.EventTitle}
                                />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}> 
                                    Organizer Name:
                                </Text>
                                <TextInput 
                                    style={styles.InputBox}
                                    placeholder='Organization (eg. MProduct) or you (Eg. Alex Jian)'
                                    onChangeText={formikprops.handleChange('OrganizerName')}
                                    value={formikprops.values.OrganizerName}
                                />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}> 
                                    Event Type:
                                </Text>
                                <EventTypeSelector 
                                    onChangeText={formikprops.handleChange('EventType')}
                                    value={formikprops.values.EventType}
                                />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}> 
                                    Content Type:
                                </Text>
                                <ContentTypeSelector/>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}> 
                                    Tags (10 max):
                                </Text>
                                <TextInput 
                                    style={styles.InputBox}
                                    placeholder='Optional, but boosts discoverability. Eg. #design'
                                    onChangeText={formikprops.handleChange('Tags')}
                                    value={formikprops.values.Tags}
                                />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}> 
                                    Privacy:
                                </Text>
                                <PrivacySelector/>
                            </View>
                            <View style={styles.containerStyle}>
                                <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("MoreInformation")}>
                                    <Image source={require('../assets/Next.png')}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerStyle}>
                                <Button title="show values" onPress={formikprops.handleSubmit}/>
                            </View>
                        </ScrollView>
                    )}
                    
                </Formik>    
        </SafeAreaView>

    );
}
// Second Slide
function MoreInformation({navigation}) {
    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollContainer}>
                <Header navigation={navigation}/>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{margin: 20, flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                    <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                    <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Gray-Progress-Bar.png')}/>
                    <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Gray-Progress-Bar.png')}/>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        In Person or Online?
                    </Text>
                    <InPersonSelector/>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Location Name:
                    </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder="Egs. Michigan Union, My House, etc. Can be TBA."
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Address:
                    </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder='Eg: 1111 S State St, Ann Arbor, MI, 48104'
                    />
                </View>
                <View style={{width: '20%'}, {height: '20%'}}>
                        <Image style={{resizeMode: 'contain'}, {width: '60%'}, {height: '100%'}} source={require('../assets/AA-Map.png')}/>
                </View>
                
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Location Details:
                    </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder='Eg: 2nd floor meeting room'
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("EventInformation")}>
                            <Image source={require('../assets/Back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("EventSchedule")}>
                            <Image source={require('../assets/Next.png')}/>
                        </TouchableOpacity>
                    </View>
                
                </View>
            </ScrollView>
            
        </SafeAreaView>

    );
}

// Third Slide 
function EventSchedule({navigation}) {
    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollContainer}>
                <Header navigation={navigation}/>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{margin: 20, flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                    <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                    <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                    <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Gray-Progress-Bar.png')}/>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Start Day:
                    </Text>
                    <StartDateSelector />
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Start Time:
                    </Text>
                    <StartTimeSelector/>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        End Day:
                    </Text>
                    <EndDateSelector />
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        End Time:
                    </Text>
                    <EndTimeSelector/>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}>
                        Requires Planning in Advance
                    </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder='Amount of Time in Advance'
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Requires Registration
                    </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder='Link to external registration tool'
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("MoreInformation")}>
                                <Image source={require('../assets/Back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("EventDetails")}>
                                <Image source={require('../assets/Next.png')}/>
                        </TouchableOpacity>
                    </View>
                
                </View>
            </ScrollView>
            
        </SafeAreaView>


    );
}

// Fourth Slide
function EventDetails({navigation}) {
    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollContainer}>
                <Header navigation={navigation}/>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{margin: 20, flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                    <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                    <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                    <Image style={{margin: 20,flex: 2/9}}source={require('../assets/Progress-Bar.png')}/>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Event Description:
                    </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder='Describe your event here'
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Organizer Email:
                    </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder='Optional. eg: mproduct@umich.edu'
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Organizer Website:
                    </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder='Optional. Eg: www.mproduct.com'
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.TextStyle}> 
                        Event Image (2:1 ratio, 10 MB limit):
                    </Text>
                    <Button 
                        style={styles.InputBox}
                        // add onpress later
                        title="Upload Photo"
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("EventSchedule")}>
                                <Image source={require('../assets/Back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("Preview")}>
                                <Image source={require('../assets/Preview.png')}/>
                        </TouchableOpacity>
                    </View>
                
                </View>
            </ScrollView>
            
        </SafeAreaView>

    );
}

function Preview({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            
                <View style={styles.box}>
                    <View style={styles.inner1}>
                        <Image style={styles.realImageStyle} source={require('../assets/ycombinator-logo.png')}/>
                    </View>
                    <View style={styles.inner2}>
                        <Text style={{fontSize: 20}}>Startups 101 - Starting Your Own Business in College</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("EventDetails")}>
                                <Image source={require('../assets/Back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style = {styles.SearchButton} >
                                <Image source={require('../assets/PostEvent.png')}/>
                        </TouchableOpacity>
                    </View>
                
                </View>
            

        </SafeAreaView>
    );
} 
    


// switch navigation
{/*const screens = {
    EventInformation: {
        screen: EventInformation,
        navigationOptions: {
            headerShown: false
        },
    },
    MoreInformation: {
        screen: MoreInformation,
        navigationOptions: {
            headerShown: false
        },
    },
    EventDetails: {
        screen: EventDetails,
        navigationOptions: {
            headerShown: false
        },
    },
    EventSchedule: {
        screen: EventSchedule,
        navigationOptions: {
            headerShown: false
        },
    },
    Preview: {
        screen: Preview,
        navigationOptions: {
            headerShown: false
        }
    }
}*/}

{/*const CreateNewEventSlides = createStackNavigator(screens);

const CreateNewEventContainer = createAppContainer(CreateNewEventSlides);*/}
const Stack = createStackNavigator()

export default function CreateNewEventScreen({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EventInformation" component={EventInformation} options={{headerShown: false}}/>
            <Stack.Screen name="MoreInformation" component={MoreInformation} options={{headerShown: false}} />
            <Stack.Screen name="EventDetails" component={EventDetails} options={{headerShown: false}}/>
            <Stack.Screen name="EventSchedule" component={EventSchedule} options={{headerShown: false}}/>
            <Stack.Screen name="Preview" component={Preview} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    TextStyle : { 
        fontSize: 20,
        color: '#09189F',
        margin: 10,
        fontWeight: 'bold'
    },

    containerStyle : {
        
    },

    InputBox : {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        padding: 8,
        width: '80%',
        margin: 10
    },

    imageStyle : {

     },
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
        
    },
    scrollContainer: {
        paddingBottom: 90,
        zIndex: 0
    },
    outerContainer: {
        flex: 1,
    },
    innerContainer: {
        marginTop: 5,
    },
    searchContainer: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#fffbf2',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    close: {
        position: 'absolute',
        left: 350,
        top: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 20.4,
    },
})
