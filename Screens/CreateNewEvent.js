import React, {useRef,useEffect} from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, Image, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
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
import EventTypeSelector from '../objects/FormObjects/EventTypeSelector';
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
        .max(50, 'Event Title Must Be Less Than 50 Characters')
        .required()
        .label('Event Title'),
    OrganizerName: yup.string()
        .max(50, 'Organizer Name Must Be Less Than 50 Characters')
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
        .label('Location Name'),
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
            then: yup.string().test('scheme', 'Must select a real address', (value, context) => value === '')
        }),
        
    LocationDetails: yup.string()
    ,

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
    , 

})

const pageFourValidSchema = yup.object({
    // fourth slide
    EventDescription: yup.string()
        .required()
        .label('Event Description'),
    OrganizerEmail: yup.string()
    ,
    OrganizerWebsite: yup.string()
    ,

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
                                <Text style={{color: '#09189F', fontSize: 22 , marginLeft: 20, marginTop: 20, fontWeight: '500'}}>Event Information</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Gray-Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Gray-Progress-Bar.png')} />
                                <Image style={{ margin: 20, flex: 2 / 9 }} source={require('../assets/Gray-Progress-Bar.png')} />
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Event Title:
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.EventTitle !== '' || isFocused ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder='Eg: MProduct Interest Meeting'
                                    onChangeText={formikprops.handleChange('EventTitle')}
                                    value={formikprops.values.EventTitle}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.EventTitle && formikprops.errors.EventTitle}</Text>

                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Organizer Name:
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.OrganizerName !== '' || isFocused2 ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder='Organization (eg. MProduct) or you (Eg. Alex Jian)'
                                    onChangeText={formikprops.handleChange('OrganizerName')}
                                    value={formikprops.values.OrganizerName}
                                    onFocus={() => setFocus2(true)}
                                    onBlur={() => setFocus2(false)}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.OrganizerName && formikprops.errors.OrganizerName}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Main Event Category:
                                </Text>
                                    <EventTypeSelector 
                                        onChange={formikprops.setFieldValue}
                                        value={formikprops.values.EventType}

                                    />
                               
                                <Text style={styles.errorMessage}>{formikprops.touched.EventType && formikprops.errors.EventType}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Other Categories:
                                </Text>
                                <View style={{width: '88%', marginLeft: 20, marginTop: 10,  }}>
                                    <FieldArray name="ContentType" component={ContentTypeSelector} />
                                </View>
                                
                                {/*<ContentTypeSelector3
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.ContentType}
                                />*/}
                                <Text style={styles.errorMessage}>{formikprops.touched.ContentType && formikprops.errors.ContentType}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Privacy:
                                </Text>
                                <PrivacySelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.Privacy}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.Privacy && formikprops.errors.Privacy}</Text>
                            </View>
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
                                <Text style={{color: '#09189F', fontSize: 22 , marginLeft: 20, marginTop: 20, fontWeight: '500'}}>Location Information</Text>
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
                                </Text>
                                <InPersonSelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.InPerson}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.InPerson && formikprops.errors.InPerson}</Text>
                            </View>
                
                            <View style={styles.containerStyle}>
                            {formikprops.values.InPerson === 'In Person' &&
                                (<Text style={styles.TextStyle}>
                                    Location Name:
                                </Text>)
                            }
                                {formikprops.values.InPerson === 'In Person' &&
                                (<TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.LocationName !== '' || isFocused2 ? '#7b7b7b' : '#C4C4C4'}]}
                                    placeholder="Egs. Michigan Union, My House, etc. Can be TBA."
                                    onChangeText={formikprops.handleChange('LocationName')}
                                    value={formikprops.values.LocationName}
                                    onFocus={() => setFocus2(true)}
                                    onBlur={() => setFocus2(false)}
                                />)
                            }
                                {formikprops.values.InPerson === 'In Person' &&
                                (<Text style={styles.errorMessage}>{formikprops.touched.LocationName && formikprops.errors.LocationName}</Text>)
                                }
                            </View>
                            <View style={styles.containerStyle}>
                            {formikprops.values.InPerson === 'Virtual' &&
                                (<Text style={styles.TextStyle}>
                                    Event Link:
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
                                    onChangeText={formikprops.handleChange('LocationDetails')}
                                    value={formikprops.values.LocationDetails}
                                    onFocus={() => setFocus4(true)}
                                    onBlur={() => setFocus4(false)}
                                />)
                            }
                            {((formikprops.values.InPerson === 'In Person') || (formikprops.values.InPerson === 'Virtual')) &&
                                (<Text style={styles.errorMessage}>{formikprops.touched.LocationDetails && formikprops.errors.LocationDetails}</Text>)
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
                                </Text>
                                <EndDateSelector
                                    onChangeFormik={formikprops.setFieldValue}
                                    realStartDate={formikprops.values.RealStartDateTime}
                                    realEndDate={formikprops.values.RealEndDateTime}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.EndDay && formikprops.errors.EndDay}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={{fontSize: 20, color: '#09189F', marginLeft: 20, marginTop: 10, fontWeight: '500'}}>
                                    End Time:
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
                                </Text>
                                <TextInput
                                    style={[styles.InputBox, {borderColor: formikprops.values.EventDescription !== '' || isFocused ? '#7b7b7b' : '#C4C4C4'}]}
                                    multiline={true}
                                    placeholder='Describe your event here'
                                    onChangeText={formikprops.handleChange('EventDescription')}
                                    value={formikprops.values.EventDescription}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.EventDescription && formikprops.errors.EventDescription}</Text>
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

    const postToServer = () => { //post the event to the server
        /*
        fetch('https://retoolapi.dev/rJZk4j/events', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: values.EventTitle,
                Tags: values.Tags,
                Email: values.OrganizerEmail,
                Avatar: values.EventImage,
                Images: 'placeholder',
                Address: values.Address,
                Privacy: values.Privacy,
                Website: values.OrganizerWebsite,
                Invitees: '',
                Latitude: latlng.lat,
                Attendees: '',
                Longitude: latlng.lng,
                Organizer: values.OrganizerName,
                EndDayTime: values.EndTime,
                Description: values.EventDescription,
                LocationName: values.LocationName,
                EventLink: values.EventLink,
                MainCategory: values.EventType,
                Registration: values.Registration,
                StartDayTime: values.StartTime,
                InPersonVirtual: values.InPerson,
                OtherCategories: values.ContentType
            })
        }); 
        */
        console.log(myContext.user.id + 3);

        fetch(Globals.eventsURL + '/json/add', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.EventTitle,
                //hostId: myContext.user.id,
                hostId: 1,
                organizer: values.OrganizerName,
                locationName: values.LocationName,
                location: values.Address,
                latitude: values.Latitude,
                longitude: values.Longitude,
                description: values.EventDescription,
                startTime: "2021-08-01 19:00:00",
                endTime: "2021-08-01 22:00:00",
                privateEvent: values.Privacy!='Public',
                virtualEvent: values.InPerson!='In Person',
                registrationLink: values.Registration,
                mainCategoryId: 2,
                }
                )
        }); 
    }
    const postEventHandler = async () => {
        postToServer();
        // Navigate to map
        navigation.popToTop();
        navigation.dangerouslyGetParent().popToTop();
        navigation.dangerouslyGetParent().dangerouslyGetParent().navigate('Find');
        myContext.toggleShowNavBar(true);
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFBF2' }}>
            <View style={{ height: '93%' }}>
                <ScrollView contentContainerStyle={styles.container}>


                    <View style={{ flex: 1, borderBottomWidth: 1 }}>
                        <PreviewHeader navigation={navigation} />
                    </View>

                    <View style={styles.box}>
                        <View style={styles.inner1}>
                            <Image style={styles.realImageStyle} source={{uri: values.EventImage}} />
                        </View>
                        <View style={styles.inner2}>
                            <Text style={{fontSize: 24,fontWeight: '500', textAlign: 'center', textAlignVertical: 'center'}} adjustsFontSizeToFit={true} >{values.EventTitle}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2.5, flexDirection: 'column', borderBottomWidth: 0.2 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center' }}>
                                <Image style={{ flex: 1, marginLeft: '10%' }} source={require('../assets/Vector.png')} />
                                <Text style={{ flex: 9, textAlign: 'center', fontWeight: '500', color: '#FF8A00', fontSize: 16 }}>{values.OrganizerName}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'  }}>
                                <Image style={{ flex: 1, marginLeft: '10%' }} source={require('../assets/ContentType.png')} />
                                <Text style={{ flex: 9, textAlign: 'center', fontWeight: '500', color: '#FAB400', fontSize: 16 }}>{values.ContentType}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <Image style={{ resizeMode: 'contain', marginLeft: '30%' }} source={require('../assets/CalendarIcon.png')} />
                            </View>
                            <View style={{ flex: 9.5 }}>
                                <Text style={{ fontWeight: '500', color: '#0085FF', fontSize: 16 }}>{values.StartDay}, {values.StartTime} - {values.EndTime} ({values.InPerson})</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', paddingHorizontal: '5%', }}>
                            <View style={{ flex: 1 }}>
                                <Image style={{ resizeMode: 'contain', width: '80%', height: '80%' }} source={require('../assets/Save.png')} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Image style={{ resizeMode: 'contain', width: '80%', height: '80%' }} source={require('../assets/ImGoing.png')} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Image style={{ resizeMode: 'contain', width: '80%', height: '80%' }} source={require('../assets/Share.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 2, borderBottomWidth: 0.2, paddingHorizontal: '5%', }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Event Description</Text>
                        <Text style={{ fontSize: 16 }}>{values.EventDescription}</Text>
                    </View>
                    <View style={{ flex: 2, paddingHorizontal: '5%', }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Location</Text>
                        <Text style={{ fontSize: 16 }}>{values.LocationName}</Text>
                        <Text style={{ fontSize: 16 }}>{values.Address}</Text>
                    </View>
                    <View style={{ flex: 1, borderTopWidth: 0.2, paddingHorizontal: '5%', }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Registration</Text>
                        <Text style={{ fontSize: 16 }}>{values.Registration}</Text>
                    </View>
                    <View style={{ flex: 2, borderTopWidth: 0.2, paddingHorizontal: '5%', }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>More Info</Text>
                        <Text style={{ fontSize: 16 }}>Website: {values.OrganizerWebsite}</Text>
                        <Text style={{ fontSize: 16 }}>Email: {values.OrganizerEmail}</Text>
                    </View>


                </ScrollView>
            </View>
            <View style={{ flexDirection: 'row' }}>
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
        fontSize: 20,
        color: '#09189F',
        marginLeft: 20,
        marginTop: 10,
        fontWeight: '500'
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
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        padding: 8,
        width: '88%',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14
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
        left: 370,
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
        paddingLeft: '5%'

    }

})
