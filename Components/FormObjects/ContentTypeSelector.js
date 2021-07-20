import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';

const ContentTypeSelector = ({onChange, value}) => {
    return (
        <RNPickerSelect
            onValueChange={(value) => onChange('ContentType', value)}
            value={value}

            items={[
                { label: 'Software', value: 'Software' },
                { label: 'Research', value: 'Research' },
                { label: 'Greek Life', value: 'Greek Life' },
                { label: 'Professional', value: 'Professional' },
                { label: 'Consulting', value: 'Consulting' },
                { label: 'Blockchain', value: 'Blockchain' },
                { label: 'Finance', value: 'Finance' },
                { label: 'UX Design', value: 'UX Design' }
            ]}
            style={pickerSelectStyles}
            placeholder={{
                label: 'Egs. UX Design, House Party, etc.',
                value: null,
                
            }}
        />
    );
};

export default ContentTypeSelector;

const styles = StyleSheet.create({
    InputBox: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        padding: 8,
        width: '80%',
        margin: 10
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        padding: 8,
        width: '80%',
        margin: 10
    },
    inputAndroid: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        padding: 8,
        width: '80%',
        margin: 10
    },
  });
