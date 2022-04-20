import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableWithoutFeedback,TouchableOpacity,  Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { ListItem } from 'react-native-elements'
import SubjectData from './props/SubjectData'

export default class SubjectListScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showComponmentB: true
             
        }
    }
    _toggleShow = () => {
        this.setState({showComponmentB: !this.state.showComponmentB})
      }
    
    handleViewRef = ref => this.view = ref;
  
    bounce = () => this.view.bounceInLeft(3000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    

    _getRelatedData = (name) => {
 
Alert.alert(name);
    }
 
  
      //  this.view.bounceInLeft(3000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    
    display= (text) =>{
        console.log(text);//this should print Hello world
      }
    render() {
        const { navigation } = this.props;
        const list = [
            {
              title: 'Appointments',
              icon: 'av-timer'
            },
            {
              title: 'Trips',
              icon: 'flight-takeoff'
            },
          
          ]
 
         
          
        return (
            <View>
                <Text> { this.props.navigation.state.params.topicID} </Text>
            <View>
            {/* <TouchableWithoutFeedback onPress={this.bounce} >
        <Animatable.View ref={this.handleViewRef}>
          <Text>Bounce me!</Text>
        </Animatable.View>
      </TouchableWithoutFeedback> */}


            </View>
            <View>
  {
    list.map((item, i) => (
        
    <TouchableOpacity   key={i} 
    // onPress={this._getRelatedData.bind(this, item.title)}
    onPress={this._toggleShow}
    > 
      <ListItem
      
        title={item.title}
        leftIcon={{ name: item.icon }}
        bottomDivider
        chevron
      />
         <Animatable.View ref={this.handleViewRef}>
          <Text>Bounce me!</Text>
        </Animatable.View>
    {this.state.showComponmentB && <SubjectData name={item.title} /> }

      </TouchableOpacity>


    ))
  }


</View>
{/* 
<View>
<Text onPress={()=>this.display('Hello World')}>hiiiiii</Text>
</View> */}
            </View>
        )
    }

  
}
const styles = StyleSheet.create({
        
});

 