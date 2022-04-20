import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';

import RadioGroup from 'react-native-radio-button-group';

 

export default class Quiz extends Component  {


  constructor(props) {
    super(props) 
    this.state = {
      radiogroup_options : [
        {id: 0, label: 'Button1' },
        {id: 1, label: 'Button2' },
        {id: 2, label: 'Button3' },
        {id: 3, label: 'Button4' },
      ]
    }
  }

  onPress() {
this.setState({
  value:value
})
  }
  render() {

    
    return (
      <View style={styles.container}>
               <RadioGroup
                  options={this.state.radiogroup_options}
                  onChange={(option) => this.setState({selectedOption: option})}
            />

               <RadioGroup
                  options={this.state.radiogroup_options}
                  onChange={(option) => this.setState({selectedOption: option})}
            />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});