import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const items = [
  // this is the parent or 'item'
  {
    name: 'Categories',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Parties',
        id: 'Parties',
      },
      {
        name: 'Career',
        id: 'Career',
      },
      {
        name: 'Greek Life',
        id: 'Greek Life',
      },
      {
        name: 'Activism',
        id: 'Activism',
      },
      {
        name: 'Art/Design',
        id: 'Art/Design',
      },
      {
        name: 'Performance',
        id: 'Performance',
      },
      {
        name: 'Exhibition',
        id: 'Exhibition',
      },
      {
        name: 'Science/Tech',
        id: 'Science/Tech',
      },
      {
        name: 'Language/Literature',
        id: 'Language/Literature',
      },
      {
        name: 'Other',
        id: 'Other',
      }
    ],
  },


];



export class ContentTypeSelector2 extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
        maxItems: 3,
        maxItem: false
    };
  }

  
  

  onSelectedItemsChange = (selectedItems) => {
    if (selectedItems.length >= this.state.maxItems) {
        if (selectedItems.length === this.state.maxItems) {
          this.setState({ selectedItems })
          this.props.form.values.ContentType = selectedItems;
        }
        this.setState({
          maxItem: true,
        })
        return
      }
      this.setState({
        maxItem: false,
      })

    this.setState({ selectedItems });
    this.props.form.values.ContentType = selectedItems;
  };

  render() {
    return (
      <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={MaterialIcons}
          uniqueKey="id"
          subKey="children"
          selectText="Choose some things..."
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.props.form.values.ContentType}
          modalWithSafeAreaView={true}
          confirmText={`${this.props.form.values.ContentType.length}/${this.state.maxItems} - ${
            this.state.maxItems === this.props.form.values.ContentType.length  ? 'Max selected - Confirm' : 'Confirm'
          }`}
          styles={{subItemText: {fontSize: 23}, itemIconStyle: {fontSize: 23}, itemText: {fontSize: 23}, modalWrapper: {borderWidth: 2} }}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
   
})
