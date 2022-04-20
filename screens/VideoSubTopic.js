import React from 'react';
import {StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform,TouchableOpacity} from 'react-native';
// import { ListItem } from 'react-native-elements'
import { ListItem,Icon } from 'react-native-elements'
import Palette from '../Color';

import Logo from '../components/MinLogo';


class VideoTopic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading:true,
            userID :this.props.navigation.state.params.userID,
            locationID:this.props.navigation.state.params.locationID


        }
    }

    fetchData = () => {
      return fetch('http://35.153.195.92/appmotivenew/videotopiclist.php', {
        method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        locationID: this.state.locationID,
        userID: this.state.userID,
        topicID :this.props.navigation.state.params.topicID
     
  
     
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
       console.log(responseJson)
       this.setState({
        isLoading: false,
        dataSource: responseJson.main
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
    //Alert.alert(this.props.navigation.state.params.topicID);
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
 

 
      keyExtractor = (item, index) => index.toString();
      renderItem = ({ item }) => (
       
        <TouchableOpacity style={{width:'100%'}} 

        disabled={item.user}
        onPress={() => {this.props.navigation.navigate('VideoList', {
          userID:this.state.userID,
          locationID:this.state.locationID,
          topicID:item.test_id,
          

        })}}> 
        <ListItem style={{width:'100%',backgroundColor:'orange'}}
          title={item.title}
       
       
           bottomDivider
          chevron
        />


         
        </TouchableOpacity>
       
      )

     
render() {
  if (this.state.isLoading) {
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
      </View>
    );
  }
    const { navigation } = this.props;
    return (
        <View style={styles.screen}>

    {/* <Text>User ids { navigation.state.params.userID} || { navigation.state.params.locationID}</Text> */}
  
  
     
   <View style={{width:'100%'}}>
   <FlatList
      keyExtractor={this.keyExtractor}
      data={ this.state.dataSource }
      renderItem={this.renderItem}
    />
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
    backgroundColor:Palette.primaryBG
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

export default VideoTopic;