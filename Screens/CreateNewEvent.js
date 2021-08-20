import React, {useRef,useEffect} from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, Image, ScrollView, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useContext } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useNavigation } from '@react-navigation/native'
import { ErrorMessage, Field, Formik, yupToFormErrors, FieldArray } from 'formik';
import CheckBox from '@react-native-community/checkbox';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppContext from '../objects/AppContext';
//import SearchableDropdown from 'react-native-searchable-dropdown';
import {EventTypeSelector} from '../objects/FormObjects/EventTypeSelector';
import PrivacySelector from '../objects/FormObjects/PrivacySelector';
import {ContentTypeSelector} from '../objects/FormObjects/ContentTypeSelector';
import InPersonSelector from '../objects/FormObjects/InPersonSelector';
import ImagePickerExample from '../objects/FormObjects/ImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import Globals from '../../GlobalVariables';
import * as yup from 'yup';
import { max } from 'react-native-reanimated';
import LocationAutocomplete from '../objects/FormObjects/LocationAutocomplete';
import { StartDateSelector } from '../objects/FormObjects/StartDateSelector';
import { EndDateSelector } from '../objects/FormObjects/EndDateSelector';
import { StartTimeSelector } from '../objects/FormObjects/StartTimeSelector';
import { EndTimeSelector } from '../objects/FormObjects/EndTimeSelector';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { NavigationActions } from 'react-navigation';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


// Header
function Header({ navigation }) {
    const myContext = useContext(AppContext);
    // event handler function
    const closeHandler = () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to exit the form? All form information will be lost",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => {navigation.goBack(); myContext.toggleShowNavBar(true);}}
            ]
          );
        
    }
    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.headerText}>Create A New Event</Text>
                <View style={styles.close}>
                    <AntDesign name='closecircleo' size={30} onPress={closeHandler} />
                </View>

            </View>
        </View>
    );
}
// Preview Header
function PreviewHeader({ navigation }) {
    const myContext = useContext(AppContext);
    // event handler function
    const closeHandler = () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to exit the form? All form information will be lost",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => {navigation.dangerouslyGetParent().goBack(); myContext.toggleShowNavBar(true);}}
            ]
          );
    }
    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.headerText2}>Preview</Text>
                <View style={styles.close}>
                    <AntDesign name='closecircleo' size={30} onPress={closeHandler} />
                </View>

            </View>
        </View>
    );
}
// Components
const Next = ({ navigation }) => {

    return (
        <TouchableOpacity style={styles.SearchButton} onPress={() => navigation.navigate("MoreInformation")}>
            <Image source={require('../assets/Next.png')} />
        </TouchableOpacity>
    );

}

// Screens

const pageOneValidSchema = yup.object({
    // first slide
    EventTitle: yup.string()
        .max(50, 'Event Title must 50 characters or less')
        .required()
        .label('Event Title'),
    OrganizerName: yup.string()
        .max(50, 'Organizer Name must be 50 characters or less')
        .required()
        .label('Organizer Name'),
    EventType: yup.string()
        .required()
        .label('Main Event Category')
        .nullable(),
    ContentType: yup.array()
        .label('Other Categories')
        .nullable(),
    Tags: yup.string()
        .max(50, 'Max of 10 Tags'),
    Privacy: yup.string()
        .required()
        .nullable(),

})

const pageTwoValidSchema = yup.object({
    // second slide
    InPerson: yup.string()
        .required()
        .label('In Person or Virtual')
        .nullable(),
    LocationName: yup.string()
        .when('InPerson', {
            is: (value) => value === 'In Person',
            then: yup.string().required()
        })
        .label('Location Name')
        .max(50, 'Location Name must be 50 characters or less'),
    EventLink: yup.string()
        .when('InPerson', {
            is: (value) => value === 'Virtual',
            then: yup.string().required()
        })
        .label('Event Link')
    ,
    
    Address: yup.string()
        .when('InPerson', {
            is: (value) => value === 'In Person',
            then: yup.string().required()
        })
        .when(['InPerson', 'locationSelected'], {
            is: (InPerson, locationSelected) => (InPerson === 'In Person') && (locationSelected === false),
            then: yup.string().test('scheme', 'Please choose an adress from the dropdown', (value, context) => value === '')
        }),
        
    LocationDetails: yup.string()
        .max(100, 'Location Details must be 100 characters or less'),

})

const pageThreeValidSchema = yup.object({
    // third slide
    StartDay: yup.string()
        .required(),
    StartTime: yup.string()
        .required(),
    EndDay: yup.string()
        .required(),
    EndTime: yup.string()
        .required(),
    RealStartDateTime: yup.date()
        ,
    RealEndDateTime: yup.date()
        .min(yup.ref('RealStartDateTime'), 
        ({min}) => `End date and time needs to be after ${min.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} on ${min.toDateString()}` ),
    Registration: yup.string()
     .url('Must be a valid link'), 

})

const pageFourValidSchema = yup.object({
    // fourth slide
    EventDescription: yup.string()
        .required()
        .label('Event Description')
        .max(500, 'Event Description must be 500 characters or less'),
    OrganizerEmail: yup.string()
    .email('Must be a valid email'),
    OrganizerWebsite: yup.string()
    .url('Must be a valid link'),

})
// First slide
const EventInformation = (props) => {
    const navigation = useNavigation();

    const handleSubmit = (values) => {
        props.next(values);
        console.log(values);
    };

    const [isFocused, setFocus] = useState(false);
    const [isFocused2, setFocus2] = useState(false);
    const [isFocused6, setFocus6] = useState(false);

    return (
        <SafeAreaView style={styles.containerBack}>

            <Formik
                initialValues={props.data}
                onSubmit={handleSubmit}
                validationSchema={pageOneValidSchema}              
            >
                {(formikprops) => (
                    <View>
                        <KeyboardAwareScrollView style={styles.scrollContainer}>
                            <View>
                                <Header navigation={navigation} />
                            </View>
                            <View>
                                <Text style={{color: '#09189F', fontSize: 22 , marginLeft: 23, marginTop: 30, fontWeight: '500'}}>Event Information</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ marginLeft:23, marginRight:20, marginVertical: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Gray-Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Gray-Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Gray-Progress-Bar.png')} />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Event Title: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.EventTitle !== '' || isFocused ? '#7b7b7b' : '#c4c4c4'}]}
                                    placeholder='Eg: MProduct Interest Meeting'
                                    placeholderTextColor = '#a3a3a3'
                                    onChangeText={formikprops.handleChange('EventTitle')}
                                    value={formikprops.values.EventTitle}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    maxLength={50}
                                />
                                <View style={styles.messageContainer}>
                                    <Text style={styles.errorMessage}>{formikprops.touched.EventTitle && formikprops.errors.EventTitle}</Text>
                                    <Text style={styles.counterStyle}>{formikprops.values.EventTitle.length.toString()} / 50</Text>
                                </View>

                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Organizer Name: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.OrganizerName !== '' || isFocused2 ? '#7b7b7b' : '#c4c4c4'}]}
                                    placeholder='Organization (eg. MProduct) or you (Eg. Alex Jian)'
                                    placeholderTextColor = '#a3a3a3'
                                    textAlign = 'left'
                                    onChangeText={formikprops.handleChange('OrganizerName')}
                                    value={formikprops.values.OrganizerName}
                                    onFocus={() => setFocus2(true)}
                                    onBlur={() => setFocus2(false)}
                                    maxLength={50}
                                />
                                <View style={styles.messageContainer}>
                                    <Text style={styles.errorMessage}>{formikprops.touched.OrganizerName && formikprops.errors.OrganizerName}</Text>
                                    <Text style={styles.counterStyle}>{formikprops.values.OrganizerName.length.toString()} / 50</Text>
                                </View>
                            </View>
                            <View style={[styles.containerStyle,{marginTop:2,}]}>
                                <Text style={styles.TextStyle}>
                                    Main Event Category: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <View style={{width: '88%', marginLeft: 23, marginTop: 10, }}>
                                    <FieldArray name="EventType" component={EventTypeSelector} />
                                </View>
                               
                                <Text style={styles.errorMessage}>{formikprops.touched.EventType && formikprops.errors.EventType}</Text>
                            </View>
                            <View style={[styles.containerStyle,{marginTop:8,}]}>
                                <Text style={styles.TextStyle}>
                                    Other Categories:
                                </Text>
                                <View style={{width: '88%', marginLeft: 23, marginTop: 10, }}>
                                    <FieldArray name="ContentType" component={ContentTypeSelector} />
                                </View>
                                
                                {/*<ContentTypeSelector3
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.ContentType}
                                />*/}
                                <Text style={styles.errorMessage}>{formikprops.touched.ContentType && formikprops.errors.ContentType}</Text>
                            </View>
                            <View style={[styles.containerStyle,{marginTop:5,}]}>
                                <Text style={styles.TextStyle}>
                                    Privacy: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <PrivacySelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.Privacy}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.Privacy && formikprops.errors.Privacy}</Text>
                            </View>
                            {/*
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Tags (10 max):
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.Tags !== '' || isFocused6 ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder='Optional, but boosts discoverability. Eg. #design'
                                    onChangeText={formikprops.handleChange('Tags')}
                                    value={formikprops.values.Tags}
                                    onFocus={() => setFocus6(true)}
                                    onBlur={() => setFocus6(false)}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.Tags && formikprops.errors.Tags}</Text>
                            </View>
                            */}             
                        </KeyboardAwareScrollView>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignItems: 'center', marginRight: '20%' }} >
                                    <View style={styles.backContainerInit}>
                                        <Text style={styles.backText}>Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={formikprops.handleSubmit}>
                                    <View style={styles.nextContainer}>
                                        <Text style={styles.nextText}>Next</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
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

    const [isFocused2, setFocus2] = useState(false);
    const [isFocused2a, setFocus2a] = useState(false);
    const [isFocused4, setFocus4] = useState(false);

    return (
        <SafeAreaView style={styles.containerBack}>
            <Formik
                initialValues={props.data}
                onSubmit={handleSubmit}
                validationSchema={pageTwoValidSchema}
            >         
                {(formikprops) => (
                    <View>
                        <KeyboardAwareScrollView style={styles.scrollContainer} keyboardShouldPersistTaps = "handled">
                            <Header navigation={navigation} />
                            <View>
                                <Text style={{color: '#09189F', fontSize: 22 , marginLeft: 20, marginTop: 30, fontWeight: '500'}}>Location Information</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Gray-Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Gray-Progress-Bar.png')} />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    In Person or Online? 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <InPersonSelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.InPerson}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.InPerson && formikprops.errors.InPerson}</Text>
                            </View>
                
                            <View style={[styles.containerStyle,{marginTop:5,}]}>
                            {formikprops.values.InPerson === 'In Person' &&
                                (<Text style={styles.TextStyle}>
                                    Location Name: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                )
                            }
                                {formikprops.values.InPerson === 'In Person' &&
                                (<TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.LocationName !== '' || isFocused2 ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder="Egs. Michigan Union, My House, etc. Can be TBA."
                                    placeholderTextColor = '#a3a3a3'
                                    onChangeText={formikprops.handleChange('LocationName')}
                                    value={formikprops.values.LocationName}
                                    onFocus={() => setFocus2(true)}
                                    onBlur={() => setFocus2(false)}
                                    maxLength={50}
                                />)
                            }
                                {formikprops.values.InPerson === 'In Person' &&
                                    <View style={styles.messageContainer}>
                                        <Text style={styles.errorMessage}>{formikprops.touched.LocationName && formikprops.errors.LocationName}</Text>
                                        <Text style={styles.counterStyle}>{formikprops.values.LocationName.length.toString()} / 50</Text>
                                    </View>
                                }
                                
                            </View>
                            <View style={styles.containerStyle}>
                            {formikprops.values.InPerson === 'Virtual' &&
                                (<Text style={styles.TextStyle}>
                                    Event Link: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>)
                            }
                                {formikprops.values.InPerson === 'Virtual' &&
                                (<TextInput
                                    style={[styles.InputBox, {borderColor: isFocused2a ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder="Egs. Zoom link, Webex"
                                    onChangeText={formikprops.handleChange('EventLink')}
                                    value={formikprops.values.EventLink}
                                    onFocus={() => setFocus2a(true)}
                                    onBlur={() => setFocus2a(false)}
                                />)
                            }
                                
                                {formikprops.values.InPerson === 'Virtual' &&
                                (<Text style={styles.errorMessage}>{formikprops.touched.EventLink && formikprops.errors.EventLink}</Text>)
                                }
                            </View>
                            <View style={styles.containerStyle}>
                            {formikprops.values.InPerson === 'In Person' &&
                                (<Text style={styles.TextStyle}>
                                    Address: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>)
                            }
                            {formikprops.values.InPerson === 'In Person' &&
                                (<LocationAutocomplete address = {formikprops.values.Address} setFormikValue = {formikprops.setFieldValue} />)
                            }
                            {formikprops.values.InPerson === 'In Person' &&
                                <Text style={styles.errorMessage}>{formikprops.touched.Address && formikprops.errors.Address}</Text>
                            }
                            </View>

                            <View style={styles.containerStyle}>
                            {((formikprops.values.InPerson === 'In Person') || (formikprops.values.InPerson === 'Virtual')) &&
                                (<Text style={styles.TextStyle}>
                                    Location Details:
                                </Text>)
                            }
                            {((formikprops.values.InPerson === 'In Person') || (formikprops.values.InPerson === 'Virtual')) &&
                                (<TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.LocationDetails !== '' || isFocused4 ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder='Eg: 2nd floor meeting room'
                                    placeholderTextColor = '#a3a3a3'
                                    onChangeText={formikprops.handleChange('LocationDetails')}
                                    value={formikprops.values.LocationDetails}
                                    onFocus={() => setFocus4(true)}
                                    onBlur={() => setFocus4(false)}
                                    maxLength={100}
                                    multiline={true}
                                />)
                            }
                            {((formikprops.values.InPerson === 'In Person') || (formikprops.values.InPerson === 'Virtual')) &&
                                (<View style={styles.messageContainer}>
                                    <Text style={styles.errorMessage}>{formikprops.touched.LocationDetails && formikprops.errors.LocationDetails}</Text>
                                    <Text style={styles.counterStyle}>{formikprops.values.LocationDetails.length.toString()} / 100</Text>
                                </View>)
                            }
                            </View>
                        </KeyboardAwareScrollView>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignItems: 'center', marginRight: '20%' }} onPress={() => props.prev(formikprops.values)}>
                                    <View style={styles.backContainer}>
                                        <Text style={styles.backText}>Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={formikprops.handleSubmit}>
                                    <View style={styles.nextContainer}>
                                        <Text style={styles.nextText}>Next</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                )}
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

    const [isFocused, setFocus] = useState(false);

    return (
        <SafeAreaView style={styles.containerBack}>
            <Formik
                initialValues={props.data}
                onSubmit={handleSubmit}
                validationSchema={pageThreeValidSchema}
            >
                {(formikprops) => (
                    <View>
                        <KeyboardAwareScrollView style={styles.scrollContainer}>
                            
                            <Header navigation={navigation} />
                            <View>
                                <Text style={{color: '#09189F', fontSize: 22 , marginLeft: 20, marginTop: 20, fontWeight: '500'}}>Event Schedule</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Gray-Progress-Bar.png')} />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Start Day: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <StartDateSelector
                                    onChangeFormik={formikprops.setFieldValue}
                                    realStartDate={formikprops.values.RealStartDateTime}
                                    realEndDate={formikprops.values.RealEndDateTime}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.StartDay && formikprops.errors.StartDay}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Start Time: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <StartTimeSelector
                                    onChangeFormik={formikprops.setFieldValue}
                                    realStartDate={formikprops.values.RealStartDateTime}
                                    realEndDate={formikprops.values.RealEndDateTime}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.StartTime && formikprops.errors.StartTime}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    End Day: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <EndDateSelector
                                    onChangeFormik={formikprops.setFieldValue}
                                    realStartDate={formikprops.values.RealStartDateTime}
                                    realEndDate={formikprops.values.RealEndDateTime}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.EndDay && formikprops.errors.EndDay}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    End Time: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <EndTimeSelector
                                    onChangeFormik={formikprops.setFieldValue}
                                    realStartDate={formikprops.values.RealStartDateTime}
                                    realEndDate={formikprops.values.RealEndDateTime}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.RealEndDateTime && formikprops.errors.RealEndDateTime}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Requires Registration
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.Registration !== '' || isFocused ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder='Link to external registration tool'
                                    onChangeText={formikprops.handleChange('Registration')}
                                    value={formikprops.values.Registration}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.Registration && formikprops.errors.Registration}</Text>
                            </View>
                        </KeyboardAwareScrollView>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignItems: 'center', marginRight: '20%' }} onPress={() => props.prev(formikprops.values)}>
                                    <View style={styles.backContainer}>
                                        <Text style={styles.backText}>Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={formikprops.handleSubmit}>
                                    <View style={styles.nextContainer}>
                                        <Text style={styles.nextText}>Next</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                )}
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
        navigation.navigate('Preview', { values: values });
        console.log(values);
    };

    const [isFocused, setFocus] = useState(false);
    const [isFocused2, setFocus2] = useState(false);
    const [isFocused3, setFocus3] = useState(false);

    return (
        <SafeAreaView style={styles.containerBack}>
            <Formik
                initialValues={props.data}
                validationSchema={pageFourValidSchema}
                onSubmit={handleSubmit}
            >
                {(formikprops) => (
                    <View>
                        <KeyboardAwareScrollView style={styles.scrollContainer}>
                            <Header navigation={navigation} />
                            <View>
                                <Text style={{color: '#09189F', fontSize: 22 , marginLeft: 20, marginTop: 20, fontWeight: '500'}}>Event Details</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Event Description: 
                                    <Text style = {styles.requiredField}>
                                    {' '}* 
                                    </Text>
                                    
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.EventDescription !== '' || isFocused ? '#7b7b7b' : '#C4C4C4'}]}
                                    multiline={true}
                                    placeholder='Describe your event here'
                                    onChangeText={formikprops.handleChange('EventDescription')}
                                    value={formikprops.values.EventDescription}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    maxLength={500}
                                />
                                <View style={styles.messageContainer}>
                                    <Text style={styles.errorMessage}>{formikprops.touched.EventDescription && formikprops.errors.EventDescription}</Text>
                                    <Text style={styles.counterStyle}>{formikprops.values.EventDescription.length.toString()} / 500</Text>
                                </View>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Organizer Email:
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.OrganizerEmail !== '' || isFocused2 ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder='Optional. eg: mproduct@umich.edu'
                                    onChangeText={formikprops.handleChange('OrganizerEmail')}
                                    value={formikprops.values.OrganizerEmail}
                                    onFocus={() => setFocus2(true)}
                                    onBlur={() => setFocus2(false)}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.OrganizerEmail && formikprops.errors.OrganizerEmail}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Organizer Website:
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.OrganizerWebsite !== '' || isFocused3 ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder='Optional. Eg: www.mproduct.com'
                                    onChangeText={formikprops.handleChange('OrganizerWebsite')}
                                    value={formikprops.values.OrganizerWebsite}
                                    onFocus={() => setFocus3(true)}
                                    onBlur={() => setFocus3(false)}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.OrganizerWebsite && formikprops.errors.OrganizerWebsite}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Event Image (2:1 ratio, 10 MB limit):
                                </Text>
                                <ImagePickerExample 
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.EventImage}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignItems: 'center', marginRight: '20%' }} onPress={() => props.prev(formikprops.values)}>
                                    <View style={styles.backContainer}>
                                        <Text style={styles.backText}>Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={formikprops.handleSubmit}>
                                    <View style={styles.nextContainer}>
                                        <Text style={styles.nextText}>Preview</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                )}
            </Formik>

        </SafeAreaView>

    );
}
const Preview = ({ route, navigation }) => {
    const { values } = route.params;
    const myContext = useContext(AppContext);
    console.log(values);
    // Helper functions
    const inPerson = [{name:'In Person', icon: require('../assets/person.png'), ket: 0,},
    {name:'Virtual', icon: require('../assets/virtual.png'), key: 1}]

   

    const renderCategories = () => {
        let pic = ""
        for (let i = 0; i < inPerson.length; i++) {
          if (inPerson[i].name == values.InPerson) {
            pic = inPerson[i].icon
          }
        }
        return (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={pic}
              style={{width:18, height: 18, tintColor: 'orange'}}>
            </Image>
            <Text style={{marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: 'orange'}}>{values.InPerson}</Text>
          </View>
        )
      }

      const registration = () => {
        if(values.Registration != '') {
          return (
            <View>
              <Text style={{fontWeight: 'bold'}}>Registration</Text>
              <Text>{values.Registration}</Text>
            </View>
          )
        }
      }
      const moreDetails = () => {
        if(values.OrganizerEmail != '' && values.OrganizerWebsite != '') {
          return (
            <View>
              <Text style={{fontWeight: 'bold'}}>More Details</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>Email: </Text>
                <Text>{values.OrganizerEmail}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>Website: </Text>
                <Text>{values.OrganizerWebsite}</Text>
              </View>
            </View>
          )
        } else if (values.OrganizerEmail != '') {
          return (
            <View>
              <Text style={{fontWeight: 'bold'}}>More Details</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>Email: </Text>
                <Text>{values.OrganizerEmail}</Text>
              </View>
            </View>
          )
        } else if (values.OrganizerWebsite != '') {
          return (
            <View>
              <Text style={{fontWeight: 'bold'}}>More Details</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>Website: </Text>
                <Text>{values.OrganizerWebsite}</Text>
              </View>
            </View>
          )
        }
      }
  
      const [buttonColor1, setButtonColor1] = useState('#FFF')
    
        const toggle1 = () => {
          if (buttonColor1 == '#FFF') {
            setButtonColor1('#FFCB05')
          } else {
            setButtonColor1('#FFF')
          }
        }
    
        const [buttonColor2, setButtonColor2] = useState('#FFF')
    
        const toggle2 = () => {
          if (buttonColor2 == '#FFF') {
            setButtonColor2('#FFCB05')
          } else {
            setButtonColor2('#FFF')
          }
        }
    
        const [buttonColor3, setButtonColor3] = useState('#FFF')
        const toggle3 = () => {
          
        }
      const borderColor = (buttonColor) => {
        if (buttonColor == '#FFF') {
          return 'black'
        } else {
          return 'white'
        }
      }
  
      const [isTruncated, setIsTruncated] = useState(true);
      const resultString = isTruncated ? values.EventDescription.slice(0, 133) : values.EventDescription;
      const readMore = isTruncated ? 'Read More' : 'Read Less'
      const toggle = () => {
        setIsTruncated(!isTruncated);
      }
      const renderButton = () => {
        if (resultString.length > 130) {
          return (
            <TouchableOpacity onPress={toggle}>
              <Text style={{color: '#FFCB05', marginBottom: 10}}>{readMore}</Text>
            </TouchableOpacity>
          );
        }
      }
      const renderTime = () => {
        if (values.StartDay == values.EndDay) {
          return values.StartDay + ' - ' + values.EndTime
        }
        else {
          return values.StartTime + ' - ' + values.EndTime
        }
      }
      const handleNavigation = (postedEvent) => {
          myContext.changePostedEvent({...postedEvent,...{inUse:true}});
          navigation.popToTop();
          navigation.dangerouslyGetParent().popToTop();                  
          navigation.dangerouslyGetParent().dangerouslyGetParent().navigate('Find');
      }
    const postToServer = () => { //post the event to the server
        fetch(Globals.eventsURL + '/json/add', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.EventTitle,
                location: values.Address,
                locationName: values.LocationName,
                locationDetails: values.LocationDetails,
                description: values.EventDescription,
                privateEvent: values.Privacy!='Public',
                virtualEvent: values.InPerson!='In Person',
                coordinates: [{longitude:values.Longitude,latitude:values.Latitude}],
                registrationLink: values.Registration,
                organizer: values.OrganizerName,
                organizerWebsite: values.OrganizerWebsite,
                //startTime: "2021-08-09 20:00:00",
                startTime: values.RealStartDateTime.toISOString().substr(0,10) + ' ' + values.RealStartDateTime.toISOString().substr(11,8),
                endTime: values.RealEndDateTime.toISOString().substr(0,10) + ' ' + values.RealEndDateTime.toISOString().substr(11,8),
                //endTime: "2021-08-09 22:00:00",
                hostId: myContext.user.id,
                mainCategoryId: values.EventType,
                categoryIds: values.ContentType,
                }
                )
        })
        .then((response) => response.json())
        .then((json) => {
            console.log('event posted: ')
            console.log(json);
            handleNavigation(json);
        })
        .catch((error) => Alert.alert('Failed to Post Event',"Sorry, we can't post your event right now. Please try again later.")); 
    }
    const postEventHandler = () => {
        postToServer(); //handles all navigation stuff also
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#fff'
            }} >
            <View style={{flex: 1}}>
                <PreviewHeader navigation={navigation} />
            </View>
        <ScrollView contentContainerStyle={{height: '78%'}}>
            <View style={styles.panel}>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
              <View>
                <Text style={{
                  fontSize: 24,
                  width: Dimensions.get('window').width - 105,
                  marginRight: 10    
                  }} 
                  numberOfLines={2}>
                    {values.EventTitle}
                  </Text>
              </View>
              <View style={{borderRadius: 5, borderWidth: 1, borderColor: 'black', padding: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'black'}}>{values.Privacy}</Text>
              </View>
              
            </View>
            <View style={styles.panelHost}>
              <Image
                source={require('../assets/Vector.png')}
                style={{width:18, height: 18}}>
              </Image>
              <Text style={{marginLeft: 5, maxWidth: 200, marginRight: 15, fontSize: 16, fontWeight: 'bold', color: 'orange'}}>{values.OrganizerName}</Text>
              {renderCategories()}
            </View>
            <View style={styles.panelDate}>
              <Image
                source={require('../assets/CalendarIcon.png')}
                style={{width:18, height:18}}
              ></Image>
              <Text style={{marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: '#03a9f4'}}>{renderTime()}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 }}>
              <TouchableOpacity style={{backgroundColor: buttonColor1,
                borderRadius: 8,
                borderColor: borderColor(buttonColor1),
                borderWidth: 1,
                width: (Dimensions.get('window').width - 81.6) / 3,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 15,
                }}
                onPress={toggle1}>
                <View>
                  <Image
                    source={require('../assets/star.png')}
                    style={{height:18, width: 18, alignSelf: 'center', tintColor: borderColor(buttonColor1)}}
                  ></Image>
                  <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: borderColor(buttonColor1),
                  }}>Save</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: buttonColor2,
                borderRadius: 8,
                borderColor: borderColor(buttonColor2),
                borderWidth: 1,
                width: (Dimensions.get('window').width - 81.6) / 3,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 15,
                }}
                onPress={toggle2}>
                <View>
                  <Image
                    source={require('../assets/check2.png')}
                    style={{height:18, width: 18, alignSelf: 'center', tintColor: borderColor(buttonColor2)}}
                  ></Image>
                  <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: borderColor(buttonColor2),
                  }}>I'm Going</Text>
                </View>   
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: buttonColor3,
                borderRadius: 8,
                borderColor: borderColor(buttonColor3),
                borderWidth: 1,
                width: (Dimensions.get('window').width - 81.6) / 3,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 15,
                }}
                onPress={toggle3}>
                <View>
                  <Image
                    source={require('../assets/share2.png')}
                    style={{height:18, width: 18, alignSelf: 'center', tintColor: borderColor(buttonColor3)}}
                  ></Image>
                  <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: borderColor(buttonColor3),
                  }}>Share</Text>
                </View>
              </TouchableOpacity>
            </View>
              <View>
                <Image source={{uri: values.EventImage}}
                resizeMode= 'cover'
                style={{width: Dimensions.get('window').width - 40.8, height: 200, marginBottom: 20}}>
                </Image>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>Event Description</Text>
              <View>
                <Text style={{marginBottom: 5}}>{resultString.replace(/(\r\n|\n|\r)/gm, " ")}</Text>
                {renderButton()}
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>Location</Text>
              <Text>{values.locationName}</Text>
              <Text style={{marginBottom: 10}}>{values.Address}</Text>
              {registration()}
              {moreDetails()}
              
                <TouchableOpacity style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/CalendarIcon.png')}
                    style={{width:18, height: 18, marginBottom: 5}}>
                  </Image>
                  <Text style={{marginLeft: 5, maxWidth: 200, marginRight: 15, fontSize: 16, color: '#03a9f4'}}>Add Event to Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/report.png')}
                    style={{width:18, height: 18, tintColor: 'red', marginBottom: Dimensions.get('window').height}}>
                  </Image>
                  <Text style={{marginLeft: 5, maxWidth: 200, marginRight: 15, fontSize: 16, color: 'red'}}>Report</Text>
                </TouchableOpacity>
          </View>
          </ScrollView>
            
                <View style={{ flexDirection: 'row', flex: 1}}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'center', marginRight: '20%' }} onPress={() => navigation.navigate("Form")}>
                            <View style={styles.backContainer}>
                                <Text style={styles.backText}>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={postEventHandler}>
                            <View style={styles.nextContainer}>
                                <Text style={styles.nextText}>Post Event!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
    
                </View>
    
            </SafeAreaView>
        );
    }
const Stack = createStackNavigator()

function UpdateEvent({ navigation }) {
    // date formatting
    let dateString = new Date().toString();
    let initialDateFormat = dateString.substring(0,3)+', '+dateString.substring(4,dateString.indexOf(':')-8);
    let time = new Date();
    let time1 = time.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    let endTime = new Date(new Date(time).setHours(time.getHours() + 1));
    let endTime1 = endTime.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const [data, setData] = useState({
        // first slide
        EventTitle: '',
        OrganizerName: '',
        EventType: null,
        ContentType: [],
        Tags: '',
        Privacy: null,
        // second slide
        InPerson: null,
        LocationName: '',
        EventLink: '',
        Address: '',
        locationSelected: false,
        LocationDetails: '',
        // third slide
        StartDay: initialDateFormat,
        RealStartDateTime: new Date(),
        StartTime: time1,
        EndDay: initialDateFormat,
        RealEndDateTime: new Date(),
        EndTime: endTime1,
        Registration: '',
        // fourth slide
        EventDescription: '',
        OrganizerEmail: '',
        OrganizerWebsite: '',
        EventImage: ''

    });

    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = (newData, final = false) => {
        setData(prev => ({ ...prev, ...newData }))

        if (final) {
            return;
        }
        setCurrentStep(prev => prev + 1)
    }

    const handlePrevStep = (newData) => {
        setData(prev => ({ ...prev, ...newData }))
        setCurrentStep(prev => prev - 1)
    }

    const steps = [
        <EventInformation next={handleNextStep} data={data} />,
        <MoreInformation next={handleNextStep} prev={handlePrevStep} data={data} />,
        <EventSchedule next={handleNextStep} prev={handlePrevStep} data={data} />,
        <EventDetails next={handleNextStep} prev={handlePrevStep} data={data} />
    ];


    return (
        <View>{steps[currentStep]}</View>
    );
}

export default function CreateNewEventScreen({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Form" component={UpdateEvent} options={{ headerShown: false }} />
            <Stack.Screen name="Preview" component={Preview} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

{/* <Stack.Navigator>
            <Stack.Screen name="Form" component={steps[currentStep]} options={{headerShown: false}}/>
            <Stack.Screen name="Preview" component={Preview} options={{headerShown: false}}/>
       </Stack.Navigator>*/}

const styles = StyleSheet.create({
    containerBack: {
        backgroundColor: '#FFFBF3',
        height: '100%',
        
    },
    TextStyle: {
        fontSize: 19,
        fontWeight: '500',
        color: '#09189F',
        marginLeft: 23,
        marginTop: 10,
    },
    containerStyle: {

    },
    pickerStyle: {
        borderWidth: 1,
        borderColor: '#C4C4C4',
        padding: 8,
        width: '80%',
        margin: 10

    },
    InputBox: {
        borderWidth: 0,
        borderBottomWidth: 1.5,
        borderColor: '#C4C4C4',
        paddingVertical: 8,
        width: '88%',
        marginLeft: 24,
        marginTop: 5,
        marginBottom: 12,
        fontSize: 16,
    },

    imageStyle: {

    },
    container: {
        width: '100%',
        height: '100%',
        
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#FFFBF2'

    },
    NewEventButton: {
        margin: 10
    },
    box: {
        width: '95%',
        height: '20%',
        padding: 5,
        margin: 10,
        flexDirection: 'row',
        flex: 1.2,

    },
    inner1: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    inner2: {
        flex: 4,
        justifyContent: 'center',
        
    },

    realImageStyle: {
        height: '100%',
        width: '100%',
        borderRadius: 40
 
    },
    scrollContainer: {
        paddingBottom: 90,
        zIndex: 0,
        height: '93%',

    },
    outerContainer: {
        flex: 1,
    },
    innerContainer: {
        marginTop: 0,
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
        left: 365,
        top: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    headerText2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: '38%',
    },
    nextContainer: {
        backgroundColor: '#ffffff',

        marginHorizontal: 50,
        marginTop: 5,
        width: '90%',
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
    backContainer: {
        backgroundColor: '#ffffff',

        marginHorizontal: 50,
        marginTop: 5,
        width: '65%',
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
    backContainerInit: {
        backgroundColor: '#ffffff',
        opacity: 0.33,
        marginHorizontal: 50,
        marginTop: 5,
        width: '65%',
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
    nextText: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 10,
        color: '#fab400',
    },
    backText: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 10,
        color: '#09189F',
    },
    errorMessage: {
        color: '#D8000C',
        flex: 5,
        fontSize: 14
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex:1,
    },
    containerPreview: {
        flex: 1,
    },
    topbar: {
        position: 'absolute',
        top: 0,
        width: Dimensions.get('window').width,
    },
    header: {
        backgroundColor: '#fff',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -2},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center'
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom:10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 20,
        //paddingBottom: Dimensions.get('window').height,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
      marginRight: 10,
      width: Dimensions.get('window').width - 100    
    },
    panelHost: {
      flexDirection: 'row',
      marginBottom: 10
    },
    panelDate: {
      flexDirection: 'row',
      marginBottom: 20
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    requiredField : {
        color: '#D8000C',
        fontSize: windowHeight / 46.3
    },
    counterStyle: {
        flex: 1,
        fontSize: 14
    },
    messageContainer: {
        flexDirection: 'row', 
        width: '88%', 
        marginLeft: 24
    }
})
