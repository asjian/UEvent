import React, {Component} from 'react';
import ModalSelector from 'react-native-modal-selector';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, Image, ScrollView, Alert } from 'react-native';


class InPersonSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textInputValue: ''
        }
    }

    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'In Person or Online?' },
            { key: index++, label: 'In Person' },
            { key: index++, label: 'Online' },
            { key: index++, label: 'TBA' }
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
                        placeholder="In Person/Online/TBA"
                        value={this.state.textInputValue} />

                </ModalSelector>
            </View>
        );
    }
}

// export
export default InPersonSelector;