
import React,{Component } from 'react';
import {
    StyleSheet, View, Text, TextInput, ImageBackground, Image, TouchableOpacity, Button,
    KeyboardAvoidingView, Alert, Keyboard, ToastAndroid, Picker,

} from 'react-native';
  import Logo from '../components/MinLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Icon } from 'react-native-elements';
 import SwitchButton from 'switch-button-react-native';
import DeviceInfo from 'react-native-device-info';
import Palette from '../Color';
import LinearGradient from 'react-native-linear-gradient';
const Toast = (props) => {
    if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(
        props.message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        400,
      );
      return null;
    }
    return null;
  };
class SignupScreen extends Component {
    constructor(props) {


        super(props);
        this.state = {
        userEmail:'',
        userPassword:'',
        visible: false,
        emailvisible:false,
        userData:{},
        activeSwitch: 1,
        userName:'',
        phone:'',
        university:'',
        repassword:'',
        keyboardStatus:true,
        msg:'',
        password:true,
        icon:'eye-slash',
        passwordOne:true,
        iconOne:'eye-slash',
        getUniqueId:DeviceInfo.getUniqueId(),
            values:[],
            user:''

        };
      }


    fetchDataBatch =   () => {




        return fetch('http://35.153.195.92/appmotivenew/batch_list.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({





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
    }

    componentDidMount() {
        this.fetchDataBatch();
    }

      changeIconOne() {



        this.setState(prevState => ({
          iconOne: prevState.iconOne =='eye' ? 'eye-slash' : 'eye',
          passwordOne:!prevState.passwordOne
        }));

      }

      changeIcon() {



        this.setState(prevState => ({
          icon: prevState.icon =='eye' ? 'eye-slash' : 'eye',
          password:!prevState.password
        }));

      }

      async storeToken(user) {
        try {
           await AsyncStorage.setItem("userData",JSON.stringify(user));

        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
      async storeUserID(user) {
        try {
           await AsyncStorage.setItem("userID",JSON.stringify(user));

        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
      async storeLocation(user) {
        try {
           await AsyncStorage.setItem("locationID",JSON.stringify(user));

        } catch (error) {
          console.log("Something went wrong", error);
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
           
           headerStyle: {
           backgroundColor:Palette.primaryBG}
    
    
          }
     }


      UserLoginFunction =  () =>{
        const { userEmail }  = this.state ;
        const { userPassword }  = this.state ;
     //  Alert.alert(userPassword + this.state.repassword)

        if(this.state.repassword == userPassword) {
          if(this.state.username == '' || userEmail == '') {
            Alert.alert('All the Fields are required');
                      }
            else {
                   // Alert.alert(userEmail + userPassword);

              return     fetch('http://35.153.195.92/appmotivenew/ac-logincrt.php', {
                     method: 'POST',
                     headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({
                       username:this.state.userName,
                       university:this.state.university,
                       type:this.state.activeSwitch,
                       phone:this.state.phone,
                       email: userEmail,

                       password: userPassword,
                       getUniqueId:this.state.getUniqueId,
                         batchname:this.state.user

                     })

                   }).then((response) => response.json())
                         .then((responseJson) => {

                            console.log(responseJson);
                           // If server response message same as Data Matched

                           if(responseJson === 1) {
                            this.setState(
                              {
                                visible: true,
                                msg:'Email ID Already Exist!'
                              },
                              () => {
                                this.hideToast();
                              },
                            );
                           } else {

                            this.setState(
                              {
                                visible: true,
                                msg:'Thank you for Successfully Registered!'
                              },
                              () => {
                                this.hideToast();
                              },
                            );
                            setTimeout(() =>


                            {
                              this.props.navigation.navigate('Login');
                              this.setState({timePassed: true})}, 5000)

                           }


                         }).catch((error) => {
                           console.error(error);
                         });

                         Keyboard.dismiss();
                        }
        }
        else {

       Alert.alert('not smae');
          }

         }

         hideToast = () => {
            this.setState({
              visible: false,
            });
          };

    updateUser = (user) => {
        this.setState({ user: user })
    }
      render() {
    return (
      <>
        <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>


        {/* <View style={ styles.container}>
          <Image source={require('../assets/src/logo.png')} style={{width: 300, height:48}} />


        </View>

        <View></View> */}


        <View style={styles.inputContainer}>

        {/* <View  style={{width:'100%',

marginBottom:8, alignContent:'center'}}>
        <View style={{width:'50%',marginLeft:50}} >
       <SwitchButton
                onValueChange={(val) => this.setState({ activeSwitch: val })}      // this is necessary for this component
                 text1 = 'Free'            text2 = 'Premium'               // optional: first text in switch button --- default ON
                                    // optional: second text in switch button --- default OFF
                switchWidth = {200}                 // optional: switch width --- default 44
                switchHeight = {44}                 // optional: switch height --- default 100
                switchdirection = 'ltr'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                switchBorderRadius = {100}          // optional: switch border radius --- default oval
                switchSpeedChange = {500}           // optional: button change speed --- default 100
                switchBorderColor = '#d4d4d4'       // optional: switch border color --- default #d4d4d4
                switchBackgroundColor = '#fff'      // optional: switch background color --- default #fff
                btnBorderColor = '#00a4b9'          // optional: button border color --- default #00a4b9
                btnBackgroundColor = '#00bcd4'      // optional: button background color --- default #00bcd4
                fontColor = '#b1b1b1'               // optional: text font color --- default #b1b1b1
                activeFontColor = '#fff'           // optional: active font color --- default #fff
            />

            { this.state.activeSwitch === 0 ? console.log('view1') : console.log('view2') }
       </View>

        </View> */}
        <View style={styles.userInput }>
<Input
style ={ styles.textInput}
  placeholder='Username'
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
      type='font-awesome'

    />
  }

  onChangeText={userName => this.setState({userName})}

/>
 </View>

 <View style={styles.userInput }>
<Input
style ={ styles.textInput}
  placeholder='Email'
  leftIcon={
    <Icon
    name='email'
    type='material'
    size={24}
      color='black'
  />

  }

  onChangeText={userEmail => this.setState({userEmail})}

/>
 </View>


            <View style={styles.userInput}>

                <Picker style={styles.textInput}
                        selectedValue = {this.state.user} onValueChange = {this.updateUser}
                >

                    {/* {
                         values.map((data) => {

                        })
                    } */}
                    <Picker.Item label='Please Choose Batch' value='' />
                    { this.state.values.map((item, key)=>(
                        <Picker.Item label={item.name} value={item.name} key={key} />)
                    )}
                </Picker>
            </View>


 <View style={styles.userInput }>
<Input
style ={ styles.textInput}
  placeholder='Phone'
  leftIcon={
    <Icon
    name='phone'
    type='material'
    size={24}
      color='black'
  />

  }

  onChangeText={phone => this.setState({phone})}

/>
 </View>

 <View style={styles.userInput }>
<Input
style ={ styles.textInput}
 placeholder="University Name"
  onChangeText={university => this.setState({university})}

/>
 </View>





 <View style={styles.userInput }>
<Input
style ={ styles.textInput}
secureTextEntry={this.state.password}
  placeholder='Password'
  leftIcon={
    <Icon
      name='lock'
      size={24}
      color='black'
      type='font-awesome'

    />
  }

  rightIcon={
    <TouchableOpacity  onPress={() => this.changeIcon()}>
        <Icon
        name= {this.state.icon}
        size={24}
        color='black'
        type='font-awesome'
      />
    </TouchableOpacity>
    }

  onChangeText={userPassword => this.setState({userPassword})}
  keyboardType={"numeric"}
/>
 </View>

 <View style={styles.userInput }>
<Input
style ={ styles.textInput}
secureTextEntry={this.state.passwordOne}
  placeholder='Re Password'
  leftIcon={
    <Icon
      name='lock'
      size={24}
      color='black'
      type='font-awesome'

    />
  }


  rightIcon={
    <TouchableOpacity  onPress={() => this.changeIconOne()}>
        <Icon
        name= {this.state.iconOne}
        size={24}
        color='black'
        type='font-awesome'
      />
    </TouchableOpacity>
    }
  onChangeText={repassword => this.setState({repassword})}
  keyboardType={"numeric"}
/>
 </View>

  <LinearGradient colors={['#ffb300', '#ff8f00']}  start={{ x: 0, y: 0 }} style={styles.userInputsignUp}>

   <TouchableOpacity onPress={this.UserLoginFunction}>
     <Text style={styles.textColor}>Sign Up</Text>
   </TouchableOpacity>
 </LinearGradient>
 <Toast visible={this.state.visible} message={this.state.msg} />


        </View>

        </KeyboardAvoidingView>
      </>

    );
}
}


const styles = StyleSheet.create({
  body: {

    flex:1,
    backgroundColor:Palette.primaryBG,
    alignItems:'center'
  },
container: {

    width:'100%',
    height:90,
    backgroundColor:'white',
    borderBottomLeftRadius:60,
    borderBottomRightRadius:60,
    alignItems:'center',
    justifyContent:'center'
},
textInput: {
 borderBottomColor:'black',
 borderBottomWidth:0.3,
 backgroundColor:'white',
 height:46
},
userInput: {
      marginTop:15,
width:'100%',
backgroundColor:'white',
marginVertical:5,
    height:46
 },

    userInputsignUp: {
        marginTop:15,
        width:'100%',
        backgroundColor:'white',
        marginVertical:5,
        alignItems:'center',
        justifyContent:'center',
        height:35
    },
inputContainer: {

  width:'100%',
  maxWidth:'80%',
  alignItems:'center',
  justifyContent:'center',
  // shadowOffset: { width:0, height:2},
  // shadowRadius:5,
  // shadowOpacity:0.26,
  // backgroundColor:'white',
  // elevation:5,
  marginTop:25


},
textColor : {
  color:Palette.white,
  fontWeight:'200'
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

export default SignupScreen;
