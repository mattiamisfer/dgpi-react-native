import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Picker,TextInput, Alert} from 'react-native';
import { ListItem,Icon } from 'react-native-elements'
import Logo from '../components/MinLogo';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Palette from '../Color';

class DoubtScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {user: '', choosenIndex: 0  ,
        textValue:'',
        feedback:'',
        userData: '',
        userID:'',
        loggedIn:'',
        success:'',
        failure:'',
        values : []




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
     this.setState({ loggedIn: data,userID: userID,locationID:locationID  });

        // this.state.userData.map((data) => {
        // console.log(data.id);
        // });
       // Alert.alert(data);
        console.log('results' + this.state.userID);

        } catch (error) {
          console.log("Something went wrong", error);
        }
    }

    updateUser = (user) => {
       this.setState({ user: user })
    }

    _logout = () => {
        //alert('logout');
        this.props.navigation.navigate('_signOut');
      }
    CheckTextInput = () => {

        //Alert.alert(this.state.userID);
        //Handler for the Submit onPress
        if(this.state.textValue !='' && this.state.user != '') {

            fetch('http://35.153.195.92/appmotivenew/emailSent.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

    topicName: this.state.user,
    feedback : this.state.textValue,
    userID:this.state.userID


  })

}).then((response) => response.json())
      .then((responseJson) => {

// Showing response message coming from server after inserting records.
 //console.log('joooooooooooooooooo ' + responseJson.msg);

     this.setState({
         success:responseJson.msg
     })




      }).catch((error) => {
        console.error(error);
      });




        }
        else {
            Alert.alert('Please Check Input Field')
        }
      };


      async fetchData (){

try {
    let userData = await AsyncStorage.getItem("userData");
    let _userID = await AsyncStorage.getItem("userID");
    let _locationID = await AsyncStorage.getItem("locationID");

    const data = JSON.parse(userData);
    const userID = JSON.parse(_userID);
    const locationID = JSON.parse(_locationID);
    this.setState({ loggedIn: data,userID: userID,locationID:locationID  });

    return fetch('http://35.153.195.92/appmotivenew/list_test.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({


userID:this.state.userID


        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log('My Data List' + responseJson.list)
            this.setState({

                values: responseJson.response
            }, function() {
                // In this block you can do something with new state.
            });
        })
        .catch((error) => {
            console.error(error);
        });

} catch (e) {

}



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
     clearInput =() => {
         this.setState({
             user:'',
             textValue:''
         })
     }

     componentDidMount() {
         this.fetchData();
         this.getToken();
         this.props.navigation.setParams({ logout: this._logout });

     }
 render() {


    return (
        <View style={styles.screen}>

            <View style={{ flex:1, width:'90%',alignItems:'center',justifyContent:'center', paddingTop:20}}>

           { this.state.success ==1 ?
           <Text style={{padding:5, backgroundColor:'white',color:'green'  }}>Your mail has been sent successfully</Text> :
           this.state.success ==2 ?
           <Text  style={{padding:5, backgroundColor:'white' ,color:'red'  }}>Unable to send email. Please try again</Text> :
           <Text></Text>

           }
        <Picker style={styles.pickerStyle}
                        selectedValue = {this.state.user} onValueChange = {this.updateUser}
                    >

                    {/* {
                         values.map((data) => {

                        })
                    } */}
                     <Picker.Item label='Please Choose Subject' value='' />
                    { this.state.values.map((item, key)=>(
            <Picker.Item label={item.name} value={item.name} key={key} />)
            )}
                </Picker>


                     <AutoGrowingTextInput  onChangeText={
                         textValue => this.setState({
                            textValue
                         })

                     } placeholderTextColor="black" style={[styles.pickerStyle],{height:400,width: "90%",     justifyContent: "flex-start"
,      borderColor:'black',borderWidth:2}}  placeholder={'Your Message'} />

<View style={{ flexDirection:'row' , marginTop:20, flex:1, width:'90%',   justifyContent:'space-between'}}>

<View style={{ padding:10,   height:40, backgroundColor:'#fcfffd',width:'43%'}}>
<TouchableOpacity onPress={this.clearInput}      >
<Text style={{ textAlign:'center',alignSelf:'center'}}>Clear</Text>
                </TouchableOpacity>
                </View>

                <View style={{ padding:10,   height:40, backgroundColor:'#fcfffd',width:'43%'}}>
<TouchableOpacity onPress={this.CheckTextInput} >
<Text style={{ textAlign:'center',alignSelf:'center'}}>Submit</Text>
                </TouchableOpacity>
                </View>
{/*
                <View style={{width:'40%',flex:1}}>
<TouchableOpacity style={{height:40,   backgroundColor:'#fcfffd',width:'40%',alignItems:'center',paddingVertical:5}}>
    <Text>Hello</Text>
</TouchableOpacity>
</View> */}
</View>


                 </View>


        </View>
   );
 }
};


const styles = StyleSheet.create({
screen: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'column',
    backgroundColor:Palette.primaryBG


},
pickerStyle:{
    height: 60,

    width: "90%",
    color: 'black',

    justifyContent: 'center',
    borderColor:'black',
    borderWidth:1,
    marginVertical:5
} ,
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

export default DoubtScreen;
