import React, {useRef,Component } from 'react';
import { View, StyleSheet,Text,Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const categories = [{name:'Extracurriculars', icon: require('../../assets/extracurriculars.png'), id:1,},
{name:'Parties', icon: require('../../assets/parties.png'),id:2,}, {name:'Social',icon: require('../../assets/social.png'),id:3,},
{name:'Career',icon: require('../../assets/career.png'),id:4,}, {name:'Networking',icon: require('../../assets/networking.png'),id:5,},
{name:'Community',icon: require('../../assets/test2.png'),id:6,}, {name:'Fair/Festival',icon: require('../../assets/festival.png'),id:7,}, 
{name:'Greek Life',icon: require('../../assets/greeklife.png'),id:8,}, {name:'Sports',icon: require('../../assets/sports.png'),id:9,}, 
{name:'Games',icon: require('../../assets/games.png'),id:10,}, {name:'Cultural',icon: require('../../assets/cultural.png'),id:11,}, 
{name:'Activism',icon: require('../../assets/activism.png'),id:12,}, {name:'Music',icon: require('../../assets/music.png'),id:13,}, 
{name:'Art/Design', icon: require('../../assets/artdesign.png'),id:14,}, {name:'Food + Drink', icon: require('../../assets/fooddrink.png'),id:15,}, 
{name:'Performance', icon: require('../../assets/performance.png'),id:16,}, {name:'Presentation', icon: require('../../assets/presentation.png'),id:17,}, 
{name:'Exhibition', icon: require('../../assets/exhibition.png'),id:18,}, {name:'Academic', icon: require('../../assets/academic.png'),id:19,},
{name:'Science/Tech', icon: require('../../assets/science.png'),id:20,}, {name:'Business/Professional', icon: require('../../assets/business.png'),id:21,},
{name:'Other', icon: require('../../assets/other.png'),id:22,}];

const items = [
  // this is the parent or 'item'
  /*
  {
    name: 'Categories',
    id: 0,
    // these are the children or 'sub items'
    children:  categories
  }
  */
 {
  children: categories
 }
];

export class ContentTypeSelector extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
        maxItems: 3,
        maxItem: false
    };
  }
  renderListHeader = (onPress) => {
    return (
      <View style = {styles.header}>
        <Text style = {styles.headerText}>Categories</Text>
        <Ionicons name = 'ios-close-circle-outline' size = {35} style = {styles.close} onPress = {onPress}/>
      </View>
    )
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
      <View style = {{borderWidth: 1.2,borderColor:this.props.form.values.ContentType.length==0?'#c4c4c4':'#7b7b7b'}}>
        <SectionedMultiSelect
          ref={SectionedMultiSelect => this.SectionedMultiSelect = SectionedMultiSelect}
          items={items}
          IconRenderer={MaterialIcons}
          uniqueKey="id"
          subKey="children"
          selectText="More Categories If Needed"
          showDropDowns={false}
          readOnlyHeadings={true}
          hideSearch = {true}

          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.props.form.values.ContentType}
          modalWithSafeAreaView={true}
          confirmText={`${this.props.form.values.ContentType.length}/${this.state.maxItems} - ${
            this.state.maxItems === this.props.form.values.ContentType.length  ? 'Max selected - Confirm' : 'Confirm'
          }`}
          headerComponent = {() => {
            return (
              <View style = {styles.header}>
                <Text style = {styles.headerText}>Categories</Text>
                <Ionicons name = 'ios-close-circle-outline' size = {35} style = {styles.close} onPress = {() => this.SectionedMultiSelect._toggleSelector()}/>
              </View>
            )
          }}
          styles={{subItemText: {fontSize: 23}, itemIconStyle: {fontSize: 23}, itemText: {fontSize: 23}, modalWrapper: {borderWidth: 2},
                  selectToggle: {padding: 7,}, selectToggleText: {color:this.props.form.values.ContentType.length==0?'#a3a3a3':'black'},
                  chipContainer: {borderColor:'#7b7b7b'},chipText:{color:'black'},confirmText: {paddingVertical:7,fontSize:21,fontWeight:'600'},
                  selectedSubItemText: {color:'#fab400'}}}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
    },
    headerText: {
      fontSize: 22,
      fontWeight: '600',
      marginLeft: 11.5,
      marginTop: 15,
    },
    close: {
      marginLeft: 210,
      marginTop: 7,
    },
})
