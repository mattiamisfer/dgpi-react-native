import React from 'react';
import {StyleSheet,View,Text } from 'react-native';
import CountDowns from 'react-native-countdown-component';


const CountDown = props => {
     return (
        <View style={{width:'100%',justifyContent:'center'}}>
<CountDowns
        size={15}
        until={ 100}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
      <Text>ssss {JSON.stringify(props.time)}</Text>

        </View>
     
    )
}

export default CountDown;