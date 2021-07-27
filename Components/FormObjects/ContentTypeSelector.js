import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import Select2 from "react-native-select-two"

const mockData = [
    { id: 'Parties', name: 'Parties' },
    { id: 'Career', name: 'Career' },
    { id: 'Community', name: 'Community' },
    { id: 'Greek Life', name: 'Greek Life' },
    { id: 'Games', name: 'Games' },
    { id: 'Activism', name: 'Activism' },
    { id: 'Art/Design', name: 'Art/Design' },
    { id: 'Performance', name: 'Performance' },
    { id: 'Exhibition', name: 'Exhibition' },
    { id: 'Science/Tech', name: 'Science/Tech' },
    { id: 'Language/Literature', name: 'Language/Literature' },
    { id: 'Other', name: 'Other' }
]

// create a component
export class ContentTypeSelector extends Component {
    state = {
        data: this.props.form.values.ContentType
    }
  render() {
    return (
      <View >
        <Select2

          isSelectSingle={false}
          showSearchBox={false}
          style={{ width: '88%', marginLeft: 20, marginTop: 10, marginBottom: 10}}
          colorTheme="blue"
          popupTitle="Select item"
          title="Select item"
          selectButtonText='Done'
          cancelButtonText='Cancel'
          data={mockData}
          onSelect={data => {
            this.setState({data})
            let i;
            
            // clear array
            for (i = 0; i < this.props.form.values.ContentType.length + 1; ++i) {
                this.props.pop();
            }
            // set new array given by data (might be a more efficient way to do this)
            let j;
            for (j = 0; j < data.length; ++j) {
                this.props.push(data[j]);
            }
            
          }}
          onRemoveItem={data => {
            this.setState({ data })
            let i;
            let index;
            // clear array
            for (i = 0; i < this.props.form.values.ContentType.length + 1; ++i) {
                this.props.pop();
            }
            // set new array given by data (might be a more efficient way to do this)
            let j;
            for (j = 0; j < data.length; ++j) {
                this.props.push(data[j]);
            }
          }}
        />
      </View>
    )
  }
}
