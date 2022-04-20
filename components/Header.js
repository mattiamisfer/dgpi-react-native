import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import Logo from './Logo';

class Header extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
     //   this.getToken();
        this.props.navigation.setParams({ logout: this._logout });

      }
    _logout = () => {
        //alert('logout');
        this.props.navigation.navigate('_signOut');
      }

      static navigationOptions = ({ navigation })  => {
 
        return {
         
         headerTitle: (props) => <Logo />,
         headerRight: () => (
           <TouchableOpacity onPress={navigation.getParam('logout')} >
           <Icon
           raised
           name='heartbeat'
           type='font-awesome'
           color='#f50' 
          
           />
           </TouchableOpacity>
     
         )
     
          
         }
     }

     render() {
       return(
         <View>
           <Text>Hello</Text>
         </View>
       )
     }

}

export default Header;