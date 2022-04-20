// Home screen
import React, { Component } from 'react';
//import react in our code.
import { Text, View,StyleSheet,FlatList,TouchableOpacity, Alert,Button,Image,Dimensions } from 'react-native';
//import all the components we are going to use.
import Modal from "react-native-modal";

import { ListItem,Icon } from 'react-native-elements'
import ImageZoom from 'react-native-image-pan-zoom';
import { WebView } from 'react-native-webview';

import { ScrollView } from 'react-native-gesture-handler';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
import Logo from '../components/MinLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Palette from '../Color';
export default class QuesList extends React.Component {


  constructor(props) {

    super(props);

    this.state = {
      qlist:[],
      questionID:'',
      modalVisible: false,
      answerList:[],
      image:'',
      userID:'',
      loggedIn:'',
      locationID:'',
      rightans:'',
      myanswer:'',
      solution:'',
      question:'',
      qimage:''

    }
 this.showques = this.showques.bind(this);
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
    return fetch('http://35.153.195.92/appmotivenew/answerkey.php', {
      method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
//   userID : this.props.navigation.state.params.userID,
//   locationID: this.props.navigation.state.params.locationID,
//   topicID :this.props.navigation.state.params.topicID,
 testID:this.props.navigation.state.params.testID,
 userID:this.props.navigation.state.params.userID

      // locationID: this.state.locationID,
      // userID: this.state.userID



    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
    console.log('My Data List' + responseJson.quiz)
     this.setState({

      qlist: responseJson.quiz
    }, function() {
      // In this block you can do something with new state.
    });
    })
    .catch((error) => {
      console.error(error);
    });
  }


  componentDidMount() {
    this.getToken();
      this.fetchData();
      this.props.navigation.setParams({ logout: this._logout });
  }

  showques= (quesID) => {

   // Alert.alert(quesID)
    this.setModalVisible(true);

    return fetch('http://35.153.195.92/appmotivenew/questionFetch.php', {
      method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
//   userID : this.props.navigation.state.params.userID,
//   locationID: this.props.navigation.state.params.locationID,
//   topicID :this.props.navigation.state.params.topicID,
quesID:quesID,
userID:this.props.navigation.state.params.userID



      // locationID: this.state.locationID,
      // userID: this.state.userID



    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
    console.log('My Data Listsss' + responseJson.qimage)
     this.setState({

      answerList: responseJson.response,
      image: responseJson.image,
      solution: responseJson.solution,
      rightans:responseJson.rightans,
      myanswer:responseJson.myanswer,
      question:responseJson.question,
      qimage:responseJson.qimage
    }, function() {
      // In this block you can do something with new state.
    });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item,index }) => (

    <TouchableOpacity  onPress={() =>  this.showques(
      item.questionNumber


     ) }>
<View  style={styles.block1}>

  <Text> {index + 1} ) {item.question}</Text>
</View>
</TouchableOpacity>
  );


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

  render() {

    const lapsList = this.state.answerList.map((data,index) => {
      return (
      <View key={index+1} style={[styles.block2, data.id == this.state.rightans  ? { backgroundColor:'green'}: data.id == this.state.myanswer ? { backgroundColor:'red'}:{}]}>
        <Text style={[styles.block2, data.id == this.state.rightans  ? { color:'white'}: data.id == this.state.myanswer ? { color:'white'}:{}]}>{data.id} )

            {data.value}

          </Text>


        </View>
      )
    })
    return (
      <View style={styles.screen}>
      <FlatList
      data={this.state.qlist}

      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
      // refreshing={this.state.refreshing}
      // onRefresh={this.handleRefresh}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
    />

<Modal isVisible={this.state.modalVisible}  transparent={true} style={{marginTop:50,narginBottom:50}}>
          <View style={{ flex: 1 ,flexDirection:'column',  backgroundColor:'white' }}>



            {/* {this.state.answerList.map((data) => {
 <Text>11111111111111111111{data.value}</Text>
            })
            } */}
 <View style={{flex:1,flexDirection:'row', marginTop:10,position:'absolute',zIndex:1}}>

<View style={{width:'70%'}}>

</View>
<View style={{width:'30%'}}>
<TouchableOpacity onPress={() => {
this.setModalVisible(!this.state.modalVisible);
}} >
<Icon

  name='md-close'
  type='ionicon'
  color='#517fa4'
/></TouchableOpacity>
</View>

</View>

    <View style={{marginTop:0,paddingTop:0, flex:1}}>
    <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',

    position: 'relative',
    paddingHorizontal:5




    }}>


    <Text style={{ textAlign:'left' }}>{this.state.question}</Text>

    { (this.state.qimage =='' ) ?
  null
 :
 <View style={styles.containers}>

 <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={100}
                       imageHeight={100}>
<Image    style={styles.canvas} resizeMode='contain'
 source={{uri:this.state.qimage}}/>
 </ImageZoom>
     <Text>,,,,,,</Text>
</View>


}
    </View>



    {lapsList}


    <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    position: 'relative',
    paddingHorizontal:5,
    marginTop:5,


    }}>

 <Text styles={{  }}>Solution</Text>

    <ScrollView style={{ flex: 1 }}>
  <Text style={{ textAlign:'left' }}>{this.state.solution}</Text>
            </ScrollView>
    </View>
    {/* <Text>{this.state.image}</Text> */}

  { (this.state.image =='' ) ?
  null
 :
 <View style={styles.container}>

 <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={200}
                       imageHeight={200}>
<Image    style={styles.canvas} resizeMode='contain'
 source={{uri:this.state.image}}/>
 </ImageZoom>
</View>


}




    </View>





          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      flexDirection:'column',
  width:'100%',
  paddingHorizontal:'5%',
      backgroundColor:'#3f23cf'
  },

  block1 : {
  flex:1,
    flexDirection:'column',

    marginTop:5,
    backgroundColor:'white',
    paddingVertical:10,
    justifyContent: 'center',
    paddingHorizontal:3,


  },
  block2: {
    marginTop:5,padding:5,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
    paddingHorizontal:5,

  },

  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop:10


  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width:'100%'
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
