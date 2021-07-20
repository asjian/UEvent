import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';

const InPersonSelector = ({onChange, value}) => {
    return (
        <RNPickerSelect
            onValueChange={(value) => onChange('InPerson', value)}
            value={value}

            items={[
                { label: 'In Person', value: 'In Person' },
                { label: 'Online', value: 'Online' },
                { label: 'TBA', value: 'TBA' }
            ]}
            style={pickerSelectStyles}
            placeholder={{
                label: 'In Person/Online/TBA',
                value: null,
                
            }}
        />
    );
};

export default InPersonSelector;

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
