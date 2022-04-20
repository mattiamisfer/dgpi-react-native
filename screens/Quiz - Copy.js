import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './Animbutton';


import { createAppContainer, createSwitchNavigator,NavigationActions   } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator,DrawerActions } from 'react-navigation-drawer';


export default class Quiz extends Component {  
  render() {  
      return <AppContainer />;  
  }  
}  


const { width, height } = Dimensions.get('window')
let arrnew = []
const jsonData = {"quiz" : {
  "quiz1" : {
    "question1" : {
      "correctoption" : "option3",
      "options" : {
        "option1" : "Java",
        "option2" : "PHP",
        "option3" : "Javascript",
        "option4" : "IOS"
      },
      'numberID' :1,
      "question" : "React is a ____ library 0"
    },
    "question2" : {
      "correctoption" : "option4",
      "options" : {
          "option1" : "XML",
          "option2" : "YML",
          "option3" : "HTML",
          "option4" : "JSX"
        },
        'numberID' :2,
      "question" : "____ tag syntax is used in React 1"
    },
    "question3" : {
      "correctoption" : "option1",
      "options" : {
          "option1" : "Single root DOM node",
          "option2" : "Double root DOM node",
          "option3" : "Multiple root DOM node",
          "option4" : "None of the above"
        },
        'numberID' :3,
      "question" : "Application built with just React usually have ____ 2"
    },
    "question4" : {
      "correctoption" : "option2",
      "options" : {
          "option1" : "mutable",
          "option2" : "immutable",
          "option3" : "variable",
          "option4" : "none of the above"
        },
      "question" : "React elements are ____ 3"
    },
    "question5" : {
      "correctoption" : "option3",
      "options" : {
          "option1" : "functions",
          "option2" : "array",
          "option3" : "components",
          "option4" : "json data"
        },
      "question" : "React allows to split UI into independent and reusable pieses of ____ 4"
    },  "question6" : {
      "correctoption" : "option3",
      "options" : {
          "option1" : "functions",
          "option2" : "array",
          "option3" : "components",
          "option4" : "json data"
        },
      "question" : "React allows to split UI into independent and reusable pieses of ____ 5"
    },
    "question7" : {
      "correctoption" : "option3",
      "options" : {
          "option1" : "functions",
          "option2" : "array",
          "option3" : "components",
          "option4" : "json data"
        },
      "question" : "React allows to split UI into independent and reusable pieses of ____ 6"
    },
    
  }
  
}
}

const list = 
{
  "quiz":
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  "quiz":
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  }
}


  



class CategoryScreen extends Component {  
  static navigationOptions = {  
       title: 'Dashboard',  
  };  

  constructor(props) {
    super(props);
 
    this.qno = 0

    const jdata = jsonData.quiz.quiz1
    arrnew = Object.keys(jdata).map( function(k) { 
       return jdata[k]
   // Alert.alert(jdata[k])
     });
  
     this.state = {
      question : arrnew[this.qno].question,
      questionList : arrnew,
      options : arrnew[this.qno].options,
      correctoption : arrnew[this.qno].correctoption,
      countCheck : 0,
      numberVal:arrnew[this.qno].numberID
    }
  }
  // navigateToScreen = (route) => () => {
  //   const navigateAction = NavigationActions.navigate({
  //     routeName: route
  //   });
  //   this.props.navigation.dispatch(navigateAction);
  // }
  componentDidMount() {

    
  }

  go(){
   
      this.qno
     // Alert.alert(this.qno++);    
      Alert.alert('Next is ' + this.qno++);
    
      this.setState({  numberVal:arrnew[this.qno].numberID,countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})
  
  }

  render() {  
      return (  
          <View style={{ marginHorizontal:25, marginVertical:25, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between' }}>  

 {this.state.questionList.map((item, key) => ( 

            <TouchableOpacity key={key+1} 
          
            onPress={this.GetFlatListItem.bind(this, key+1)}
           
              style={{ backgroundColor:'red',padding: 10,}}>

 
<View><Text> { key + 1 }</Text></View>
            </TouchableOpacity>

            

            
 )) }
 
   
 
 
    
          </View>  
      );  
  }  
}  
 class QuizScreen extends Component {
  constructor(props){
    super(props);
    this.qno = 0
    this.score = 0
 
    const jdata = jsonData.quiz.quiz1
    arrnew = Object.keys(jdata).map( function(k) { return jdata[k] });
    this.state = {
      question : arrnew[this.qno].question,
      options : arrnew[this.qno].options,
      correctoption : arrnew[this.qno].correctoption,
      countCheck : 0,
      numberVal:arrnew[this.qno].numberID,
    
     
    }

  }

  _getId() {
   // let id = false;
   
 return  this.props.navigation.state.params.rootID
    }
  

  componentDidMount() {
 Alert.alert('hiiiii' + this._getId())
  }
  prev(){
    if(this.qno > 0){
      this.qno--
      this.setState({  numberVal:arrnew[this.qno].numberID, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})
    }
  }
  next(){
    if(this.qno < arrnew.length-1){
      this.qno+1
     // Alert.alert(this.qno++);    
      console.log('Next is ' + this.qno++);
    
      this.setState({  numberVal:arrnew[this.qno].numberID,countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})
    }else{
      
      this.props.quizFinish(this.score*100/5)
     }
  }
  _answer(status,ans){

    if(status == true){
        const count = this.state.countCheck + 1
        this.setState({ countCheck: count })
        if(ans == this.state.correctoption ){
          this.score += 1
        }
      }else{
        const count = this.state.countCheck - 1
        this.setState({ countCheck: count })
        if(this.state.countCheck < 1 || ans == this.state.correctoption){
        this.score -= 1
       }
      }

  }
  render() {
   const { navigation } = this.props;
    let _this = this
    const currentOptions = this.state.options
    const options = Object.keys(currentOptions).map( function(k) {
      return (  <View key={k} style={{margin:10}}>
        {/* <Animbutton onColor={"blue"} effect={"bounce"} _onPress={(status) => {}} text="Bounce" /> */}

        <Animbutton countCheck={_this.state.countCheck} onColor={"green"} effect={"tada"} _onPress={(status) => _this._answer(status,k)} text={currentOptions[k]} />
    
   {/* <TouchableOpacity countCheck={_this.state.countCheck}   onColor={"green"}  effect={"tada"} onPress={(status) => _this._answer(status,k)}>
   <Text>{currentOptions[k]}</Text>
   </TouchableOpacity> */}
 
      </View>)
    });

    return (
      <ScrollView style={{backgroundColor: '#F5FCFF',paddingTop: 10}}>
      <View style={styles.container}>

      <View style={{ flex: 1,flexDirection: 'column', justifyContent: "space-between", alignItems: 'center',}}>

      <View style={styles.oval} >
        <Text style={styles.welcome}>
          {this.state.question} ______________________________ {this.state.numberVal}
        </Text>
     </View>
        <View>
        { options }
        </View>
        <View style={{flexDirection:"row"}}>
      {
      /*   <Button
          onPress={() => this.prev()}
          title="Prev"
          color="#841584"
        />
        <View style={{margin:15}} />*/}
              <TouchableOpacity onPress={() => this.prev()} >
          <View style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
            <Icon name="md-arrow-round-back" size={30} color="white" />
          </View>
        </TouchableOpacity >

        <TouchableOpacity onPress={() => this.next()} >
          <View style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
            <Icon name="md-arrow-round-forward" size={30} color="white" />
          </View>
        </TouchableOpacity >

        </View>
        </View>

        <View>
          <Text>   
            {/* //     itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))} */}

            itemId: { this._getId()}

</Text>
        </View>
      </View>
      </ScrollView>
    );
  }
}


const DashboardStackNavigator = createStackNavigator(  
  {  
      DashboardNavigator: QuizScreen  
  },  
  {  
      defaultNavigationOptions: ({ navigation }) => {  
      return {  
          headerLeft: (  
              <Icon  
                  style={{ paddingLeft: 10 }}  
                  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}  
                  name="md-menu"  
                  size={30}  
              />  
          )  
      };  
      }  
  }  
);  

 
const AppDrawerNavigator = createDrawerNavigator({  
  Dashboard: {  
      screen: DashboardStackNavigator  
  }, 


}, {
  headerMode: 'none',
  initialRouteName: 'Dashboard',
  contentComponent: props => <CategoryScreen {...props}/>
});  

const AppSwitchNavigator = createSwitchNavigator({  
  Dashboard: { screen: AppDrawerNavigator },  
  QuizBlock: {
    screen:DashboardStackNavigator
  }
  

});  

const styles = StyleSheet.create({

  oval: {
  width: width * 90/100,
  borderRadius: 20,
  backgroundColor: 'green'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    margin: 15,
    color: "white"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


const AppContainer = createAppContainer(AppSwitchNavigator);  