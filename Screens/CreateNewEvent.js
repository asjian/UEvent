import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useContext } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useNavigation } from '@react-navigation/native'
import { Field, Formik, } from 'formik';
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
import TimeInAdvanceSelector from '../objects/FormObjects.js/TimeInAdvanceSelector';
import ImagePickerExample from '../objects/FormObjects.js/ImagePicker';
import * as yup from 'yup';

// Header
function Header({navigation}) {
    const myContext =useContext(AppContext);
    // event handler function
    const closeHandler = () => {
        myContext.toggleShowNavBar(true);
        navigation.goBack();
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
// Preview Header
function PreviewHeader({navigation}) {
    const myContext =useContext(AppContext);
    // event handler function
    const closeHandler = () => {
        myContext.toggleShowNavBar(true);
        navigation.dangerouslyGetParent().goBack();
    }
    return (
        <View style = {styles.outerContainer}>
        <View style = {styles.innerContainer}>
                <Text style = {styles.headerText2}>Preview</Text>
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

const validSchema = yup.object({
        // first slide
        EventTitle: yup.string()
            .required(),
        OrganizerName: yup.string()
            .required(), 
        EventType: yup.string()
            .required(), 
        ContentType: yup.string()
            .required(), 
        Tags: yup.string()
            .required(), 
        Privacy: yup.string()
            .required(),
        // second slide
        InPerson: yup.string()
            .required(),
        LocationName: yup.string()
            .required(),
        Address: yup.string()
            .required(),
        LocationDetails: yup.string()
            .required(),
        // third slide
        StartDay: yup.string()
            .required(), 
        StartTime: yup.string()
            .required(), 
        EndDay: yup.string()
            .required(), 
        EndTime: yup.string()
            .required(), 
        Planning: yup.string()
            .required(), 
        Registration: yup.string()
            .required(),
        // fourth slide
        EventDescription: yup.string()
            .required(),
        OrganizerEmail: yup.string()
            .required(),
        OrganizerWebsite: yup.string()
            .required(),

})
// First slide
const EventInformation = (props) => {
    const navigation = useNavigation();

    const handleSubmit = (values) => {
        props.next(values);
    };

    return (
        <SafeAreaView style={styles.containerBack}>
            
                <Formik
                    initialValues={props.data}
                    onSubmit={handleSubmit}
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
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.EventType}
                                />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}> 
                                    Content Type:
                                </Text>
                                <ContentTypeSelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.ContentType}
                                />
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
                                <PrivacySelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.Privacy}
                                />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style = {styles.SearchButton} onPress={formikprops.handleSubmit}>
                                <Image source={require('../assets/Next.png')}/>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                        </ScrollView>
                    )}
                    
                </Formik>    
        </SafeAreaView>

    );
}
// Second Slide
const MoreInformation = (props) => {
    const navigation = useNavigation();

    const handleSubmit = (values) => {
        props.next(values);
    };

    return (
        <SafeAreaView style={styles.containerBack}>
            <Formik
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {(formikprops) => (
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
                        <InPersonSelector
                            onChange={formikprops.setFieldValue}
                            value={formikprops.values.InPerson}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            Location Name:
                        </Text>
                        <TextInput 
                            style={styles.InputBox}
                            placeholder="Egs. Michigan Union, My House, etc. Can be TBA."
                            onChangeText={formikprops.handleChange('LocationName')}
                            value={formikprops.values.LocationName}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            Address:
                        </Text>
                        <TextInput 
                            style={styles.InputBox}
                            placeholder='Eg: 1111 S State St, Ann Arbor, MI, 48104'
                            onChangeText={formikprops.handleChange('Address')}
                            value={formikprops.values.Address}
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
                            onChangeText={formikprops.handleChange('LocationDetails')}
                            value={formikprops.values.LocationDetails}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style = {styles.SearchButton} onPress={() => props.prev(formikprops.values)}>
                                <Image source={require('../assets/Back.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style = {styles.SearchButton} onPress={formikprops.handleSubmit}>
                                <Image source={require('../assets/Next.png')}/>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </ScrollView>
                ) }
            </Formik>
        </SafeAreaView>

    );
}

// Third Slide 
const EventSchedule = (props) => {
    const navigation = useNavigation();

    const handleSubmit = (values) => {
        props.next(values);
    };

    return (
        <SafeAreaView style={styles.containerBack}>
             <Formik
                    initialValues={props.data}
                    onSubmit={handleSubmit}
                >
            {(formikprops) => (
                <ScrollView style={styles.scrollContainer}>
                    <Header navigation={navigation}/>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{margin: 20, flex: 2/9}} source={require('../assets/Progress-Bar.png')}/>
                        <Image style={{margin: 20,flex: 2/9}} source={require('../assets/Progress-Bar.png')}/>
                        <Image style={{margin: 20,flex: 2/9}} source={require('../assets/Progress-Bar.png')}/>
                        <Image style={{margin: 20,flex: 2/9}} source={require('../assets/Gray-Progress-Bar.png')}/>
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            Start Day:
                        </Text>
                        <StartDateSelector 
                            onChange={formikprops.setFieldValue}
                            value={formikprops.values.StartDay}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            Start Time:
                        </Text>
                        <StartTimeSelector
                            onChange={formikprops.setFieldValue}
                            value={formikprops.values.StartTime}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            End Day:
                        </Text>
                        <EndDateSelector 
                            onChange={formikprops.setFieldValue}
                            value={formikprops.values.EndDay}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            End Time:
                        </Text>
                        <EndTimeSelector
                            onChange={formikprops.setFieldValue}
                            value={formikprops.values.EndTime}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}>
                            Requires Planning in Advance
                        </Text>
                        <TimeInAdvanceSelector 
                            onChange={formikprops.setFieldValue}
                            value={formikprops.values.Planning}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            Requires Registration
                        </Text>
                        <TextInput 
                            style={styles.InputBox}
                            placeholder='Link to external registration tool'
                            onChangeText={formikprops.handleChange('Registration')}
                            value={formikprops.values.Registration}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style = {styles.SearchButton} onPress={() => props.prev(formikprops.values)}>
                                    <Image source={require('../assets/Back.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style = {styles.SearchButton} onPress={formikprops.handleSubmit}>
                                    <Image source={require('../assets/Next.png')}/>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </ScrollView>
                ) }
            </Formik>
        </SafeAreaView>


    );
}

// Fourth Slide
const EventDetails = (props) => {
    const navigation = useNavigation();

    const handleSubmit = (values) => {
        props.next(values, true);
         // navigate to preview screen
         navigation.navigate('Preview', {values: values});
    };

    

    return (
        <SafeAreaView style={styles.containerBack}>
           <Formik
                initialValues={props.data}
                validationSchema={validSchema}
                onSubmit={handleSubmit}
            >
                {(formikprops) => (
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
                            multiline={true}
                            placeholder='Describe your event here'
                            onChangeText={formikprops.handleChange('EventDescription')}
                            value={formikprops.values.EventDescription}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            Organizer Email:
                        </Text>
                        <TextInput 
                            style={styles.InputBox}
                            placeholder='Optional. eg: mproduct@umich.edu'
                            onChangeText={formikprops.handleChange('OrganizerEmail')}
                            value={formikprops.values.OrganizerEmail}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            Organizer Website:
                        </Text>
                        <TextInput 
                            style={styles.InputBox}
                            placeholder='Optional. Eg: www.mproduct.com'
                            onChangeText={formikprops.handleChange('OrganizerWebsite')}
                            value={formikprops.values.OrganizerWebsite}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Text style={styles.TextStyle}> 
                            Event Image (2:1 ratio, 10 MB limit):
                        </Text>
                        <ImagePickerExample/>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style = {{marginTop: '20%'}} onPress={() => props.prev(formikprops.values)}>
                                    <Image source={require('../assets/Back.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style = {{marginTop: '20%'}} onPress={formikprops.handleSubmit}>
                                    <Image source={require('../assets/Preview.png')}/>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </ScrollView>
                ) }
            </Formik>
            
        </SafeAreaView>

    );
}



const Preview = ({route, navigation}) => {
    const {values} = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1, borderBottomWidth: 1}}>
                <PreviewHeader navigation={navigation}/>
            </View>
              
                <View style={styles.box}>
                    <View style={styles.inner1}>
                        <Image style={styles.realImageStyle} source={require('../assets/YC-Circular.png')}/>
                    </View>
                    <View style={styles.inner2}>
                        <Text style={{fontSize: 20, fontWeight: '500'}}>{values.EventTitle}</Text>
                    </View>
                </View>
                <View style={{flex:2.5, flexDirection: 'column', borderBottomWidth: 0.2}}>
                    <View style={{flex: 1, flexDirection:'row',  alignContent: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'row', alignContent: 'center'}}>
                            <Image style={{flex: 1, marginLeft: '10%'}} source={require('../assets/Vector.png')}/>
                            <Text style={{flex: 9, marginLeft: '10%' , fontWeight: '500', color: '#FF8A00', fontSize: 16}}>{values.OrganizerName}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row',  alignContent: 'center'}}>
                            <Image style={{flex: 1, marginLeft: '10%'}} source={require('../assets/ContentType.png')}/>
                            <Text style={{flex: 9, marginLeft: '10%', fontWeight: '500', color: '#FAB400', fontSize: 16}}>{values.ContentType}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row' }}>
                        <View style={{flex: 2}}>
                            <Image style={{resizeMode: 'contain', marginLeft: '30%'}} source={require('../assets/CalendarIcon.png')}/>
                        </View>
                        <View style={{flex: 9.5}}>
                            <Text style={{fontWeight: '500', color: '#0085FF', fontSize: 16}}>{values.StartDay}, {values.StartTime} - {values.EndTime} ({values.InPerson})</Text>
                        </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row', }}>
                        <View style={{flex: 1}}>
                            <Image style={{resizeMode: 'contain', width: '80%', height: '80%'}} source={require('../assets/Save.png')}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Image style={{resizeMode: 'contain', width: '80%', height: '80%'}} source={require('../assets/ImGoing.png')}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Image style={{resizeMode: 'contain', width: '80%', height: '80%'}} source={require('../assets/Share.png')}/>
                        </View> 
                    </View>
                </View>
                <View style={{flex:2}}>
                    <Text>placeholder</Text>
                </View>
                <View style={{flex:2, borderBottomWidth: 0.2}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Event Description</Text>
                    <Text style={{fontSize: 14}}>{values.EventDescription}</Text>
                </View>
                <View style={{flex:2}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Location</Text>
                    <Text style={{fontSize: 14}}>{values.LocationName}</Text>
                    <Text style={{fontSize: 14}}>{values.Address}</Text>
                </View>
                <View style={{flex:1, borderTopWidth: 0.2}} >
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Registration</Text>
                    <Text style={{fontSize: 14}}>{values.Registration}</Text>
                </View>
                <View style={{flex:2, borderTopWidth: 0.2}} >
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>More Info</Text>
                    <Text style={{fontSize: 14}}>Website: {values.OrganizerWebsite}</Text>
                    <Text style={{fontSize: 14}}>Email: {values.OrganizerEmail}</Text>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style = {styles.SearchButton} onPress={() => navigation.navigate("Form")}>
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
    



// const Stack = createStackNavigator()

{/*export default function CreateNewEventScreen({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EventInformation" component={EventInformation} options={{headerShown: false}}/>
            <Stack.Screen name="MoreInformation" component={MoreInformation} options={{headerShown: false}} />
            <Stack.Screen name="EventDetails" component={EventDetails} options={{headerShown: false}}/>
            <Stack.Screen name="EventSchedule" component={EventSchedule} options={{headerShown: false}}/>
            <Stack.Screen name="Preview" component={Preview} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}*/}
const Stack = createStackNavigator()

function UpdateEvent({navigation}) {
    const [data, setData] = useState({
        // first slide
        EventTitle: '', 
        OrganizerName: '', 
        EventType: '', 
        ContentType: '', 
        Tags: '', 
        Privacy: '',
        // second slide
        InPerson: '',
        LocationName: '',
        Address: '',
        LocationDetails: '',
        // third slide
        StartDay: '', 
        StartTime: '', 
        EndDay: '', 
        EndTime: '', 
        Planning: '', 
        Registration: '',
        // fourth slide
        EventDescription: '',
        OrganizerEmail: '',
        OrganizerWebsite: '',
        EventImage: ''

    });

    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = (newData, final = false) => {
        setData(prev => ({...prev, ...newData}))

        if (final) {
            return;
        }
        setCurrentStep(prev => prev + 1)
    }

    const handlePrevStep = (newData) => {
        setData(prev => ({...prev, ...newData}))
        setCurrentStep(prev => prev - 1)
    }
   
    const steps = [
        <EventInformation next={handleNextStep} data={data}/>, 
        <MoreInformation next={handleNextStep} prev={handlePrevStep} data={data}/>, 
        <EventSchedule next={handleNextStep} prev={handlePrevStep} data={data}/>, 
        <EventDetails next={handleNextStep} prev={handlePrevStep} data={data}/>
    ];


    return (
        <View>{steps[currentStep]}</View>
    );
}

export default function CreateNewEventScreen({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Form" component={UpdateEvent} options={{headerShown: false}}/>
            <Stack.Screen name="Preview" component={Preview} options={{headerShown: false}}/>
       </Stack.Navigator>
    )
}

  {/* <Stack.Navigator>
            <Stack.Screen name="Form" component={steps[currentStep]} options={{headerShown: false}}/>
            <Stack.Screen name="Preview" component={Preview} options={{headerShown: false}}/>
       </Stack.Navigator>*/}

const styles = StyleSheet.create({
    containerBack: {
        backgroundColor: '#FFFBF3'
    },
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
        backgroundColor: '#FFFBF2'
        
    },
    NewEventButton : {
        margin: 10
    },
    box : {
        width: '95%',
        height: '20%',
        padding: 5,
        margin: 10,
        flexDirection: 'row',
        flex: 1,
        
    },
    inner1: {
        flex: 1,
        width: '100%',
        height: '100%'
     },
     inner2: {
        flex: 3
     },

    realImageStyle : {
        height: '100%',
        resizeMode: 'contain',
        width: '100%'
        
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
        top: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 20.5,
    },
    headerText2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: '38%',
    },

})
