import React from 'react';
import {View,Text, Alert,StyleSheet,Image,TouchableOpacity} from 'react-native';

import { ListItem,Icon } from 'react-native-elements'

import Logo from '../components/MinLogo';
import Palette from '../Color';
export default class SubmitData extends React.Component {

    constructor(props){
        super(props);
        this.state={
        userID:this.props.navigation.state.params.userID,
        testID:this.props.navigation.state.params.testID,
        totalQues:'',
        title:'',
        totalMark:'',
        maxTime:'',
        timeTake:'',
        attempted:'',
        leftQues:'',
        correctQues:'',
        wrongQues:'',
        rightMark:'',
        negativeMark:'',
        rank:''


        };
    }
    static navigationOptions =
    {
       title: 'ProfileActivity',

    };

    fetchData =() => {
        return fetch('http://35.153.195.92/appmotivenew/test-resultload.php', {
            method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

      //  locationID: 7,
      //      userID: 1
      userID:this.state.userID,
      testID:this.state.testID


          })
        })
          .then((response) => response.json())
          .then((responseJson) => {

     //  Alert.alert('Hello' + responseJson.totalQues)

      //  console.log( 'Current' + arrnew[this.qno].question)
           this.setState({
            totalQues:responseJson.totalQues,
            title:responseJson.title,
            totalMark:responseJson.totalMark,
            maxTime:responseJson.maxTime,
            timeTake:responseJson.timeTake,
            attempted:responseJson.attempted,
            leftQues:responseJson.leftQuestion,
            correctQues: responseJson.correctQues,
            wrongQues:responseJson.wrongQues,
            rightMark:responseJson.rightMark,
            negativeMark:responseJson.negativeMark,
            rank:responseJson.rank

            // quesNo:this.state.quesNo
          }
          , function() {
           });
          })
          .catch((error) => {
            console.error(error);
          });
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
              
              <Icon
  
  name='arrow-back-ios'
  type='MaterialIcons'
  color='#697796'
  size={30}
  
  /> 
          </TouchableOpacity>
         ),
         headerRight: () => (
          <TouchableOpacity style={styles.drownerButton} onPress={navigation.getParam('logout')} > 
          <Icon
  
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

    componentDidMount() {
        this.getToken();
        this.fetchData();
        this.props.navigation.setParams({ logout: this._logout });
    }
    render() {
        return (
            <View style={{width:'100%', flex:1,flexDirection:'column', alignContent:'center',alignItems:'center',backgroundColor:'#555dff'}}>


                <View style={{width:'60%',paddingTop:10,alignContent:'center',alignItems:'center'}}>

                    <Image source={require('../assets/src/success.png')} style={{width: 100, height:100}} />


                    <Text style={{fontSize:12,color:'white'}}>Test Was Submitted Successfully!</Text>
                </View>


                 <View style={{width:'80%',marginTop:10,paddingLeft:3,paddingRight:3,flexDirection:'column'  ,flex:1, backgroundColor:'white',borderRadius:10}}>
                     <View style={{ alignItems:'center' }}>
                         <Text style={{fontSize:15, fontWeight:'bold' }}>{this.state.title}</Text>
                     </View>


                     <View style={{ flex:1,flexDirection:'column',padding:5}}>
                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}>Total Question</Text>
                             </View>

                             <View style={{ flex:1}}>
                                 <Text style={styles.font}>{this.state.totalQues}</Text>
                             </View>
                         </View>
                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}>Total Mark</Text>
                             </View>

                             <View style={{ flex:1}}>
                                 <Text style={styles.font}>{this.state.totalMark}</Text>
                             </View>
                         </View>

                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}>Total Time</Text>
                             </View>

                             <View style={{ flex:1}}>
                                 <Text style={styles.font}>{this.state.maxTime}</Text>
                             </View>
                         </View>

                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}>TIme Taken</Text>
                             </View>

                             <View style={{ flex:1}}>
                                 <Text style={styles.font}>{this.state.timeTake}</Text>
                             </View>
                         </View>

                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}>Attempted</Text>
                             </View>

                             <View style={{flex:1}}>
                                 <Text style={styles.font}>{this.state.attempted}</Text>
                             </View>
                         </View>

                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}>Left Question</Text>
                             </View>

                             <View style={{ flex:1}}>
                                 <Text style={styles.font}>{this.state.leftQues}</Text>
                             </View>
                         </View>


                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}>Correct Question</Text>
                             </View>

                             <View style={{ flex:1}}>
                                 <Text style={styles.font}>{this.state.correctQues}</Text>
                             </View>
                         </View>

                         <View style={styles.row}>
                             <View style={{flex:1}}>
                                 <Text style={styles.fontText}> Wrong Question</Text>
                             </View>

                             <View style={{ flex:1}}>
                                 <Text style={styles.font}>{this.state.wrongQues}</Text>
                             </View>
                         </View>

                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}> Right Mark</Text>
                             </View>

                             <View style={{flex:1}}>
                                 <Text style={styles.font}>{this.state.rightMark}</Text>
                             </View>
                         </View>

                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}>Negative Mark</Text>
                             </View>

                             <View style={{ flex:1}}>
                                 <Text style={styles.font}>{this.state.negativeMark}</Text>
                             </View>
                         </View>

                         <View style={styles.row}>
                             <View style={{ flex:1}}>
                                 <Text style={styles.fontText}>Rank</Text>
                             </View>

                             <View style={{ flex:1}}>
                                 <Text style={styles.font}>{this.state.rank}</Text>
                             </View>
                         </View>






                     </View>

                 </View>

                </View>
        );
    }
}

const styles = StyleSheet.create(
{
    row:{
        marginVertical: 4,

        alignContent:'space-between',
        flexDirection:'row',
        flex:1


    },
    font: {

        fontSize:14,
        textAlign:'right'
    },
    fontText: {

        fontSize:14,
        justifyContent:'flex-start'
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
}

)
