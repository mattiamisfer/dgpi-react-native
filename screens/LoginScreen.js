
import React,{Component } from 'react';
import { StyleSheet,View,Text,TextInput,ImageBackground,Image,TouchableOpacity, Button,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  ToastAndroid
  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
 import DeviceInfo from 'react-native-device-info';
import firebase from '@react-native-firebase/app';
import Colors from '../constants/Colors';
import Palette from '../Color';
import LinearGradient from 'react-native-linear-gradient';
import MinLogo from '../components/MinLogo';

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
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        userEmail:'',
        userPassword:'',
        visible: false,
        userData:{},
        password:true,
        icon:'eye-slash',
        getUniqueId:DeviceInfo.getUniqueId(),
        fcmToken:''
        };
      }









      async componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners(); //add this line
      }

      componentWillUnmount() {

       // Alert.alert(this.state.fcmToken);
        this.notificationListener;
        this.notificationOpenedListener;
        this.messageListener;
      }

      //1
      async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
          this.getToken();
          console.log('Permitions got');
        } else {
          this.requestPermission();
        }
      }

      //3
      async getToken(user) {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
          fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
            // user has a device token
            console.log('fcmToken:', fcmToken);
            this.setState({
              fcmToken:fcmToken
            })
            await AsyncStorage.setItem('fcmToken', fcmToken);
          }
        }
        console.log('fcmToken:', fcmToken);
      }

      //2
      async requestPermission() {
        try {
          await firebase.messaging().requestPermission();
          // User has authorised
          console.log('permission allowed');
          this.getToken();
        } catch (error) {
          // User has rejected permissions
          console.log('permission rejected');
        }
      }

      async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
          const { title, body } = notification;
          console.log('onNotification:');

            const localNotification = new firebase.notifications.Notification({
              sound: 'sampleaudio',
              show_in_foreground: true,
            })
            .setSound('sampleaudio.wav')
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
            .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
            .android.setColor('#000000') // you can set a color here
            .android.setVibrate(500)
            .android.setPriority(firebase.notifications.Android.Priority.High);

            firebase.notifications()
              .displayNotification(localNotification)
              .catch(err => console.error(err));
        });

        const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
          .setDescription('Demo app description')
          .setSound('sampleaudio.wav');
        firebase.notifications().android.createChannel(channel);

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
          const { title, body } = notificationOpen.notification;
          console.log('onNotificationOpened:');
          Alert.alert(title, body)
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
          const { title, body } = notificationOpen.notification;
          console.log('getInitialNotification:');
          Alert.alert(title, body)
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
          //process data message
          console.log("JSON.stringify:", JSON.stringify(message));
        });
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



      UserLoginFunction =  () =>{
        const { userEmail }  = this.state ;
        const { userPassword }  = this.state ;


//Alert.alert(userEmail + userPassword);

  return     fetch('http://35.153.195.92/appmotivenew/ac-login.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({

           email: userEmail,

           password: userPassword,
           getUniqueId:this.state.getUniqueId

         })

       }).then((response) => response.json())
             .then((responseJson) => {

                console.log(responseJson.id);
               // If server response message same as Data Matched
              if(responseJson.id === 1)
               {

             //   Alert.alert('im working');

                   //Then open Profile activity and send user email to profile activity.
                  // console.log('Name' + responseJson.name);
                  this.storeToken(JSON.stringify(responseJson.id));
                  this.storeUserID(responseJson.uniqueID);
                  this.storeLocation(responseJson.location);
                  //console.log('userData' + this.state.userData);

            this.props.navigation.navigate('tabNav',{studentID:responseJson.uniqueID});


               }
               else{


                this.setState(
                    {
                      visible: true,
                    },
                    () => {
                      this.hideToast();
                    },
                  );
              //   Alert.alert(responseJson);
               }

             }).catch((error) => {
               console.error(error);
             });

             Keyboard.dismiss();

         }

         hideToast = () => {
            this.setState({
              visible: false,
            });
          };

          onP = () => {

            Alert.alert('hello')
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
          <Image source={require('../assets/src/logo.png')} style={{width: 300, height:60}} />


        </View> */}

        

        <View style={styles.newContainer}>
         <View    >
            <MinLogo/>
          </View>


          <View style={styles.inputContainer} >  

          <LinearGradient  colors={['#EAF1FC', '#161717']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}  style={styles.topContainer}>
            <Text style={styles.topContainerText} >Login</Text>
          </LinearGradient>
        <View style={styles.userInput }>
<Input
style ={ styles.textInput}
  placeholder='Email'
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'

    />
  }

  onChangeText={userEmail => this.setState({userEmail})}

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

    />

  }

 rightIcon={
    <TouchableOpacity  onPress={() => this.changeIcon()}>
        <Icon
        name= {this.state.icon}
        size={24}
        color='black'

      />
    </TouchableOpacity>
    }

  onChangeText={userPassword => this.setState({userPassword})}
  keyboardType={"numeric"}
/>
 </View>
 <TouchableOpacity style={styles.userInputlogin} onPress={this.UserLoginFunction}>
 <LinearGradient style={styles.loginBtn} colors={['#EAF1FC', '#111111']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
   
   
  
   <Text style={styles.loginText}>Login</Text>
    {/* <Button      title="Login "
         color={Palette.trans}
         onPress={this.UserLoginFunction}/> */}

</LinearGradient>
</TouchableOpacity> 
 

 <View style={{  flexDirection:'column',alignContent:'center',marginVertical:10}}>

  <View  >
  <TouchableOpacity    onPress={() => {this.props.navigation.navigate('password')}}
>

<Text style={{color:'black',fontSize:16,fontWeight:'200'}}>Forgot your Password</Text>

   </TouchableOpacity>
      </View>

     </View>

 
 <Toast visible={this.state.visible} message="Username or Password Wrong" />


        </View>
        <LinearGradient colors={['#ffb300', '#ff8f00']}  start={{ x: 0, y: 0 }} style={styles.signUp}>

<View  >
    <Text style={{color:'white'}}>Don't have account </Text>
    </View>
 <View  >
 <TouchableOpacity    onPress={() => {this.props.navigation.navigate('_signUp')}}
>

<Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Sign Up</Text>

  </TouchableOpacity>
 </View>
</LinearGradient>
        </View>
       
     
      

        </KeyboardAvoidingView>
         
      </>

    );
}
}
LoginScreen.navigationOptions = {
    header:null
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
 height:40
},
userInput: {
width:'100%',
backgroundColor:'white',
marginVertical:5,
    height:48
 },

    userInputlogin: {
        width:'40%',
        marginVertical:5,
        paddingVertical:5,
        borderRadius:5

    },

    newContainer : {
      flex:1,
      flexDirection:'column',
      width:'100%',
      maxWidth:'100%',
      alignItems:'center',
      justifyContent:'center',
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
  //marginTop:150,
  backgroundColor:Palette.white,
  borderRadius:35


},
topContainer: {
  backgroundColor:Palette.black,
  width:'100%',
   alignItems:'center',
  justifyContent:'center',
  borderTopLeftRadius:20,
  borderTopRightRadius:20,
  paddingVertical:20

}, 
topContainerText : {
  color:Palette.white,
  fontSize: 18
},
loginBtn : {
  textAlign:'center',
  justifyContent:'center',
  alignItems:'center',
  color:Palette.white,
  paddingVertical:5,
  borderRadius:5
},
loginText : {
  color:Palette.white,
   fontWeight:'300'
},
signUp : {
  flexDirection:'row',
  width:'80%',
  alignItems:'center',
  justifyContent:'center',
  marginTop:20,
  paddingVertical:10,
  borderRadius:5
}
});

export default LoginScreen;
