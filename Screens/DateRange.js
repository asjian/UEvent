import React, {useState} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,ScrollView,} from 'react-native';
import DateButton from '../objects/dateButton';

export default function DateRange({navigation}) {
    const backParams = {
        SearchType: navigation.getParam('SearchType'),
        SearchText: navigation.getParam('SearchText'),
        Categories: navigation.getParam('Categories'),
        TimeRange: navigation.getParam('TimeRange'),
        OtherFilters: navigation.getParam('OtherFilters'),
        CloseBotSheet: navigation.getParam('CloseBotSheet'),
    }
    const [value, setValue] = useState(backParams.TimeRange.value);

    const setParams = (startString,endString) => {
        backParams.TimeRange.startDate = startString.substring(0,15);
        backParams.TimeRange.endDate = endString.substring(0,15);
        backParams.TimeRange.startTime = startString.substring(16,24);
        backParams.TimeRange.endTime = endString.substring(16,24);
    }
    const setBounds = (value) => {
        const today = new Date();
        if(value == 'Today') {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate()+1);
            tomorrow.setHours(3,0,0,0); //3 AM bc of late-night partying
            setParams(today.toString(),tomorrow.toString());
        }
        else if(value == 'Tomorrow') {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate()+1);
            tomorrow.setHours(0,0,0,0);
            const dayAfter = new Date(tomorrow);
            dayAfter.setDate(dayAfter.getDate()+1);
            dayAfter.setHours(3,0,0,0);
            setParams(tomorrow.toString(),dayAfter.toString());
        }
        else if(value == 'This Week') {
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate()+8);
            nextWeek.setHours(3,0,0,0);
            setParams(today.toString(),nextWeek.toString());
        }
        else if(value == 'This Weekend') { //Friday 8:00PM through Sunday 11:59PM
            const dayOfWeek = today.getDay();
            const startOfWeekend = new Date(today);
            const endOfWeekend = new Date(today);

            if(dayOfWeek == 0 || dayOfWeek == 6) { //Sunday or Saturday
                const endOffset = (7-dayOfWeek)%7;
                endOfWeekend.setDate(endOfWeekend.getDate()+endOffset);
                endOfWeekend.setHours(23,59,0,0);
                setParams(startOfWeekend.toString(),endOfWeekend.toString());
            }
            else if(dayOfWeek == 5) {//Friday 
                if(today.getHours() < 20)
                    startOfWeekend.setHours(20,0,0,0);

                endOfWeekend.setDate(endOfWeekend.getDate()+2);
                endOfWeekend.setHours(23,59,0,0);
                setParams(startOfWeekend.toString(),endOfWeekend.toString());
            }
            else { //Monday through Thursday
                const startOffset = 5-dayOfWeek;
                startOfWeekend.setDate(startOfWeekend.getDate()+startOffset);
                startOfWeekend.setHours(20,0,0,0);
                endOfWeekend.setDate(startOfWeekend.getDate()+2);
                endOfWeekend.setHours(23,59,0,0);
                setParams(startOfWeekend.toString(),endOfWeekend.toString());
            }
        }
        else if(value == 'Anytime') {
            backParams.TimeRange.startDate = '';
            backParams.TimeRange.endDate = '';
            backParams.TimeRange.startTime = '';
            backParams.TimeRange.endTime = '';
        }
    }
    const selectHandler = () => {
        backParams.TimeRange.value = value;
        setBounds(value);
        backParams.SearchType = 'filter';
        if(value == 'Anytime') {
            if(backParams.Categories.length == 0) {
                if(backParams.SearchText == '')
                    backParams.SearchType = 'none';
                else
                    backParams.SearchType = 'text';
            }
            else    
                backParams.SearchType = 'filter';
        }
        navigation.navigate('MainScreen',backParams);
    }
    const pressHandler = (name) => {
        setValue(name);
    }
    const customPressHandler = (name) => {
        setValue(name);
        backParams.TimeRange.value = name;
        navigation.navigate('TimeRange',backParams);
    }
    const backHandler = () => {
        navigation.navigate('MainScreen',backParams);
    }
    return (
        <View style = {styles.container}>
           <View style = {styles.headerContainer}>
                <TouchableOpacity onPress = {backHandler}>
                    <Text style = {styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style = {styles.headerText}>Date/Time</Text>
            </View>
            <Text style = {styles.introText}>Show Events Happening:</Text>
            <View style = {styles.buttonContainer}>

            <DateButton name = 'Anytime' value = {value} pressHandler = {pressHandler}/>
            <DateButton name = 'Today' value = {value} pressHandler = {pressHandler}/>
            <DateButton name = 'Tomorrow' value = {value} pressHandler = {pressHandler}/>
            <DateButton name = 'This Week' value = {value} pressHandler = {pressHandler}/>
            <DateButton name = 'This Weekend' value = {value} pressHandler = {pressHandler}/>
            <DateButton name = 'Custom Date/Time Range' value = {value} pressHandler = {customPressHandler}/>

            </View>

            <TouchableOpacity onPress = {selectHandler}>
                <View style = {[styles.selectContainer]}>
                    <Text style = {styles.selectText}>Select</Text>
                </View>
            </TouchableOpacity>
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
        marginBottom: 40,
    },
    backText: {
        fontWeight:'bold',
        fontSize: 18,
        color: '#0085ff',
        left: 23,
        marginRight: 108,
    },
    headerText: {
        fontWeight: '600',
        fontSize: 22,
        marginVertical: 15,
    },
    introText: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 20.4,
        marginBottom: 60,
    },
    buttonContainer: {
        marginLeft: 23,
    },
    selectContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        marginHorizontal: 58,
        marginTop: 120,
        width: '70%',
        alignItems: 'center',
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
    selectText: {
        fontWeight: 'bold',
        fontSize: 26,
        paddingVertical: 10,
        color: '#fab400',
    },
})