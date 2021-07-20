import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';

const PrivacySelector = ({onChange, value}) => {
    return (
        <RNPickerSelect
            onValueChange={(value) => onChange('Privacy', value)}
            value={value}

            items={[
                { label: 'Public', value: 'Public' },
                { label: 'Private', value: 'Private' },
            ]}
            style={pickerSelectStyles}
            placeholder={{
                label: 'Public/Private',
                value: null,
                
            }}
        />
    );
};

export default PrivacySelector;

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
