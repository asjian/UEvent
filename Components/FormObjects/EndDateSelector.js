import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class StartDateSelector extends Component {
  constructor(props){
    super(props)
    this.state = {date:""}
  }

  render(){
    return (
      <DatePicker
        style={{width: 400}}
        date={this.state.date}
        mode="date"
        placeholder="select end date"
        format="MM-DD-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          
          dateInput: {
            marginLeft: 10
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}