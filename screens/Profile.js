import React from 'react';
import { StyleSheet,View,Text,TextInput,ImageBackground,Image,TouchableOpacity, Button,
    KeyboardAvoidingView,Alert,Keyboard,ToastAndroid

    } from 'react-native';
    import { Input,Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
 import Logo from '../components/MinLogo';
import Palette from '../Color';
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

class Profile extends React.Component {

    constructor(props)
     {
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
        userID:'',
        student_id :''

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



  async  fetchDetails  () {

    try {

      let userData = await AsyncStorage.getItem("userData");
      let _userID = await AsyncStorage.getItem("userID");
      let _locationID = await AsyncStorage.getItem("locationID");

      const data = JSON.parse(userData);
      const userID = JSON.parse(_userID);
      const locationID = JSON.parse(_locationID);

       this.setState({ userID: userID });

      return fetch('http://35.153.195.92/appmotivenew/profile.php', {
        method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({




        // locationID: this.state.locationID,
        userVal:this.state.userID



      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
       //console.log('My Data' + responseJson.img)
//Alert.alert(responseJson.student_password);
        this.setState({
            userName:responseJson.student_name,
            university:this.state.university,
            type:this.state.activeSwitch,
            phone:responseJson.phone,
            email: responseJson.student_email,
            student_id:responseJson.student_id,
            userPassword:responseJson.student_password,
            repassword:responseJson.student_password,
            university:responseJson.university


      }, function() {
        // In this block you can do something with new state.
      });
      })
      .catch((error) => {
        console.error(error);
      });

    } catch (error) {
      console.log("Something went wrong", error);
    }
    }


      componentDidMount() {
         this.fetchDetails();
          this.props.navigation.setParams({ logout: this._logout });

      }
      UserLoginFunction =  () =>{
        const { email }  = this.state ;
        const { userPassword }  = this.state ;
     //  Alert.alert(userPassword + this.state.repassword)

        if(this.state.repassword == userPassword) {
          if(this.state.username =='' || this.state.email == '') {
            Alert.alert('All the Fields are required');
                      }
            else {
                   // Alert.alert(userEmail + userPassword);

              return     fetch('http://35.153.195.92/appmotivenew/reset.php', {
                     method: 'POST',
                     headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({
                       username:this.state.userName,
                       university:this.state.university,

                       phone:this.state.phone,
                       email: email,
                       student_id:this.state.student_id,

                       password: userPassword,

                     })

                   }).then((response) => response.json())
                         .then((responseJson) => {

                           //  Alert.alert(responseJson.response);
                           // If server response message same as Data Matched

                           if(responseJson.response === 1) {
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
                                msg:'Thank you for Successfully Reset Proile!'
                              },
                              () => {
                                this.hideToast();
                              },
                            );
                            setTimeout(() =>


                            {
                             // this.props.navigation.navigate('Login');
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

 <Icon
  name='user'
  type='font-awesome'
  color='black'
  size={24}
  iconStyle={styles.iconStyle}
/>

<TextInput
style ={ styles.textInput}
value={ this.state.userName}
  placeholder='Username'


  onChangeText={userName => this.setState({userName})}

/>

 </View>

 <View style={styles.userInput }>
 <Icon
    name='email'
    type='material'
    size={24}
      color='black'
      iconStyle={styles.iconStyle}
  />
<TextInput
style ={ styles.textInput}
  placeholder='Email'
  value={ this.state.email}

  onChangeText={email => this.setState({email})}

/>
 </View>


 <View style={styles.userInput }>
 <Icon
    name='phone'
    type='material'
    size={24}
      color='black'
      iconStyle={styles.iconStyle}
  />
<TextInput
style ={ styles.textInput}
  placeholder='Phone'
 value={this.state.phone}

  onChangeText={phone => this.setState({phone})}

/>
 </View>

 <View style={styles.userInput }>
 <Icon
    name='university'
    type='font-awesome'
    size={24}
      color='black'
      iconStyle={styles.iconStyle}
  />
<TextInput
style ={ styles.textInput}
 placeholder="University Name"
 value={this.state.university}
  onChangeText={university => this.setState({university})}

/>
 </View>





 <View style={styles.userInput }>
 <Icon
      name='lock'
      size={24}
      color='black'
      type='font-awesome'
      iconStyle={styles.iconStyle}
    />

 <TextInput
style ={ styles.textInputs}
secureTextEntry={this.state.password}
value={this.state.userPassword}
placeholder='Password'
onChangeText={userPassword => this.setState({userPassword})}
keyboardType={"numeric"}

/>
<TouchableOpacity   onPress={() => this.changeIcon()}>
        <Icon
        name= {this.state.icon}
        size={24}
        color='black'
        type='font-awesome'
      />
    </TouchableOpacity>


  {/* <Input
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
/>   */}
 </View>

 <View style={styles.userInput }>
 <Icon
      name='lock'
      size={24}
      color='black'
      type='font-awesome'
      iconStyle={styles.iconStyle}
    />


 <TextInput
style ={ styles.textInputs}
secureTextEntry={this.state.passwordOne}
value={this.state.repassword}
placeholder='Password'
onChangeText={repassword => this.setState({repassword})}
keyboardType={"numeric"}

/>


 <TouchableOpacity   onPress={() => this.changeIconOne()}>
        <Icon
        name= {this.state.iconOne}
        size={24}
        color='black'
        type='font-awesome'
      />
    </TouchableOpacity>
{/* <Input
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
/> */}
 </View>

 <View style={styles.userInputs} >
   <TouchableOpacity>
     <Button      title="Reset Proifle "
          color="#f194ff"
          onPress={this.UserLoginFunction}/>
   </TouchableOpacity>
 </View>
 <Toast visible={this.state.visible} message={this.state.msg} />


        </View>

        </KeyboardAvoidingView>
      </>
   );
   }
};


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
   height:40
  },
  textInputs: {
    borderBottomColor:'black',
    borderBottomWidth:0.3,
    backgroundColor:'white',
    height:40,
    width:'80%'
   },
  userInput: {
  width:'100%',
  backgroundColor:'white',
  marginVertical:5,
  flexDirection:'row',  alignItems:"center"

   },

   userInputs: {
    width:'100%',
    backgroundColor:'white',
    marginVertical:5,

     },
   userInputP: {
    width:'100%',
    backgroundColor:'white',
    marginVertical:5,


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
  iconStyle: {
    paddingHorizontal:5
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
export default Profile;
