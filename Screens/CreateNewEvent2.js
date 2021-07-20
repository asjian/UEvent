import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useContext } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useNavigation } from '@react-navigation/native'
import { ErrorMessage, Field, Formik, } from 'formik';
import CheckBox from '@react-native-community/checkbox';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppContext from '../objects/AppContext';
//import SearchableDropdown from 'react-native-searchable-dropdown';
import EventTypeSelector from '../objects/FormObjects/EventTypeSelector';
import PrivacySelector from '../objects/FormObjects/PrivacySelector';
import ContentTypeSelector from '../objects/FormObjects/ContentTypeSelector';
import InPersonSelector from '../objects/FormObjects/InPersonSelector';
import StartDateSelector from '../objects/FormObjects/StartDateSelector';
import EndDateSelector from '../objects/FormObjects/EndDateSelector';
import StartTimeSelector from '../objects/FormObjects/StartTimeSelector';
import EndTimeSelector from '../objects/FormObjects/EndTimeSelector';
import TimeInAdvanceSelector from '../objects/FormObjects/TimeInAdvanceSelector';
import ImagePickerExample from '../objects/FormObjects/ImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Globals from '../../GlobalVariables';
//import { StartDateSelector2 } from '../objects/FormObjects/StartDateSelector2';
import * as yup from 'yup';
import { max } from 'react-native-reanimated';

// Header
function Header({ navigation }) {
    const myContext = useContext(AppContext);
    // event handler function
    const closeHandler = () => {
        myContext.toggleShowNavBar(true);
        navigation.goBack();
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
        myContext.toggleShowNavBar(true);
        navigation.dangerouslyGetParent().goBack();
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
        .label('Event Type')
        .nullable(),
    ContentType: yup.string()
        .required()
        .label('Content Type')
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
        .label('In Person or Online')
        .nullable(),
    LocationName: yup.string()
        .required(),
    Address: yup.string()
        .required(),
    LocationDetails: yup.string()
    ,

})

const pageThreeValidSchema = yup.object({
    // third slide
    StartDay: yup.string()
        .required()
        .label('Start Day'),
    StartTime: yup.string()
        .required()
        .label('Start Time'),
    EndDay: yup.string()
        .required()
        .label('End Day'),
    EndTime: yup.string()
        .required()
        .label('End Time'),
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

    

    return (
        <SafeAreaView style={styles.containerBack}>

            <Formik
                initialValues={props.data}
                onSubmit={handleSubmit}
                /*validationSchema={pageOneValidSchema}*/
            >
                {(formikprops) => (
                    <View>
                        <KeyboardAwareScrollView style={styles.scrollContainer}>
                            <View>
                                <Header navigation={navigation} />
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
                                    style={styles.InputBox}
                                    placeholder='Eg: MProduct Interest Meeting'
                                    onChangeText={formikprops.handleChange('EventTitle')}
                                    value={formikprops.values.EventTitle}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.EventTitle && formikprops.errors.EventTitle}</Text>

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
                                <Text style={styles.errorMessage}>{formikprops.touched.OrganizerName && formikprops.errors.OrganizerName}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Event Type:
                                </Text>
                                <EventTypeSelector 
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.EventType}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.EventType && formikprops.errors.EventType}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Content Type:
                                </Text>
                                <ContentTypeSelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.ContentType}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.ContentType && formikprops.errors.ContentType}</Text>
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
                                <Text style={styles.errorMessage}>{formikprops.touched.Tags && formikprops.errors.Tags}</Text>
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
                            
                            
                        </KeyboardAwareScrollView>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>

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

    const [key,setKey] = useState('AIzaSyQ71aMba5yieWm7Lqp4KXs6oIOKrwPUI0m');
    const getKey = () => {
        console.log('getting key...')
        const fetchurl = Globals.apiKeysURL;
        fetch(fetchurl + '?KeyName=LocationAutocomplete')
        .then((response) => response.json())
        .then((json) => {setKey(json[0].ApiKey)})
        .catch((error) => {console.error(error)});
    }
    if(key == 'AIzaSyQ71aMba5yieWm7Lqp4KXs6oIOKrwPUI0m') {
        getKey();
    }

    const [token,setToken] = useState('adfhsdoffvio');
    const createSessionToken  = () => {
        let uuid = require("uuid");
        let newToken = uuid.v4();
        console.log(newToken);
        setToken(newToken);
    }
    const handleSubmit = (values) => {
        props.next(values);
    };
    return (
        <SafeAreaView style={styles.containerBack}>
            <Formik
                initialValues={props.data}
                onSubmit={handleSubmit}
                validationSchema={pageTwoValidSchema}
            >
                {(formikprops) => (
                    <View >
                        <KeyboardAwareScrollView style={styles.scrollContainer}>
                            <Header navigation={navigation} />
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
                                <Text style={styles.TextStyle}>
                                    Location Name:
                                </Text>
                                <TextInput
                                    style={styles.InputBox}
                                    placeholder="Egs. Michigan Union, My House, etc. Can be TBA."
                                    onChangeText={formikprops.handleChange('LocationName')}
                                    value={formikprops.values.LocationName}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.LocationName && formikprops.errors.LocationName}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Address:
                                </Text>
                                <GooglePlacesAutocomplete
                                    query={{
                                        key: key,
                                        sessiontoken: token,
                                        language: 'en',
                                        location: '42.278, -83.738',
                                        radius: '25000',
                                        //strictbounds: true,
                                    }}
                                    onPress={(data, details = null) => {
                                        // 'details' is provided when fetchDetails = true
                                        createSessionToken();
                                        formikprops.setFieldValue('Address',data.description);
                                    }}
                                    autoFillOnNotFound = {true}
                                    //onNotFound
                                    //onFail
                                    minLength = {4}
                                    placeholder='Search Locations'
                                    textInputProps = {{
                                        onFocus: () => createSessionToken(),
                                    }}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.Address && formikprops.errors.Address}</Text>
                            </View>
                            <View style={{ width: '20%' }, { height: '20%' }}>
                                <Image style={{ resizeMode: 'contain' }, { width: '60%' }, { height: '100%' }} source={require('../assets/AA-Map.png')} />
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
                                <Text style={styles.errorMessage}>{formikprops.touched.LocationDetails && formikprops.errors.LocationDetails}</Text>
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
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.StartDay}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.StartDay && formikprops.errors.StartDay}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    Start Time:
                                </Text>
                                <StartTimeSelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.StartTime}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.StartTime && formikprops.errors.StartTime}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    End Day:
                                </Text>
                                <EndDateSelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.EndDay}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.EndDay && formikprops.errors.EndDay}</Text>
                            </View>
                            <View style={styles.containerStyle}>
                                <Text style={styles.TextStyle}>
                                    End Time:
                                </Text>
                                <EndTimeSelector
                                    onChange={formikprops.setFieldValue}
                                    value={formikprops.values.EndTime}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.EndTime && formikprops.errors.EndTime}</Text>
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
                                    style={styles.InputBox}
                                    multiline={true}
                                    placeholder='Describe your event here'
                                    onChangeText={formikprops.handleChange('EventDescription')}
                                    value={formikprops.values.EventDescription}
                                />
                                <Text style={styles.errorMessage}>{formikprops.touched.EventDescription && formikprops.errors.EventDescription}</Text>
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
                                <Text style={styles.errorMessage}>{formikprops.touched.OrganizerEmail && formikprops.errors.OrganizerEmail}</Text>
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

    const postEventHandler = () => {
        //get lat lng from address
        
        const [key,setKey] = useState('AIzaSyQ71aMba5yieWm7Lqp4KXs6oIOKrwPUI0m');
        const getKey = () => {
            console.log('getting key...')
            const fetchurl = Globals.apiKeysURL;
            fetch(fetchurl + '?KeyName=Geocoder')
            .then((response) => response.json())
            .then((json) => {setKey(json[0].ApiKey)})
            .catch((error) => {console.error(error)});
        }
        if(key == 'AIzaSyQ71aMba5yieWm7Lqp4KXs6oIOKrwPUI0m') {
            getKey();
        }
        Geocoder.init(key);

        const [latlng,setLatLng] = useState(null);
        Geocoder.from(values.Address)
		.then(json => {
			var location = json.results[0].geometry.location;
			setLatLng(location);
		})
		.catch(error => console.warn(error));
        
        // POST to server
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
                MainCategory: values.EventType,
                Registration: values.Registration,
                StartDayTime: values.StartTime,
                InPersonVirtual: values.InPerson,
                OtherCategories: 'placeholder'
            })
        });
        // Navigate to map
        navigation.popToTop();
        navigation.dangerouslyGetParent().popToTop();
        navigation.dangerouslyGetParent().dangerouslyGetParent().navigate("Find");
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFBF2' }}>
            <View style={{ height: '95%' }}>
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
        margin: 10,
        fontWeight: 'bold'
    },

    containerStyle: {

    },

    InputBox: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        padding: 8,
        width: '80%',
        margin: 10
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
        height: '90%'
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
