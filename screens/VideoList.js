import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity, Alert,ScrollView} from 'react-native';
import Logo from '../components/MinLogo';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem,Icon as MyIcon } from 'react-native-elements'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Palette from '../Color';
import LinearGradient from 'react-native-linear-gradient';

class VideoList extends React.Component {

    constructor(props)
     {
         super(props);
         this.state = {
            listDataSource:[],
            loggedIn:'',
            userID:'',
            locationID:'',
            notAvailable:''

         }
     }


     _logout = () => {
      //alert('logout');
      this.props.navigation.navigate('_signOut');
    }
    static navigationOptions = ({ navigation })  => {

      return {

       headerTitle: (props) => <Logo />,
       headerLeft: () => (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}
              
        >
            
            <MyIcon

name='arrow-back-ios'
type='MaterialIcons'
color='#697796'
size={30}

/> 
        </TouchableOpacity>
       ),
       headerRight: () => (
        <TouchableOpacity style={styles.drownerButton} onPress={navigation.getParam('logout')} > 
        <MyIcon

    name='md-log-in'
    type='ionicon'
    color='#697796'
    size={30}

/> 
        </TouchableOpacity>


       ),
        headerStyle: {
        backgroundColor: Palette.primaryBG}


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
      // this.setState({ loggedIn: data });
          //       // this.setState({ userID: userID });
          //       // this.setState({locationID:locationID});

          this.setState({ loggedIn: data,
              userID: userID,
              locationID:locationID
          });


        //    Alert.alert(this.state.userID + '//////sssssssssssss')
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
        return fetch('http://35.153.195.92/appmotivenew/test-videolist.php', {
          method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          userID :this.props.navigation.state.params.userID,
          locationID:this.props.navigation.state.params.locationID,
          testiD : this.props.navigation.state.params.topicID

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

       if(responseJson.success ===1) {
         this.setState({

          listDataSource: responseJson.response
        }, function() {
          // In this block you can do something with new state.
        });
      }
      else {
        this.setState({
          notAvailable:'Sorry No Videos Under this Topic'

        });
      }
        })
        .catch((error) => {
          console.error(error);
        });
      }



      async  fetches  () {
          try {
              let userData = await AsyncStorage.getItem("userData");
              let _userID = await AsyncStorage.getItem("userID");
              let _locationID = await AsyncStorage.getItem("locationID");

              const data = JSON.parse(userData);
              const userID = JSON.parse(_userID);
              const locationID = JSON.parse(_locationID);
              // this.setState({ loggedIn: data });
              //       // this.setState({ userID: userID });
              //       // this.setState({locationID:locationID});

              this.setState({ loggedIn: data,
                  userID: userID,
                  locationID:locationID
              });


           //   Alert.alert(this.state.userID + '////// dddddddd' + this.props.navigation.state.params.topicID)
              // this.state.userData.map((data) => {
              // console.log(data.id);
              // });
              // Alert.alert(data);
              console.log('results' + data);

          } catch (error) {
              console.log("Something went wrong", error);
          }
      }

      componentDidMount() {



        this.getToken();



           this.fetchData();
          this.props.navigation.setParams({ logout: this._logout });
         // Alert.alert(this.props.navigation.state.params.userID);

      }
   render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <View style={styles.screen}>




           {this.state.notAvailable !='' ?
           <Text style={{color:'red',fontSize:18,fontWeight:'bold'}}>{this.state.notAvailable}</Text> :
           null
           }


             {this.state.listDataSource.map((data, index) => (

// {data.user ===1 ? }
 <TouchableOpacity disabled={data.user} onPress={() =>
          navigate('VideoPlayer',{
            Vid : data.id,
              userID :this.props.navigation.state.params.userID,
              locationID:this.props.navigation.state.params.locationID,
              topicID : this.props.navigation.state.params.topicID
          })
        }>
            <LinearGradient  colors={['#758BAF', '#274073']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}  key={index} style={{width:'80%',paddingHorizontal:5,flexDirection:'row',backgroundColor:'#3f23cf',marginVertical:5,paddingVertical:5}}>
                <View style={{justifyContent:'flex-start',paddingRight:10}}>

             {data.show ==='show' ?
                // <Image source={require('../assets/src/video-player.png')} style={{width: 50, height:50}} />
                <Image source={{uri: data.img}}  style={{width: 50, height:50}} />
                :
                <Image source={require('../assets/src/paid.png')} style={{width: 50, height:50}} />
              }
                    </View>
                    <View style={{ alignItems:'center', justifyContent:'center',flexDirection:'column',flex:1
}}>
   <View>
    <Text style={styles.font}>{data.topic_name}  </Text>
   </View>

                    <View style={{ alignItems:'flex-start'}}>
                    <Text style={styles.font}>{data.professor}</Text>
                        </View>
                        </View>
            </LinearGradient>
            </TouchableOpacity>
            ))}


        </View></ScrollView>
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
drownerButton: {
  height: 50,
  width: 50,
  borderRadius: 25,
  elevation: 10,
  backgroundColor: Palette.primaryBG,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight:10
},
backButton: {
  height: 50,
  width: 50,
  borderRadius: 25,
  elevation: 10,
  backgroundColor: '#EEF3FC',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft:10

},

});

export default VideoList;
