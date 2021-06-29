import React, {useState} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,ScrollView,Alert,Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimeRange({navigation}) {
    const backParams = {
        Categories: navigation.getParam('Categories'),
        TimeRange: navigation.getParam('TimeRange'),
        OtherFilters: navigation.getParam('OtherFilters'),
    }
    const [startDate,setStartDate] = useState(new Date());
    let dayEnd = new Date();
    dayEnd.setDate(dayEnd.getDate()+1);
    const [endDate,setEndDate] = useState(dayEnd);
    const [duration,setDuration] = useState(null);
    const [show1,setShow1] = useState(false);
    const [show2,setShow2] = useState(false);
    const [show3,setShow3] = useState(false);

    const dateFormatter = (dateString) => {
        return (
        <Text style = {styles.dateText}>{dateString.substring(0,3)+', '+dateString.substring(4,dateString.indexOf(':')-8)+', '+
        dateString.substring(dateString.indexOf(':')-7,dateString.indexOf(':')-3)} </Text>
        );
    }
    const backHandler = () => {
        backParams.TimeRange.startDate = startDate;
        backParams.TimeRange.endDate = endDate;
        backParams.TimeRange.duration = duration;
        navigation.navigate('Search',backParams);
    }
    return (
        <View style = {styles.container}>
           <View style = {styles.headerContainer}>
                <TouchableOpacity onPress = {backHandler}>
                    <Text style = {styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style = {styles.headerText}>Time Range</Text>
            </View>
            <View style = {styles.pickerContainer}>
                <TouchableOpacity onPress = {() => setShow1(true)}>
                        <Text style = {styles.labelText}>Start Date</Text>
                        {dateFormatter(startDate.toString())}
                </TouchableOpacity>
            </View>
            <View style = {styles.pickerContainer}>
                <TouchableOpacity onPress = {() => setShow2(true)}>
                        <Text style = {styles.labelText}>End Date</Text>
                        {dateFormatter(endDate.toString())}
                </TouchableOpacity>
            </View>
            <Modal visible = {show1} transparent = {true} animationType = 'slide'>
                <View style = {styles.dateModal}>
                    <TouchableOpacity onPress = {()=>setShow1(false)}>
                        <View style = {{backgroundColor:'#d7d7d7',alignItems:'flex-end',width:'100%'}}>
                            <Text style = {{fontSize:18,color:'#0085ff',paddingVertical:8,marginHorizontal:15}}>Done</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                        mode = "date"
                        value = {startDate}
                        onChange = {(event,selectedDate) => setStartDate(selectedDate)}
                        minimumDate = {new Date()}
                    />
                </View>
            </Modal>
            <Modal visible = {show2} transparent = {true} animationType = 'slide'>
                <View style = {styles.dateModal}>
                    <TouchableOpacity onPress = {()=>setShow2(false)}>
                        <View style = {{backgroundColor:'#d7d7d7',alignItems:'flex-end',width:'100%'}}>
                            <Text style = {{fontSize:18,color:'#0085ff',paddingVertical:8,marginHorizontal:15}}>Done</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                        mode = "date"
                        value = {endDate}
                        onChange = {(event,selectedDate) => setEndDate(selectedDate)}
                        minimumDate = {new Date()}
                    />
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffbf2',
    },
    headerContainer: {
        flexDirection:'row',
        marginTop: 40,
        alignItems: 'center',
    },
    pickerContainer: {
        marginLeft: 23,
        marginTop: 40,
        marginBottom: 10, 
    },
    backText: {
        fontWeight:'bold',
        fontSize: 18,
        color: '#0085ff',
        left: 23,
        marginRight: 95,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 15,
    },
    labelText: {
        fontSize: 17,
        fontWeight: '500',
        opacity: 0.75,
    },
    dateText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#09189E',
    },
    dateModal: {
        height: '30%',
        marginTop: 'auto',
        backgroundColor: 'white',
    },
})