import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,FlatList,Image, Alert,RefreshControl,ActivityIndicator} from 'react-native';
import Logo from '../components/MinLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem,Icon } from 'react-native-elements'
import Palette from '../Color';
export default class ResultListScreen extends React.Component{

    constructor(props) {

        super(props)
        this.state = {
            list:[],
            userData: '',
            userID:'',
            loggedIn:'',
            refreshing:true
        }

        this.getData();
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


    fetchData =   () => {




        return fetch('http://35.153.195.92/appmotivenew/test-resultloadall.php', {
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
     console.log('My Data List' + responseJson.list)
         this.setState({

          list: responseJson
        }, function() {
          // In this block you can do something with new state.
        });
        })
        .catch((error) => {
          console.error(error);
        });
      }




    // static navigationOptions = ({ navigation })  => {

    //     return {

    //      headerTitle: (props) => <Logo />,
    //      headerRight: () => (
    //        <TouchableOpacity style={styles.logOut} onPress={navigation.getParam('logout')} >
    //        <Icon

    //        name='md-log-in'
    //        type='ionicon'
    //        color='#496bea'
    //        size={30}

    //        />
    //        </TouchableOpacity>

    //      ), headerRightStyle: {
    //       backgroundColor:'#4A94FB',
    //       borderBottomColor: 'transparent',
    //      }


    //      }
    //  }


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



     async getData() {
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
    this.fetchData();
    this.setState({refreshing: false});
     }


          componentDidMount() {
      //     try {
      //       let userData = await AsyncStorage.getItem("userData");
      //       let _userID = await AsyncStorage.getItem("userID");
      //       let _locationID = await AsyncStorage.getItem("locationID");

      //       const data = JSON.parse(userData);
      //       const userID = JSON.parse(_userID);
      //       const locationID = JSON.parse(_locationID);
      //  this.setState({ loggedIn: data,userID: userID,locationID:locationID  });


      //     console.log('results' + this.state.userID);

      //     } catch (error) {
      //       console.log("Something went wrong", error);
      //     }
      //   this.fetchData();


        this.props.navigation.setParams({ logout: this._logout });




    }
    _logout = () => {
      //alert('logout');
      this.props.navigation.navigate('_signOut');
    }
     keyExtractor = (item, index) => index.toString();
     renderItem = ({ item,index }) => (

      <TouchableOpacity  onPress={() =>
        this.props.navigation.navigate('TabScreen',{
          testID:item.testID,
          userID:this.state.userID
        })
      }>

        <View style={{ borderRadius:5, borderColor:'#f0ffff', borderWidth: 1,flex:1,flexDirection:'column',backgroundColor:'#ffffff',marginVertical:5,padding:5 }} >
            <View style={{flexDirection:'row',flex:1}}>
           <View style={{ width:'70%'}}>
           <Text style={{ fontSize:12}}>{item.title}.</Text>
           </View>
           <View style={{ width:'20%',}}>
           <Text style={{ fontSize:12}}></Text>
           </View>

            </View>

            <View style={{  marginTop:2, flexDirection:'row',flex:1,alignContent:'space-between', justifyContent:'space-between'}}>

                <View style={{flexDirection:'row' }}>
                <View>
                <Image source={require('../assets/path/target.png')} style={{width: 20, height:20}} />
                </View>
                <View style={{paddingTop:2}}>
                    <Text>{item.maxMark} Mark   </Text>
                </View>
                </View>

                <View style={{flexDirection:'row', }}>
                <View>
                <Image source={require('../assets/path/icon.png')} style={{width: 20, height:20}} />

                </View>
                <View style={{paddingTop:2}}>
                    <Text>{item.totalQuestion} Question</Text>
                </View>
                </View>


                <View style={{flexDirection:'row'}}>
                <View>
                <Image source={require('../assets/path/alarm.png')} style={{width: 20, height:20}} />
                </View>
                <View style={{paddingTop:2}}>
     <Text>{item.maxTime} Min</Text>
                </View>
                </View>

            </View>



            <View style={{ flexDirection:'row',flex:1,alignContent:'space-between', justifyContent:'space-between',marginTop:3}}>

<View style={{flexDirection:'row' }}>
<View>
<Image source={require('../assets/path/add.png')} style={{width: 20, height:20}} />
</View>
<View style={{paddingTop:2}}>
    <Text>Mark {item.plusMark}  </Text>
</View>
</View>

<View style={{flexDirection:'row', }}>
<View>
<Image source={require('../assets/path/subtract.png')} style={{width: 20, height:20}} />

</View>
<View style={{paddingTop:2}}>
    <Text>Mark {item.minusMark}  </Text>
</View>
</View>


<View style={{flexDirection:'row'}}>
<View>
<Image source={require('../assets/path/sigma.png')} style={{width: 20, height:20}} />
</View>
<View style={{paddingTop:2}}>
<Text>{item.rank} </Text>
</View>
</View>

</View>

            <View>

            </View>

        </View>
        </TouchableOpacity>
     );

     onRefresh() {
      //Clear old data of the list
      this.setState({ list: [] });
      //Call the Service to get the latest data
      this.getData();
    }
     render() {
      if (this.state.refreshing) {
        return (
          //loading view while data is loading
          <View style={{ flex: 1, paddingTop: 20 }}>
            <ActivityIndicator />
          </View>
        );
      }

         return(
             <>

             <View style={styles.screen}>

<FlatList
      data={this.state.list}

      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
      // refreshing={this.state.refreshing}
      // onRefresh={this.handleRefresh}
      refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
        />
      }
    />
             </View>

             </>
         )
     }
};


const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent: 'space-between',
        flexDirection:'column',

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

