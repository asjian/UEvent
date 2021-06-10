import React from 'react';
import { SafeAreaView,View, Text, Button, StyleSheet, TextInput, Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import CheckBox from '@react-native-community/checkbox';

// Component pIckers
const PrivacyPicker = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Public', value: 'public'},
      {label: 'Private', value: 'private'}
    ]);
  
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='Public/Private'
        dropDownContainerStyle={{backgroundColor: '#fff'}}
      />
    );
  }
  
  const InPersonPicker = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'In Person', value: 'inperson'},
      {label: 'Online', value: 'online'},
      {label: 'TBA', value: 'tba'}
    ]);
  
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='In Person/Online/TBA'
        dropDownContainerStyle={{backgroundColor: '#fff'}}
      />
    );
  }

  const StartDatePicker = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'To be added', value: 'tba'}
    ]);
  
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='Start Date'
        dropDownContainerStyle={{backgroundColor: '#fff'}}
      />
    );
  }
  
  const StartTimePicker = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'To be added', value: 'tba'}
    ]);
  
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='Eg: 7:30'
        dropDownContainerStyle={{backgroundColor: '#fff'}}
      />
    );
  }

  const EndDayPicker = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'To be added', value: 'tba'}
    ]);
  
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='End Date'
        dropDownContainerStyle={{backgroundColor: '#fff'}}
      />
    );
  }

  const EndTimePicker = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'To be added', value: 'tba'}
    ]);
  
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='Eg: 9:30 PM'
        dropDownContainerStyle={{backgroundColor: '#fff'}}
      />
    );
  }

  const FirstCheckBox = () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
         <CheckBox 
             disabled={false}
             value={toggleCheckBox}
             onValueChange={(newValue) => setToggleCheckBox(newValue)}
         />
    );
}

// Screens
function EventInformation({navigation}) {
    return (
        <SafeAreaView>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    Event Title:
                </Text>
                <TextInput 
                    style={styles.InputBox}
                    placeholder='Eg: MProduct Interest Meeting'
                />
            </View>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    Organizer Name:
                </Text>
                <TextInput 
                    style={styles.InputBox}
                    placeholder='Organization (eg. MProduct) or you (Eg. Alex Jian)'
                />
            </View>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    Event Type:
                </Text>
                <TextInput 
                    style={styles.InputBox}
                    placeholder='Egs: Extracurricular, Social, etc.'
                />
            </View>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    Content Type:
                </Text>
                <TextInput 
                    style={styles.InputBox}
                    placeholder='Egs: UX Design, House Party, etc.'
                />
            </View>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    Tags (10 max):
                </Text>
                <TextInput 
                    style={styles.InputBox}
                    placeholder='Optional, but boosts discoverability. Eg. #design'
                />
            </View>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    Privacy:
                </Text>
                <PrivacyPicker />
            </View>
            <View>
                <Button  
                    title = "next"
                    onPress = {() => navigation.navigate('MoreInformation')}
                />
            </View>
        </SafeAreaView>

    );
}
// Second Slide
function MoreInformation({navigation}) {
    return (
        <SafeAreaView>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    In Person or Online?
                </Text>
                <InPersonPicker />
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
                    <Button 
                        title = "back"
                        onPress = {() => navigation.navigate('EventInformation')}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button  
                        title = "next"
                        onPress = {() => navigation.navigate('EventSchedule')}
                    />
                </View>
               
            </View>
        </SafeAreaView>

    );
}

// Third Slide 
function EventSchedule({navigation}) {
    return (
        <SafeAreaView>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    Start Day:
                </Text>
                <StartDatePicker />
            </View>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    Start Time:
                </Text>
                <StartTimePicker/>
            </View>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    End Day:
                </Text>
                <EndDayPicker />
            </View>
            <View style={styles.containerStyle}>
                <Text style={styles.TextStyle}> 
                    End Time:
                </Text>
                <EndTimePicker/>
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
                    <Button 
                        title = "back"
                        onPress = {() => navigation.navigate('MoreInformation')}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button  
                        title = "next"
                        onPress = {() => navigation.navigate('EventDetails')}
                    />
                </View>
               
            </View>
        </SafeAreaView>


    );
}

// Fourth Slide
function EventDetails({navigation}) {
    return (
        <SafeAreaView>
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
                    <Button 
                        title = "back"
                        onPress = {() => navigation.navigate('EventSchedule')}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button  
                        title = "Preview"
                        onPress = {() => navigation.navigate('Preview')}
                    />
                </View>
               
            </View>
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
                    <Button 
                        title = "Back"
                        onPress = {() => navigation.navigate('EventDetails')}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button  
                        title = "Post Event"
                        onPress = {() => navigation.navigate('HostNavBar')}
                    />
                </View>
               
            </View>

        </SafeAreaView>
    );
} 
    


// switch navigation

const CreateNewEventSlides = createSwitchNavigator(
    {
        EventInformation,
        MoreInformation,
        EventDetails,
        EventSchedule,
        Preview
        
    },
    {initialRouteName: 'EventInformation'}
);

const CreateNewEventContainer = createAppContainer(CreateNewEventSlides);

export default function CreateNewEventScreen({navigation}) {
    return (
        <CreateNewEventContainer/>
    )
}

const styles = StyleSheet.create({
    TextStyle : { 
        fontSize: 20,
        color: '#0000ff',
        margin: 10
    },

    containerStyle : {
        
    },

    InputBox : {
        borderWidth: 1,
        borderColor: '#777',
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
        
    }
})
