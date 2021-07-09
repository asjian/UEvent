import React, {useState} from 'react';
import ModalSelector from 'react-native-modal-selector';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, Image, ScrollView, Alert } from 'react-native';


const PrivacySelector = ({onChange, value}) => {

        const [textInputValue, setTextInputValue] = useState('');

    
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Privacy' },
            { key: index++, label: 'Public' },
            { key: index++, label: 'Private' },
            // etc...
            // Can also add additional custom keys which are passed to the onChange callback
        ];

        const handleInput = (option)=> { 
            setTextInputValue(option.label);
            onChange('Privacy', option.label);
            
        };

        return (
            <View style={{flex:1, justifyContent:'space-around', padding:10}}>

                <ModalSelector
                    data={data}
                    supportedOrientations={['portrait']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={handleInput}>

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                        editable={false}
                        placeholder="Public/Private"
                        value={value} 
                        
                    />

                </ModalSelector>
            </View>
        );
    }

// export
export default PrivacySelector;
