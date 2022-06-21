import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity, Alert,Linking} from 'react-native';
import Logo from '../components/MinLogo';
import Icon from 'react-native-vector-icons/Ionicons';
import Video, { ScrollView, Container } from 'react-native-af-video-player'
import Orientation from 'react-native-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';



class VideoSecond extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,

            screenType: 'cover',
            loggedIn:'',
            userID:'',
            locationID:'',
            videoPath:'',
            subject:'',
            topic:'',
            faculty:'',
            profName:'',
            positions:'',
            img:'',
            fbpage:'',
            listDataSource:[],

            notAvailable:''



        }
    }


    _logout = () => {
        //alert('logout');
        this.props.navigation.navigate('_signOut');
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
        return fetch('http://35.153.195.92/appmotivenew/videopath.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                //   userID : this.props.navigation.state.params.userID,
                //   locationID: this.props.navigation.state.params.locationID,
                //   topicID :this.props.navigation.state.params.topicID,

                Vid:this.props.navigation.state.params.Vid

                // locationID: this.state.locationID,
                // userID: this.state.userID



            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //  console.log('My Data' + responseJson)
                this.setState({

                    videoPath: responseJson.path,
                    subject:responseJson.subject,
                    topic:responseJson.topicName,
                    faculty:responseJson.faculty,
                    profName:responseJson.prof,
                    img: responseJson.img,
                    fbpage:responseJson.fbpage

                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }



    // onSeek = seek => {
    //   //Handler for change in seekbar
    //   this.videoPlayer.seek(seek);
    // };

    // onPaused = playerState => {
    //   //Handler for Video Pause
    //   this.setState({
    //     paused: !this.state.paused,
    //     playerState,
    //   });
    // };



    // onReplay = () => {
    //   //Handler for Replay
    //   this.setState({ playerState: PLAYER_STATES.PLAYING });
    //   this.videoPlayer.seek(0);
    // };

    times = (num) => {
        const hours = Math.floor(num / 60);
        const minutes = num % 60;
        return hours + ":" + Math.round(minutes);
    }



    // onProgress = data => {
    //   const { isLoading, playerState } = this.state;
    //   // Video Player will continue progress even if the video already ended
    //   if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
    //     this.setState({ currentTime: data.currentTime });
    //   }
    // };

    // onLoad = data => this.setState({ duration: data.duration, isLoading: false });

    // onLoadStart = data => this.setState({ isLoading: true });

    // onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

    // onError = () => alert('Oh! ', error);

    // exitFullScreen = () => {
    //   alert('Exit full screen');
    // };

    // enterFullScreen = () => {};

    // onFullScreen = () => {
    //   if (this.state.screenType == 'content')
    //     this.setState({ screenType: 'cover' });
    //   else this.setState({ screenType: 'content' });
    // };

    // onSeeking = currentTime => this.setState({ currentTime });

    fetchDataList = () => {

        // Alert.alert(this.props.navigation.state.params.topicID);
        return fetch('http://35.153.195.92/appmotivenew/test-videolist.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                userID :this.props.navigation.state.params.userID,
                locationID:this.props.navigation.state.params.locationID,
                testiD : this.props.navigation.state.params.topicID

                //   userID : this.props.navigation.state.params.userID,
                //   locationID: this.props.navigation.state.params.locationID,
                //   topicID :this.props.navigation.state.params.topicID,



                // locationID: this.state.locationID,
                // userID: this.state.userID



            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //  console.log('My Data' + responseJson)

                //   Alert.alert(responseJson.success+ 'sssssss');

                if(responseJson.success ===1) {
                    this.setState({

                        listDataSource: responseJson.response
                    }, function() {
                        // In this block you can do something with new state.
                    });
                }
                else {
                    this.setState({
                        notAvailable:'Sorry No Videos Under this Topic'

                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    pause(id) {

        // Alert.alert(id)

        this.video.pause();
        this.props.navigation.navigate('VideoPlayer',
            {
                Vid : id,
                userID :this.props.navigation.state.params.userID,
                locationID:this.props.navigation.state.params.locationID,
                topicID : this.props.navigation.state.params.topicID
            })

    }

    componentWillMount() {

        // The getOrientation method is async. It happens sometimes that
        // you need the orientation at the moment the JS runtime starts running on device.
        // `getInitialOrientation` returns directly because its a constant set at the
        // beginning of the JS runtime.


        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            // do something

            this.setState({
                positions:'PORTRAIT'
            })
        } else {
            // do something else
            // Alert.alert('Landscape')

            this.setState({
                positions:'LANDSCAPE'
            })
        }
    }
    componentDidMount() {


        this.fetchDataList();


        this.fetchData();
        this.props.navigation.setParams({ logout: this._logout });
        // Orientation.lockToPortrait();

        // Orientation.addOrientationListener(this.onFullScreen);
        this.props.navigation.setParams({
            fullscreen: true
        })

    }


    onFullScreen(status) {
        // Set the params to pass in fullscreen status to navigationOptions

        this.props.navigation.setParams({
            fullscreen: !status
        });
        if (status === true) {
            // do something with landscape layout

            this.setState({
                positions:'LANDSCAPE'
            })

        } else {
            // do something with portrait layout
            this.setState({
                positions:'PORTRAIT'
            })
        }
    }

    onMorePress() {
        Alert.alert(
            'Boom',
            'This is an action call!',
            [{ text: 'Aw yeah!' }]
        )



    }

    componentWillUnmount() {
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });


        // Remember to remove listener
        // Orientation.removeOrientationListener(this._orientationDidChange);
        Orientation.removeOrientationListener(this.onFullScreen);

    }









    static navigationOptions = ({ navigation })  => {
        const { state } = navigation
        const header = state.params && (state.params.fullscreen ? undefined : null)


        return   {
            header,


            headerTitle: (props) => <Logo />,
            headerRight: () => (
                <TouchableOpacity style={styles.logOut} onPress={navigation.getParam('logout')} >

                    <Icon

                        name='md-log-in'
                        type='ionicon'
                        color='#496bea'
                        size={30}

                    />

                </TouchableOpacity>


            ), headerRightStyle: {
                backgroundColor:'#4A94FB',
                borderBottomColor: 'transparent',
            }


        }

    }










    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.screen}>
                { this.state.positions ==='PORTRAIT' ?

                    <View style={{justifyContent:'space-between',alignContent:'center',alignItems:'center',flexDirection:'row',width:'90%',paddingHorizontal:5}}>
                        <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                            <Text style={{ fontSize:18}}>{this.state.subject} </Text>
                        </View>
                    </View> : null }
                { this.state.positions ==='PORTRAIT' ?
                    <View style={{justifyContent:'space-between',flexDirection:'row',width:'90%',paddingHorizontal:5}}>
                        <View>
                            <Text style={{ fontSize:18,fontStyle: 'italic' }}>{this.state.topic}</Text>
                        </View>
                    </View> : null }

                { this.state.positions ==='PORTRAIT' ?
                    <View style={{flexDirection:'row',width:'90%',justifyContent:'space-between',paddingHorizontal:5}}>

                        <Text>{this.state.profName}</Text>



                        <TouchableOpacity  underlayColor={'gray'} style={{padding:5}} onPress={() => Linking.openURL( this.state.fbpage)}>
                            <Text>  FB Profile</Text>
                        </TouchableOpacity>



                    </View> : null }

                <Container style={styles.videoContainer}>
                    <Video
                        autoPlay
                        url={this.state.videoPath}
                        title={this.state.topic}
                        //  logo={img}
                        placeholder={this.state.topic}
                        // onMorePress={() => this.onMorePress()}
                        onFullScreen={status => this.onFullScreen(status)}
                        rotateToFullScreen
                        ref={(ref) => { this.video = ref }}
                    />
                </Container>

                {/* <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{ uri: this.state.videoPath }}
          style={styles.mediaPlayer}
          volume={10}
        /> */}





                {/* <MediaControls

          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="red"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}

        /> */}
                <ScrollView>
                    <View style={styles.screenscroll}>




                        {this.state.notAvailable !='' ?
                            <Text style={{color:'red',fontSize:18,fontWeight:'bold'}}>{this.state.notAvailable}</Text> :
                            null
                        }


                        {this.state.listDataSource.map((data, index) => (

// {data.user ===1 ? }
                            <TouchableOpacity disabled={data.user}

                            //                   onPress={() =>
                            //     navigate('VideoSecond',{
                            //         Vid : data.id,
                            //         userID :this.props.navigation.state.params.userID,
                            //         locationID:this.props.navigation.state.params.locationID,
                            //         topicID : this.props.navigation.state.params.topicID
                            //     })
                            // }

                                              onPress={() => this.pause(data.id)}
                            >
                                {data.id == this.props.navigation.state.params.Vid ? null :
                                    <View key={index} style={{width:'80%',paddingHorizontal:5,flexDirection:'row',backgroundColor:'#3f23cf',marginVertical:5,paddingVertical:5}}>
                                        <View style={{justifyContent:'flex-start',paddingRight:10}}>

                                            {data.show ==='show' ?
                                                // <Image source={require('../assets/src/video-player.png')} style={{width: 50, height:50}} />
                                                <Image source={{uri: data.img}}  style={{width: 50, height:50}} />
                                                :
                                                <Image source={require('../assets/src/paid.png')} style={{width: 50, height:50}} />
                                            }
                                        </View>
                                        <View style={{ alignItems:'center', justifyContent:'center',flexDirection:'column',flex:1
                                        }}>




                                            <View>
                                                <Text style={styles.font}>{data.topic_name}   </Text>
                                            </View>

                                            <View style={{ alignItems:'flex-start'}}>
                                                <Text style={styles.font}>{data.professor}    </Text>
                                            </View>




                                        </View>
                                    </View>
                                }
                            </TouchableOpacity>
                        ))}


                    </View></ScrollView>

            </View>
        );
    }
};




const styles = StyleSheet.create({
    screen: {
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // alignContent: 'space-between',
        flexDirection:'column'


    },
    font: {
        color:'#fafafa',
        fontSize:12,
    },
    logOut: {
        marginRight:10
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {

        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        width:'100%',
        height:225
    },
    devide : {
        flexDirection:'row', justifyContent:'space-between',marginHorizontal:25
    },
    screenscroll: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent: 'space-between',
        flexDirection:'column',

        backgroundColor:'#eaeaea'
    },

});

export default VideoSecond;
