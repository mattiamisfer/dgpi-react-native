import React from 'react'
import { PieChart } from 'react-native-svg-charts'
  import { View,Text,AsyncStorage,TouchableOpacity,StyleSheet }  from 'react-native';
  import Logo from '../components/MinLogo';
 import { ListItem,Icon } from 'react-native-elements'
 import Palette from '../Color';
class Graph extends React.PureComponent {

constructor(props) {
  super(props)

  this.state = {
    // data:[]

    rightans:'',
    wrongans:'',
    leftques:''
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

  fetchData = () => {
    return fetch('http://35.153.195.92/appmotivenew/load-graph.php', {
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

      rightans: responseJson.rightans,
      wrongans: responseJson.wrongans,
      leftques: responseJson.leftQues
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

    render() {

        const data = [
            {
                key: 1,
                amount: this.state.rightans,
                svg: { fill: 'green' },
                text:'Right Answer'
            },

            {
                key: 2,
                amount: this.state.wrongans,
                svg: { fill: 'red' },
                text:'Wrong Answer'
            },
            {
                key: 3,
                amount: this.state.leftques,
                svg: { fill: '#dcddd4' },
                text:'Left Question'
            }
        ]

const display =() => {
return(
  <View>

    <Text>Hello</Text>
  </View>
);
}

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                   <View style={{marginTop:100}}>
                      <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        margin={50}
                        alignmentBaseline={'middle'}
                        fontSize={12}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                   {data.amount}   -       {data.text}
                    </Text>
                   </View>
                )
            })
        }


        return (
       <View style={{ backgroundColor:'#3f23cf',paddingVertical:50,flex:1,flexDirection:'column'}}>
      <View style={{flex:1,flexDirection:'row',paddingHorizontal:10,alignContent:'space-between',justifyContent:'center'}}>
      {
    data.map((l, i) => (
    <View style={{flex:1,backgroundColor:l.svg.fill,justifyContent:'center',height:40,alignContent:'center',paddingHorizontal:5}}>
         <Text>{l.text} - {l.amount}</Text>
      </View>
    ))
  }


      </View>
      <View>
<PieChart
                style={{ height: 200 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                outerRadius={'95%'}
            >



            </PieChart>


</View>


       </View>
        )
    }


}



const styles = StyleSheet.create({
   
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

export default Graph;
