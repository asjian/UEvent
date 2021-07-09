import React, {useState} from 'react';
import ModalSelector from 'react-native-modal-selector-searchable';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, Image, ScrollView, Alert } from 'react-native';
import { onChange } from 'react-native-reanimated';


const EventTypeSelector = ({onChange, value}) => {

    const [textInputValue, setTextInputValue] = useState('');
    

        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Event Type'},
            { key: index++, label: 'Extracurricular' },
            { key: index++, label: 'Social' },
            { key: index++, label: 'Outdoor'}
            // etc...
            // Can also add additional custom keys which are passed to the onChange callback
            
        ];

        const handleInput = (option)=> { 
            setTextInputValue(option.label);
            onChange('EventType', option.label);
            
        };

        const handleTextInput = () => {
            console.log(textInputValue);
        }

        const full = () => {
            handleInput;
            handleTextInput;
        }
        
        
        return (
            <View style={{flex:1, justifyContent:'space-around', padding:10}}>
                
                <ModalSelector
                    data={data}
                    supportedOrientations={['portrait']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={handleInput}
                    
                    
                    >
                   

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                        editable={false}
                        placeholder="Egs. Extracurricular, Social, etc."
                        value={value}
                        />

                </ModalSelector>
            </View>
        );
    
}

// export
export default EventTypeSelector;
