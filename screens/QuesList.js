import React, { Component } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,Dimensions,Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Palette from '../Color';
import Logo from '../components/MinLogo';
import ImageZoom from 'react-native-image-pan-zoom';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
class ExpandableItemComponent extends Component {
  constructor() {
    super();
   
  }
  state = {
    layoutHeight: 0,
  };
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.item.isExpanded) {
  //     this.setState(() => {
  //       return {
  //         layoutHeight: null,
  //       };
  //     });
  //   } else {
  //     this.setState(() => {
  //       return {
  //         layoutHeight: 0,
  //       };
  //     });
  //   }
  // }
  static getDerivedStateFromProps (nextProps,prevState) {
    if (nextProps.item.isExpanded) {

        return {
            layoutHeight: null,
        };

    } else {

        return {
            layoutHeight: 0,
        };

    }
}
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  
 
  render() {

    // const lapsList = this.state.subCategory.map((data,index) => {
    //   return (
    //   <View key={index+1} style={[styles.block2, data.id == this.props.item.correctoption  ? { backgroundColor:'green'}: data.id == this.props.item.my_answer ? { backgroundColor:'red'}:{}]}>
    //     <Text style={[styles.block2, data.id == this.props.item.correctoption  ? { color:'white'}: data.id == this.props.item.my_answer ? { color:'white'}:{}]}>{data.id} )

    //         {data.sub_name}

    //       </Text>


    //     </View>
    //   )})
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={styles.headerText}>{this.props.item.question}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          {/*Content under the header of the Expandable List Item*/}

          {
            this.props.item.qimage != '' ?
            <View style={{flexDirection:'column',flex:1}}>
          <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height/2}
                       imageWidth={300}
                       imageHeight={300}>
<Image    style={{width:300, height:300}}
 source={{uri:this.props.item.qimage}}/>
 </ImageZoom>
          </View>
          :
          <></>
          }

          
          {this.props.item.subCategory.map((data, index) => (

             
            <TouchableOpacity
              key={index}
              style={styles.content}
              //onPress={() => alert('Id: ' + item.id + ' val: ' + item.sub_name)}
              >
         
         
            <View key={index+1} style={[styles.block2, data.id == this.props.item.correctoption  ? { backgroundColor:'green'}: data.id == this.props.item.my_answer ? { backgroundColor:'red'}:{}]}>
            {data.image == '' ? 
        <Text style={[styles.block2, data.id == this.props.item.correctoption  ? { color:'white'}: data.id == this.props.item.my_answer ? { color:'white'}:{}]}>{data.id} )



              
            {data.sub_name} 

          </Text>
          : <Image style={{width:300, height:300}}
          source={{uri:data.image}}/>}


        </View>
              {/* <View style={styles.separator} /> */}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
 
export default class QuesList extends Component {
  //Main View defined under this Class
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { listDataSource: [] };
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
    console.log('My Data List .......' +JSON.stringify( responseJson))

    
     this.setState({

      listDataSource: responseJson
    });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    //   Alert.alert('working'+ this.state.listDataSource.quiz)
       console.log('new data'+ JSON.stringify(this.state.listDataSource));
       this.fetchData();
       this.props.navigation.setParams({ logout: this._logout });

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


           //Alert.alert( userID + "|||" + locationID);
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


 
  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array[index]['isExpanded'] = !array[index]['isExpanded'];
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };
 
  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.topHeading}>Expandable List View {this.props.navigation.state.params.testID}</Text> */}
        <ScrollView>
          {this.state.listDataSource.map((item, key) => (
            <ExpandableItemComponent
              key={item.question}
              onClickFunction={this.updateLayout.bind(this, key)}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  block2: {
    marginTop:5,padding:5,

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
 
//Dummy content to show
//You can also use dynamic data by calling webservice
 