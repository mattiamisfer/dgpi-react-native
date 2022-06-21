import React from 'react';
import {StyleSheet, View, Text, Button, Alert, TouchableOpacity, ScrollView, Dimensions,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// / @react-native-async-storage/async-storage
import { SliderBox } from "react-native-image-slider-box";
import MarqueeText from 'react-native-marquee';
import { ListItem,Icon } from 'react-native-elements'

import Logo from '../components/MinLogo';

import Swiper from 'react-native-swiper';
import Palette from '../Color';
const { width } = Dimensions.get('window');

const  renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'grey' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}
 class  HomeScreen  extends React.Component {
    // static navigationOptions = {
    //   title:'Hello'
    // }

    constructor(props) {
        super(props);
        this.state = {

            userData: '',
            userID:'',
            loggedIn:'',
            locationID:'',
            value: 50,
            images: [],
            topics:'',
            material:'',
            video:'',
            fcmToken:'',
            latest:'',
            bonus:'',
            proimages:[]

        };

    }


    async getToken(user) {
        try {
            let userData = await AsyncStorage.getItem("userData");
            let _userID = await AsyncStorage.getItem("userID");
            let _locationID = await AsyncStorage.getItem("locationID");
            let _tokenID =             await AsyncStorage.getItem('fcmToken');

            const tokenID = JSON.parse(_tokenID);
            const data = JSON.parse(userData);
            const userID = JSON.parse(_userID);
            const locationID = JSON.parse(_locationID);
            this.setState({ loggedIn: data });
            this.setState({ userID: userID });
            this.setState({locationID:locationID});
            this.setState({fcmToken:tokenID});


            // Alert.alert(this.state.fcmToken);
            // this.state.userData.map((data) => {
            // console.log(data.id);
            // });
            // Alert.alert(data);
            console.log('results' + data);

        } catch (error) {
            console.log("Something went wrong", error);
        }
    }








    async  insertToken  () {

        try {


            let _userID = await AsyncStorage.getItem("userID");
            let _locationID = await AsyncStorage.getItem("locationID");
            let _tokenID =  await AsyncStorage.getItem('fcmToken');

            const userID = JSON.parse(_userID);
            // consdt locationID = JSON.parse(_locationID);


            this.setState({ userID: userID});
            this.setState({fcmToken:await AsyncStorage.getItem('fcmToken')});
            return fetch('http://35.153.195.92/appmotivenew/inserttoken.php', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({


                    token:this.state.fcmToken,

                    // locationID: this.state.locationID,
                    userVal:this.state.userID,




                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log('My Data' + responseJson.img)

                    //  Alert.alert(responseJson.msg);
                })
                .catch((error) => {
                    console.error(error);
                });

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
            this.setState({locationID:locationID});
            //Alert.alert(this.state.locationID);

            return fetch('http://35.153.195.92/appmotivenew/home.php', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({




                    //    locationID: this.state.locationID,
                    userVal:this.state.userID



                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log('My Data' + responseJson.img)

                    this.setState({

                        topics:responseJson.topic,
                        material:responseJson.material,
                        video:responseJson.video,
                        latest:responseJson.latest

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

    fetchData = () => {
        return fetch('http://35.153.195.92/appmotivenew/sliderimg.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({




                // locationID: this.state.locationID,
                // userID: this.state.userID



            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('My Data' + responseJson.img)
                this.setState({

                    images: responseJson.img
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }




    fetchDataProf = () => {
        return fetch('http://35.153.195.92/appmotivenew/profimages.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({




                // locationID: this.state.locationID,
                // userID: this.state.userID



            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                 this.setState({

                    proimages: responseJson.img
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }








    change(value) {
        this.setState(() => {
            return {
                value: parseFloat(value),
            };
        });
    }


    componentDidMount() {

        this.insertToken();
        this.getToken();
        this.fetchData();
        this.fetchDetails();
        this.fetchDataProf();
        this.props.navigation.setParams({ logout: this._logout });

    }

    // logOut =() => {

    //   console.log('Sign Out');
    // //  this.props.navigation.navigate('_signOut');
    // }
    _logout = () => {
        //alert('logout');
        this.props.navigation.navigate('_signOut');
    }
    static navigationOptions = ({ navigation })  => {

        return {

            headerTitle: (props) => <Logo />,
            headerRight: () => (
                // <TouchableOpacity style={styles.logOut} onPress={navigation.getParam('logout')} >
                //     <Icon

                //         name='md-log-in'
                //         type='ionicon'
                //         color='#496bea'
                //         size={30}

                //     />
                // </TouchableOpacity>
                <TouchableOpacity style={styles.drownerButton} onPress={navigation.getParam('logout')} > 
            <Icon

        name='md-log-in'
        type='ionicon'
        color='#697796'
        size={30}

    /> 
            </TouchableOpacity>

            ),headerStyle: {
                backgroundColor: Palette.primaryBG
                
            },


        }
    }



    render() {


        const {value} = this.state;
        // const lapsList = this.state.userData.map((data) => {
        //   return (
        //     <View><Text>{data.id}</Text></View>
        //   )
        // })
        const list = [
            {
                type:  this.state.topics,
                name: 'DGPI Test Series',
                avatar_url: 'http://35.153.195.92/backend/icons/questionbank.png',
                subtitle: 'Vice President',
                icon: 'av-timer',
                path:'TopicList',
                param: {
                    userID:this.state.userID,
                    locationID:this.state.locationID
                }
            },

            {
                type:   this.state.latest,
                name: 'DGPI Q Bank' ,
                avatar_url: 'http://35.153.195.92/backend/icons/testseries.png',
                subtitle: 'Vice President',
                icon: 'av-timer',
                path:'BonusScreen',
                param: {
                    userID:this.state.userID,
                    locationID:this.state.locationID
                }
            },
            {
                type: this.state.video,
                name: 'TM Image & Video',
                avatar_url: 'http://35.153.195.92/appmotivenew/mouse.png',
                subtitle: 'Vice President',
                icon: 'md-arrow-forward',
                path:'VideoTopic',
                param: {
                    userID:this.state.userID,
                    locationID:this.state.locationID
                }
            },

            {
                type: this.state.material,
                name: 'DGPI E Notes',
                avatar_url: 'http://35.153.195.92/backend/icons/enotes.png',
                subtitle: 'Vice President',
                icon: 'arrow-forward-ios',
                path:'MaterialScreen',
                param: {
                    userID:this.state.userID,
                    locationID:this.state.locationID
                }
            },

        ]

        return (

            <ScrollView>
                <View style={styles.screen}>
                    {/* <TouchableOpacity onPress={ () => {
             this.props.navigation.navigate('TopicList', {
              itemId: 86,
              otherParam: 'Misfer',
            });
           }}>
           

    <Text>Logouts...</Text>
           </TouchableOpacity> */}

                    {/* <View style={{alignItems:'center',marginVertical:'2%'}}>
                        <Text style={{color:Palette.textColor,fontSize:18}}>Welcome ! </Text>
                    </View> */}

                    <View style={styles.container}>


                        <SliderBox
                            autoplay={true}
                            circleLoop
                            images={this.state.images}

                        />

                    </View>

                    <View style={{flexDirection:'row',width:'90%',marginVertical:5}}>
                        <Text style={{flex:1}}>FMGE</Text>
                        <Text style={{flex:1}}>NEET PG</Text>
                        <Text style={{flex:1}}>NEXT</Text>
                        <Text style={{flex:1}}>CROCK</Text>
                    </View>

                    <View style={{ width:'90%',flex:1,marginBottom:2}}>
                        {
                            list.map((item, i) => (
                                <View>
                                    { item.type == 0 ?  null :
                                        <TouchableOpacity style={{paddingVertical:'1%',marginBottom:'1%',flex:1,flexDirection:'column'}}  key={i} onPress={() => {  this.props.navigation.navigate(item.path, {
                                            userID:item.param.userID,
                                            locationID:item.param.locationID

                                        })}}>
                                            <ListItem
                                                style={{paddingVertical:0}}
                                                leftAvatar={{ source: { uri: item.avatar_url } }}
                                                title={item.name}


                                                rightIcon={ <Icon
                                                    name='arrow-forward-ios'
                                                    type='MaterialIcons'
                                                    color='#111111'
                                                />}

                                                bottomDivider

                                            />
                                        </TouchableOpacity>
                                    }
                                </View>
                            ))
                        }
                    </View>

                    

                    <View style={styles.maxcontainer}>

                        <ScrollView horizontal={true}>
                            {this.state.proimages.map((person, index) => (
                            <View style={styles.proimagecontainer}>
                                <Image source={{uri:person.images}}     style={styles.proimage}/>


                                <Text style={styles.textone}> {person.text }</Text>
                                <Text style={styles.textdesc}> {person.decision }</Text>

                            </View>
                                ))}
                        </ScrollView>



                    </View>


                    <View style={styles.containerMarque}>
                        {/* <MarqueeText
          style={{ fontSize: 24 }}
          duration={30000}
          marqueeOnStart
          loop
          marqueeDelay={10000}
          marqueeResetDelay={10000}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry.
        </MarqueeText> */}

                        <Text>
                        DPGI Is group of young and dynamic professionals who are driven by the zeal of making it big. As Lead by Young Leader so Its Obvious that DPGI is driven by right mix of technology and innovation which is necessary for an institution who imparts coaching to FMGE / NEXT / NEETPG.
Our Coaching Ecosystem is perfectly balance by Best of the Best Faculties, versatile support staff, state of the art infrastructure and able leadership, results in exemplary outcome for aspiring doctors.
In our successful journey so far, we have helped more than 5,000 doctors in passing FMGE with Good Results.



                         </Text>
                    </View>
                </View></ScrollView>
        );
    }
}





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
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop:10
    },

    maxcontainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom:20,
        marginTop: 10
    },
    text: {
        fontSize: 50,
        textAlign: 'center',
    },
    containerMarque : {
        flex: 1,
        justifyContent: 'center',
        paddingVertical:5,
        paddingHorizontal:10
    },
    wrapper: {
        height: 200,
        backgroundColor:'grey'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    texts: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        height:200,
        flex: 1,
        resizeMode: 'contain'
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    },
    proimage: {
        height: 80,
        width: 80,
       // borderRadius: 40,
    },
    proimagecontainer :{
marginTop:10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
borderRadius: 40,
        flex:1
    },
    textone: {
        fontSize:12
    },
    textdesc: {
        fontSize:10,
        color:'red', fontWeight:'bold'
    },
    drownerButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        elevation: 10,
        backgroundColor: Palette.primaryBG,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:20
    },
    box: {
        height: 10,
        width: 10,
        backgroundColor: '#697796',
        borderRadius: 1,
        margin: 2,
    }

});

export default HomeScreen;
