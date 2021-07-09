import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class StartTimeSelector extends Component {
  constructor(props){
    super(props)
    this.state = {date:""}
  }

  render(){
    return (
      <DatePicker
        style={{width: 400}}
        date={this.props.value}
        mode="time"
        placeholder="select start time"
        format="LT"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          
          dateInput: {
            marginLeft: 10
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
            this.setState({date: date})
            this.props.onChange('StartTime', date)
    
        }}
      />
    )
  }
}
