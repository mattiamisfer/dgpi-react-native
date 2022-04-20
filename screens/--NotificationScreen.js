import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import Logo from '../components/MinLogo';
import Icon from 'react-native-vector-icons/Ionicons';


class NotificationScreen extends React.Component {

    constructor(props)
     {
         super(props);
         this.state = {
            listDataSource:[],
            loggedIn:'',
            userID:'',
            locationID:''

         }
     }


     _logout = () => {
      //alert('logout');
      this.props.navigation.navigate('_signOut');
    }
    static navigationOptions = ({ navigation })  => {

      return {
       
       headerTitle: (props) => <Logo />,
       headerRight: () => (
         <TouchableOpacity style={styles.logOut} onPress={navigation.getParam('logout')} >
         <Icon
        
         name='md-log-in'
         type='ionicon'
         color='#496bea' 
         size={30}
        
         />
         </TouchableOpacity>
   
       ), headerRightStyle: {
        backgroundColor:'#4A94FB',
        borderBottomColor: 'transparent',
       }
   
        
       }
   }

  async getToken(user) {
      try {
        let userData = await AsyncStorage.getItem("userData");
        let _userID = await AsyncStorage.getItem("userID");
        let _locationID = await AsyncStorage.getItem("locationID");

        const data = JSON.parse(userData);
        const userID = JSON.parse(_userID);
        const locationID = JSON.parse(_locationID);
      this.setState({ loggedIn: data }); 
      this.setState({ userID: userID }); 
      this.setState({locationID:locationID});
      // this.state.userData.map((data) => {
      // console.log(data.id);
      // });
     // Alert.alert(data);
      console.log('results' + data);
        
      } catch (error) {
        console.log("Something went wrong", error);
      }
  }


  
    fetchData = () => {
        return fetch('http://35.153.195.92/appmotivenew/test-notilist.php', {
          method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    //   userID : this.props.navigation.state.params.userID,
    //   locationID: this.props.navigation.state.params.locationID,
    //   topicID :this.props.navigation.state.params.topicID,
    
    
          
          // locationID: this.state.locationID,
          // userID: this.state.userID
       
    
       
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
       //  console.log('My Data' + responseJson)
         this.setState({
          
          listDataSource: responseJson.response
        }, function() {
          // In this block you can do something with new state.
        });
        })
        .catch((error) => {
          console.error(error);
        });
      }


      componentDidMount() {
          this.fetchData();
          this.props.navigation.setParams({ logout: this._logout });

      }
   render() {
    return (
      <ScrollView> 
        <View style={styles.screen}>

           

            
             {this.state.listDataSource.map((data, index) => (
            <View key={index} style={{width:'80%',paddingHorizontal:5,flexDirection:'row',backgroundColor:'#3f23cf',marginVertical:5,paddingVertical:5}}>
                <View style={{justifyContent:'flex-start',paddingRight:10}}> 
                <Image source={require('../assets/src/new.png')} style={{width: 50, height:50}} />

                    </View>
                    <View style={{ alignItems:'center', justifyContent:'center',flexDirection:'column',flex:1
}}>
   <View>
    <Text style={styles.font}>{data.title}</Text>
   </View>
                   
                    <View style={{ alignItems:'flex-start'}}>
                    <Text style={styles.font}>{data.profferser}</Text>
                        </View>
                        </View>
            </View>
            ))}
        </View>
        </ScrollView>
   );
   }
};




const styles = StyleSheet.create({
screen: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    alignContent: 'space-between',
    flexDirection:'column',

    backgroundColor:'#eaeaea'
},
font: {
    color:'#fafafa',
    fontSize:12,
},
logOut: {
  marginRight:10
},
});

export default NotificationScreen;