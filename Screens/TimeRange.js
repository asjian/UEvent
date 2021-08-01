import React, {useState} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,ScrollView,Alert,Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimeRange({navigation}) {
    const backParams = {
        TimeRange: navigation.getParam('TimeRange'),
    }
    const [startDate,setStartDate] = useState(new Date());
    let dayEnd = new Date();
    dayEnd.setDate(dayEnd.getDate()+1);
    const [endDate,setEndDate] = useState(dayEnd);
    const [startTime,setStartTime] = useState(new Date());
    const [endTime,setEndTime] = useState(new Date());

    const [show1,setShow1] = useState(false);
    const [show2,setShow2] = useState(false);
    const [show3,setShow3] = useState(false);
    const [show4,setShow4] = useState(false);

    const dateFormatter = (dateString) => {
        console.log(dateString);
        return (
        <Text style = {styles.dateText}>{dateString.substring(0,3)+', '+dateString.substring(4,dateString.indexOf(':')-8)+', '+
        dateString.substring(dateString.indexOf(':')-7,dateString.indexOf(':')-3)} </Text>
        );
    }
    const timeFormatter = (timeString) => {
        const startIndex = timeString.indexOf(':') -2;
        let hour = parseInt(timeString.substring(startIndex,startIndex+2));
        let post = 'AM';
        if(hour > 12) {
            post = 'PM';
            hour -= 12;
        }
        else if(hour == 0) {
            hour = 12;
        }
        return (
            <Text style = {styles.dateText}>{hour.toString() + timeString.substring(startIndex+2,startIndex+5) + ' ' + post}</Text>
        );
    }
    const backHandler = () => {
        navigation.navigate('DateRange',backParams);
    }
    return (
        <View style = {styles.container}>
           <View style = {styles.headerContainer}>
                <TouchableOpacity onPress = {backHandler}>
                    <Text style = {styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style = {styles.headerText}>Custom</Text>
            </View>
            <Text style = {{marginBottom: 50}}></Text>
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
            <Text style = {{marginBottom: 30}}></Text>
            <View style = {styles.pickerContainer}>
                <TouchableOpacity onPress = {() => setShow3(true)}>
                        <Text style = {styles.labelText}>Start Time</Text>
                        <Text>{timeFormatter(startTime.toString())}</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.pickerContainer}>
                <TouchableOpacity onPress = {() => setShow4(true)}>
                        <Text style = {styles.labelText}>End Time</Text>
                        <Text>{timeFormatter(endTime.toString())}</Text>
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
            <Modal visible = {show3} transparent = {true} animationType = 'slide'>
                <View style = {styles.dateModal}>
                    <TouchableOpacity onPress = {()=>setShow3(false)}>
                        <View style = {{backgroundColor:'#d7d7d7',alignItems:'flex-end',width:'100%'}}>
                            <Text style = {{fontSize:18,color:'#0085ff',paddingVertical:8,marginHorizontal:15}}>Done</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                        mode = "time"
                        value = {startTime}
                        onChange = {(event,selectedTime) => setStartTime(selectedTime)}
                    />
                </View>
            </Modal>
            <Modal visible = {show4} transparent = {true} animationType = 'slide'>
                <View style = {styles.dateModal}>
                    <TouchableOpacity onPress = {()=>setShow4(false)}>
                        <View style = {{backgroundColor:'#d7d7d7',alignItems:'flex-end',width:'100%'}}>
                            <Text style = {{fontSize:18,color:'#0085ff',paddingVertical:8,marginHorizontal:15}}>Done</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                        mode = "time"
                        value = {endTime}
                        onChange = {(event,selectedTime) => setEndTime(selectedTime)}
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
        marginBottom: 25,
    },
    backText: {
        fontWeight:'bold',
        fontSize: 18,
        color: '#0085ff',
        left: 23,
        marginRight: 112,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 15,
    },
    introText: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 50,
        marginLeft: 23,
        marginBottom: 40,
    },
    labelText: {
        fontSize: 17,
        fontWeight: '500',
        opacity: 0.75,
        marginBottom: 5,
    },
    dateText: {
        fontSize: 21,
        fontWeight: '600',
        color: '#09189E',
    },
    dateModal: {
        height: '30%',
        marginTop: 'auto',
        backgroundColor: 'white',
    },
})
