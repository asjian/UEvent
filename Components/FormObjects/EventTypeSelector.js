import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';
import Globals from '../../../GlobalVariables';



const EventTypeSelector = ({onChange, value}) => {
    const [isFocused3, setFocus3] = useState(false);
    return (
        <RNPickerSelect
            onValueChange={(value) => onChange('EventType', value)}
            value={value}

            items={[
                { label: 'Parties', value: 'Parties' },
                { label: 'Career', value: 'Career' },
                { label: 'Community', value: 'Community' },
                { label: 'Greek Life', value: 'Greek Life' },
                { label: 'Games', value: 'Games' },
                { label: 'Activism', value: 'Activism' },
                { label: 'Art/Design', value: 'Art/Design' },
                { label: 'Performance', value: 'Performance' },
                { label: 'Exhibition', value: 'Exhibition' },
                { label: 'Science/Tech', value: 'Science/Tech' },
                { label: 'Language/Literature', value: 'Language/Literature' },
                { label: 'Other', value: 'Other' }
            ]}
            style={{inputIOS: {borderWidth: 1,
                borderColor: value !== null || isFocused3 ? '#7b7b7b' : '#C4C4C4',
                padding: Globals.HR(8),
                width: '88%',
                marginLeft: Globals.WR(20), 
                marginTop: Globals.HR(10),
                marginBottom: Globals.HR(10),
                flex: 1,
                fontSize: Globals.HR(14)}}}
            onOpen={() => setFocus3(true)}
            onClose={() => setFocus3(false)}
            placeholder={{
                label: 'Egs. Extracurricular, Social, etc.',
                value: null,
                
            }}

        />
    );
};

export default EventTypeSelector;

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
        borderWidth: 1,
        borderColor: '#C4C4C4',
        padding: 8,
        width: '80%',
        marginLeft: 20,
        marginTop: 10,
        flex: 1
    },
    inputAndroid: {
        borderWidth: 1,
        borderColor: '#C4C4C4',
        padding: 8,
        width: '80%',
        marginLeft: 20,
        marginTop: 10,
        flex: 1
    },
  });
