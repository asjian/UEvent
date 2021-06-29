import React, {Component} from 'react';
import ModalSelector from 'react-native-modal-selector-searchable';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, Image, ScrollView, Alert } from 'react-native';


class ContentTypeSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textInputValue: ''
        }
    }

    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Content Type' },
            { key: index++, label: 'House Party' },
            { key: index++, label: 'UX Design' },
            { key: index++, label: 'Engieering'},
            { key: index++, label: 'Consulting'},
            { key: index++, label: 'Blockchain'},
            { key: index++, label: 'Research'},
            { key: index++, label: 'Software'},
            { key: index++, label: 's'},
            { key: index++, label: 'f'},
            { key: index++, label: 'a'},
            { key: index++, label: 'i'},
            { key: index++, label: 'p'},
            { key: index++, label: '00'},
            { key: index++, label: '01'},
            { key: index++, label: '02'},
            { key: index++, label: '03'},
            { key: index++, label: '04'},
            { key: index++, label: '05'},
            { key: index++, label: '06'},
            { key: index++, label: '07'},
            { key: index++, label: '08'},
            { key: index++, label: '09'}
            // etc...
            // Can also add additional custom keys which are passed to the onChange callback
            
        ];

        return (
            <View style={{flex:1, justifyContent:'space-around', padding:10}}>

                <ModalSelector
                    data={data}
                    supportedOrientations={['portrait']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ this.setState({textInputValue:option.label})}}>

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                        editable={false}
                        placeholder="Egs. UX Design, House Party, etc."
                        value={this.state.textInputValue} />

                </ModalSelector>
            </View>
        );
    }
}

// export
export default ContentTypeSelector;