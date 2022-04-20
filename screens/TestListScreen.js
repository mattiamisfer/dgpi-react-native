/*Example of Expandable ListView in React Native*/
import React, { Component } from 'react';
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
  Alert
} from 'react-native';
//import basic react native components
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Palette from '../Color';

import Logo from '../components/MinLogo';
import LinearGradient from 'react-native-linear-gradient';

class ExpandableItemComponent extends Component {


  //Custom Component for the Expandable List
  constructor() {
    super();
    // this.state = {
    //   layoutHeight: 0,
    // };

   // this.onPress = this.onPress.bind(this);
  }
  state = {
    layoutHeight: 0,

  }
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


    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={styles.headerText}>{this.props.item.category_name}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
            marginVertical:5
          }}>
          {/*Content under the header of the Expandable List Item*/}
          {this.props.item.subcategory.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.content}
               >
              {/* <Text style={styles.text}>
                {key}. {item.title}
              </Text> */}
              <LinearGradient style={{flexDirection:'column',alignContent:'center',alignItems:'center'}}  colors={['#ffa726', '#fb8c00']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
               > 

               <Text style={{color:'white'}}> {item.title}</Text>
                  <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',}}>
                    <View  style={styles.block3}>
                     <Image source={{uri: item.pimg}} style={{width: 40, height: 40}} />




                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                      <View style={styles.block3}>
                      <Icon

  name='star'
  type='font-awesome'
  color='#517fa4'
/>
                      <Text style={styles.blockText}>{item.subjectMark} Marks</Text>

                      </View>
                      <View style={styles.block3}>
                      <Icon

  name='question'
  type='font-awesome'
  color='#517fa4'
/>
                      <Text style={styles.blockText}>{item.total_question} Questions</Text>

                      </View>
                      <View style={styles.block3}>
                      <Icon

  name='clockcircleo'
  type='antdesign'
  color='#517fa4'
/>
                      <Text style={styles.blockText}>{item.max_time} Min</Text>

                      </View>
                      <View style={styles.block3}>

{item.display =='show' ?

 item.complated == 'complated' ?

<TouchableOpacity>
<Icon

 name='play-circle'
 type='font-awesome'
 color='#ff0000'
 />
</TouchableOpacity> :
<TouchableOpacity     onPress={  this.props.onPressFunction}>
<Icon

 name='play-circle'
 type='font-awesome'
 color='#23ca2f'
 />


</TouchableOpacity>


//  <TouchableOpacity>
//  <Icon

//  name='play-circle'
//  type='font-awesome'
//  color='#ff0000'
//  />

//  </TouchableOpacity>

:
<Image source={require('../assets/src/paid.png')} style={{width: 40, height:40}} />


  }

 </View>

                    </View>

                  </View>
              </LinearGradient>
              <View style={styles.separator} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default class TestListScreen extends Component {
  //Main View defined under this Class
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { listDataSource: [],


    };
  }

  fetchData = () => {
    return fetch('http://35.153.195.92/appmotivenew/test-topiclistmain.php', {
      method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  userID : this.props.navigation.state.params.userID,
  locationID: this.props.navigation.state.params.locationID,
  topicID :this.props.navigation.state.params.topicID,



      // locationID: this.state.locationID,
      // userID: this.state.userID



    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
   //  console.log('My Data' + responseJson)
     this.setState({

      listDataSource: responseJson
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
       backgroundColor:Palette.primaryBG}


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


  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    //For Single Expand at a time
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false)
    );

    //For Multiple Expand at a time
    //array[index]['isExpanded'] = !array[index]['isExpanded'];
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };
  onPress(id) {
   // Alert.alert('Value' + JSON.stringify(id));

    const { navigate } = this.props.navigation;
        navigate('Instuction',{ chapter_id:id });
  }
  render() {
    return (
      <View style={styles.container}>

        <ScrollView>
          {this.state.listDataSource.map((item, key) => (
            <ExpandableItemComponent
              key={item.category_name}
              onClickFunction={this.updateLayout.bind(this, key)}
              onPressFunction={this.onPress.bind(this, item.chapter_id)}
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
    paddingTop: 0,
    backgroundColor: Palette.primaryBG
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    backgroundColor: Palette.white,
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
    fontSize: 10,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },

  block3: {
    flexDirection:'column',
    alignContent:'space-between',
    alignItems:'stretch'



  },
  blockText: {
   fontSize:10
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

//Dummy content to show
//You can also use dynamic data by calling webservice
