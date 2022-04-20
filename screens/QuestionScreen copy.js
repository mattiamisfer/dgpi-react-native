import React  from 'react';
import {   Alert,Text, View, Button , Animated, Image, TouchableOpacity,TouchableHighlight,FlatList, StyleSheet, Platform,Dimensions,ScrollView,animating,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton} from 'react-native-paper';
 import CountDown from 'react-native-countdown-component';
   import Modal from "react-native-modal";
  import ImageZoom from 'react-native-image-pan-zoom';
import ImageViewer from 'react-native-image-zoom-viewer';
import PhotoView from 'react-native-photo-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Palette from '../Color';
import LinearGradient from 'react-native-linear-gradient';
//import { white } from 'react-native-paper/lib/typescript/src/styles/colors';

const DRAWER_WIDTH = 300;

const SampleArray  = [{
'answer':1

}]

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const { width, height } = Dimensions.get('window')

export default class QuestionScreen extends React.Component {



  constructor(props) {
    super(props);
    this.qno = 1
    this.score = 0
    this.ans=0
 let arrnew = [] ;
 let arrnews = [] ;
    this.animatedValue = new Animated.Value(0);
    this.state = { disabled: false }
    this.toggleFlag = 0;




  //   const jdata = jsonData.quiz.quiz1
  // arrnew = Object.keys(jdata).map( function(k) { return jdata[k] })

    this.state = {
      question : '',
      options :'',

     // correctoption : arrnew[this.qno].correctoption,
      countCheck : 0,
      numberVal:'',
      questionList :[],

      checked: '',
      check:'1',
      jsonData:'',
      timer:'',
      quesNo:'',
      lastQues : '',
      userData: '',
      userID:'',
      loggedIn:'',
      locationID:'',
      color:'',
      number:'',
      textID:'',
      answerID:'',
      quesMark:'',
      value:'',
      checkVal:'',
      answerIDs:'',
      quesIDS:'',
      answerPalete:[],
      answerP:'',
      refreshing:true,
      modalVisible: false,
      instructions:'',
      screenWidth: screenWidth, screenHeight: screenHeight,
      answercheck:'',
      popup:false,
      totalQuestion:'',
      attempted: '',
      notvisited:'',
      unattempted:'',
      answerReview:'',
      notReview:'',
      title:'',
      totalQ:'',
      allQuesModel:false,
      qimage:'',
      isLoading: false,
        btn:false,
        status:false,



    // arrnew:[]


    }

    this.onPress = this.onPress.bind(this);

    this.next = this.next.bind(this);
    this.submitLast = this.submitLast.bind(this);
    this.submitTest = this.submitTest.bind(this);
    this.submitLastTest = this.submitLastTest.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.prev = this.prev.bind(this);
       this.deleteQues();
  }


    ShowHideTextComponentView = () =>{

        if(this.state.status == true)
        {
            this.setState({status: false})
        }
        else
        {
            this.setState({status: true})
        }
    }

  showLoader = () => {
    this.setState({ isLoading: true });
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setAllQuesModel(visible) {
    this.setState({allQuesModel:visible})
  }
  setPopUpVisible(visible,userID,testID) {
    this.setState({popup: visible});
    //Alert.alert('Hello' + userID+ testID )


    return fetch('http://35.153.195.92/appmotivenew/test-loadsubmitpop.php', {
      method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

 userID:userID,
testID:testID



    })
  })
    .then((response) => response.json())
    .then((responseJson) => {

 //console.log('Hello plus' + responseJson.totalQuestion);

  //Alert.alert('Hello' +this.qno)
  // console.log('My Screens' +  JSON.stringify(responseJson.quiz.quiz1))



  //const time =


  //  console.log( 'Current' + arrnew[this.qno].question)
     this.setState({
      totalQuestion:responseJson.totalQuestion,
      attempted: responseJson.attempted,
      notvisited:responseJson.notvisited,
      unattempted:responseJson.unattempted,
      answerReview:responseJson.answerReview,
      notReview:responseJson.notReview
    }
    , function() {
     });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  //

  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let _userID = await AsyncStorage.getItem("userID");
      let _locationID = await AsyncStorage.getItem("locationID");

      const data = JSON.parse(userData);
      const userID = JSON.parse(_userID);
      const locationID = JSON.parse(_locationID);
    this.setState({ loggedIn: data,
      userID: userID ,
      locationID:locationID
    });

    // this.state.userData.map((data) => {
    // console.log(data.id);
    // });
   // Alert.alert(data);
 //   console.log('results' + data);

    } catch (error) {
    //  console.log("Something went wrong", error);
    }



}



submitLastTest= (questNumber) => {

 // this.setPopUpVisible(!this.state.popup);
  return fetch('http://35.153.195.92/appmotivenew/test-submittest.php', {
    method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

//  locationID: 7,
//      userID: 1
testidd:this.state.testID,
quidd:questNumber,
user:this.state.userID,
testtime:this.state.timer
  })
})
  .then((response) => response.json())
  .then((responseJson) => {
console.log('Message' + responseJson.msg)

if(responseJson.msg  === 1) {
  this.setState({
    modalVisible:false
  })
  this.props.navigation.navigate('Result', { userID: this.state.userID,testID:this.state.testID });
}


  })
  .catch((error) => {
    console.error(error);
  });

}

submitTest= (questNumber) => {

  this.setPopUpVisible(!this.state.popup);
  return fetch('http://35.153.195.92/appmotivenew/test-submittest.php', {
    method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

//  locationID: 7,
//      userID: 1
testidd:this.state.testID,
quidd:questNumber,
user:this.state.userID,
testtime:this.state.timer
  })
})
  .then((response) => response.json())
  .then((responseJson) => {
console.log('Message' + responseJson.msg)

if(responseJson.msg  === 1) {
  this.setState({
    modalVisible:false
  })
  this.props.navigation.navigate('Result', { userID: this.state.userID,testID:this.state.testID });
}


  })
  .catch((error) => {
    console.error(error);
  });

}
fetchDataUpdate = () => {

//  Alert.alert(this.props.navigation.state.params.topicID);
  //Alert.alert(this.state.userID);
  return fetch('http://35.153.195.92/appmotivenew/test-qusload.php', {
    method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

//  locationID: 7,
//      userID: 1

topicID:this.props.navigation.state.params.topicID,
userID:this.state.userID

  })
})
  .then((response) => response.json())
  .then((responseJson) => {

this.qno = this.qno

//Alert.alert('Hello' +this.qno)
// console.log('My Screens' +  JSON.stringify(responseJson.quiz.quiz1))



//const time =

const testID  =  responseJson.testID

//console.log('Test ID ' + testID);
const jdata =responseJson.quiz.quiz1

arrnew = Object.keys(jdata).map( function(k) { return jdata[k] })

//  console.log( 'Current' + arrnew[this.qno].question)
   this.setState({
//     times:  '1000',
//     question : arrnew[this.qno].question,
//     options : arrnew[this.qno].options,
//  correctoption : arrnew[this.qno].correctoption,
//     countCheck : 0,
//     numberVal:arrnew[this.qno].numberID,
    questionList :arrnew,
    isLoading:false
    // lastQues : JSON.stringify(responseJson.lastQuestion),
    // quesNo: arrnew[this.qno].questionNumber,
    // testID:testID,
    // quesMark:arrnew[this.qno].quesMark,
  }
  , function() {
   });
  })
  .catch((error) => {
    console.error(error);
  });
}











async deleteQues () {


  try {
    let userData = await AsyncStorage.getItem("userData");
    let _userID = await AsyncStorage.getItem("userID");
    let _locationID = await AsyncStorage.getItem("locationID");

    const data = JSON.parse(userData);
    const userID = JSON.parse(_userID);
    const locationID = JSON.parse(_locationID);
  this.setState({ loggedIn: data,
    userID: userID ,
    locationID:locationID
  });

  // this.state.userData.map((data) => {
  // console.log(data.id);
  // });
 // Alert.alert(data);
  console.log('results' + data);

  } catch (error) {
    console.log("Something went wrong", error);
  }

//  Alert.alert('loading' + this.props.navigation.state.params.topicID)
  return fetch('http://35.153.195.92/appmotivenew/deleteQues.php', {
    method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
topicID:this.props.navigation.state.params.topicID,
userID:this.state.userID
//  locationID: 7,
//      userID: 1



  })
})
  .then((response) => response.json())
  .then((responseJson) => {


 //Alert.alert(JSON.stringify(responseJson));



//const time =
// const time = responseJson.time
// const testID  =  responseJson.testID
// const instructions = responseJson.instruction
// // console.log('Test ID ' + testID);
// const jdata =responseJson.quiz.quiz1
// const title = responseJson.title
// const totalQ = responseJson.totalQuestion
// arrnew = Object.keys(jdata).map( function(k) { return jdata[k] })

//  console.log( 'Current' + arrnew[this.qno].question)

  })
  .catch((error) => {
    console.error(error);
  });
}














  fetchData = () => {
    return fetch('http://35.153.195.92/appmotivenew/test-qusload.php', {
      method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  topicID:this.props.navigation.state.params.topicID,
  userID:this.state.userID
//  locationID: 7,
//      userID: 1



    })
  })
    .then((response) => response.json())
    .then((responseJson) => {

this.qno = 0
// console.log('My Screens' +  JSON.stringify(responseJson.quiz.quiz1))



  //const time =
 const time = responseJson.time
 const testID  =  responseJson.testID
const instructions = responseJson.instruction
// console.log('Test ID ' + testID);
  const jdata =responseJson.quiz.quiz1
  const title = responseJson.title
  const totalQ = responseJson.totalQuestion
  arrnew = Object.keys(jdata).map( function(k) { return jdata[k] })

//  console.log( 'Current' + arrnew[this.qno].question)
     this.setState({
      totalQ:totalQ,
      title:  title,
      timer:  time,
      instructions: instructions,
      quest_id : arrnew[this.qno].quest_id,
      question : arrnew[this.qno].question,
      qimage:  arrnew[this.qno].qimage,
             btn:  arrnew[this.qno].btn,
      options : arrnew[this.qno].options,
   correctoption : arrnew[this.qno].correctoption,
      countCheck : 0,
      numberVal:arrnew[this.qno].numberID,
      questionList :arrnew,
      lastQues : JSON.stringify(responseJson.lastQuestion),
      quesNo: arrnew[this.qno].questionNumber,
      testID:testID,
      quesMark:arrnew[this.qno].quesMark,
      refreshing:false

      // quesNo:this.state.quesNo
    }
    , function() {
     });
    })
    .catch((error) => {
      console.error(error);
    });
  }


  static navigationOptions = ({ navigation })  => {
       return {
       header: () => null
    }
 }



//  static getDerivedStateFromProps (nextProps,prevState) {
//    console.log('Ques Num log' +  prevState.quesNo)


//  }

//   getSnapshotBeforeUpdate(prevProps, prevState) {
// console.log('getSnapshotBeforeUpdate' + prevState.quesNo)




// //     return  {  number:prevState.quesNo


// //  }


//  return 'misfer'

// // return {
// //   number: prevState.quesNo
// // }


// // return this.setState({
// //   color:prevState.quesNo
// // })
//  }


 fetchDataDidMount = () => {
  return fetch('http://35.153.195.92/appmotivenew/answerpanel.php', {
    method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

//  locationID: 7,
//      userID: 1



  })
})
  .then((response) => response.json())
  .then((responseJson) => {

this.qno = 0
//console.log('My Screens' +  JSON.stringify(responseJson.quiz.quiz1))

const jdataanswer = JSON.stringify(responseJson.checkData);

console.log('My Data ...' +   jdataanswer);
//Alert.alert('value' + responseJson.checkData[1].numberiD)
//const time =
// const time = responseJson.quiz.time
// const testID  =  responseJson.testID

// console.log('Test ID ' + testID);
// const jdata =responseJson.quiz.quiz1

arrnews = Object.keys(jdataanswer).map( function(k) { return jdataanswer[k] })

//  console.log( 'Current' + arrnew[this.qno].question)
   this.setState({
    answerPalete: responseJson.checkData
//     times:  '1000',
//     question : arrnew[this.qno].question,
//     options : arrnew[this.qno].options,
//  correctoption : arrnew[this.qno].correctoption,
//     countCheck : 0,
//     numberVal:arrnew[this.qno].numberID,
//     questionList :arrnew,
//     lastQues : JSON.stringify(responseJson.lastQuestion),
//     quesNo: arrnew[this.qno].questionNumber,
//     testID:testID,
//     quesMark:arrnew[this.qno].quesMark,

    // quesNo:this.state.quesNo
  }
  , function() {
   });
  })
  .catch((error) => {
    console.error(error);
  });
}

 componentDidMount() {

  this.fetchData();
  this.getToken();

// console.log('Object Keys ' + Object.keys(jsonData.quiz.quiz1));
// console.log('Object... ' +  Object.key(this.state.jsonDatas));

this.interval = setInterval(
  () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
  1000
);

}


show(item) {
this.setState({
  answerP:item
})
}

handleRefresh = () => {

  this.setState({
    refreshing:true
  }
  )
}

componentDidUpdate () {


  if(this.state.timer === 1){
    clearInterval(this.interval);
  }


}

componentWillUnmount(){
  clearInterval(this.interval);
 }
// state = { name: "", lastTime: Date.now() }


// static getDerivedStateFromProps(nextProps, prevState) {
//     if (nextProps.name !== prevState.name) {
//        console.log('console' + {
//         name: nextProps.name, lastTime: Date.now()
//        } )
//     }
//    // return null;
// }
 renderObject = () => {



 }

  GetFlatListItem (fruit_name) {
  this.state ={
qno:fruit_name
  };
  this.qno= this.state.qno;



//  Alert.alert(this.state.qno);



   this.setState({   countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})

    this.toggleDrawer();

    }

  toggleDrawer = () => {
    this.fetchDataUpdate();
    if (this.toggleFlag == 0) {
      this.setState({ disabled: true,isLoading:true }, () => {
        Animated.timing(
          this.animatedValue,
          {
            toValue: 1,
            duration: 250
          }
        ).start(() => {
          this.setState({ disabled: false });
          this.toggleFlag = 1;
        });
      });
    }
    else {
      this.setState({ disabled: true }, () => {
        Animated.timing(
          this.animatedValue,
          {
            toValue: 0,
            duration: 250
          }
        ).start(() => {
          this.setState({ disabled: false });
          this.toggleFlag = 0;
        });
      });
    }
  }


  prev = (quesID,testID,userID) =>{
    if(this.qno > 0){
      this.qno--
      this.setState({qimage:arrnew[this.qno].qimage,btn:arrnew[this.qno].btn,
          quest_id:arrnew[this.qno].quest_id,quesNo:arrnew[this.qno].questionNumber, numberVal:arrnew[this.qno].numberID, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})



   // Alert.alert();
    return   fetch('http://35.153.195.92/appmotivenew/selectedCheck.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

       questid:arrnew[this.qno].questionNumber,
        quesexam: testID,

       userID:userID


      })

      }).then((response) => response.json())
          .then((responseJson) => {

           // console.log('my chek val...' + JSON.stringify( responseJson.checkVal));

         //   Alert.alert( responseJson.checkVal);
           // Alert.alert('my chek val...' + JSON.stringify( responseJson.checkVal))
           // If server response message same as Data Matched



         this.setState ({
          answerID:responseJson.checkVal
         })

          }).catch((error) => {
            console.error(error);
          });

        }

  }



  review(){



    // Alert.alert('Answer iD' + )

   //  this.setState({
   //   quesIDS:_quesID
   //  })

     if(this.qno < arrnew.length-1){
       this.qno+1
    let ans= '';
      // Alert.alert(this.qno++);
       console.log('Next is ' + this.qno++);

       this.setState ({
 qimage:arrnew[this.qno].qimage,
           btn:arrnew[this.qno].btn,
         quest_id:arrnew[this.qno].quest_id,
         quesNo:arrnew[this.qno].questionNumber,  numberVal:arrnew[this.qno].numberID,countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options,
          correctoption : arrnew[this.qno].correctoption,
          quesMark:arrnew[this.qno].quesMark,
         answerID:''
         })
     }else{

      this.submitLastTest(this.state.quesNo) ;
      }


   //   this.setState(prevState => ({    // prevState?
   //     number: prevState.quesNo
   // }));

   console.log('Console Value' + this.state.quesNo +
   'Number'  + this.state.number + 'Test ID' + this.state.testID)

       //  Alert.alert(getSnapshotBeforeUpdate())
    fetch('http://35.153.195.92/appmotivenew/test-exam-review.php', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({

    questid:this.state.quesNo,
    quesnum:this.qno,
    quesexam:this.state.testID,
    correctoption:this.state.correctoption,
    answerID:this.state.answerID,
    quesMark:this.state.quesMark,
    userID:this.state.userID


   })

 }).then((response) => response.json())
       .then((responseJson) => {


         // If server response message same as Data Matched


       }).catch((error) => {
         console.error(error);
       });



     // if(this.state.checked === null) {
     //   Alert.alert('im Empty')
     // }
     // else {
     //   Alert.alert('Im not Empty')
     // }



   }

   submitLast(){



    // Alert.alert('Answer iD' + )

   //  this.setState({
   //   quesIDS:_quesID
   //  })

     if(this.qno < arrnew.length-1){
      this.qno+1
    let ans= '';
      // Alert.alert(this.qno++);
       console.log('Next is ' + this.qno++);

       this.setState ({
 qimage:arrnew[this.qno].qimage,
           btn:arrnew[this.qno].btn,
         quest_id:arrnew[this.qno].quest_id,
         quesNo:arrnew[this.qno].questionNumber,  numberVal:arrnew[this.qno].numberID,countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options,
          correctoption : arrnew[this.qno].correctoption,
          quesMark:arrnew[this.qno].quesMark,
         answerID:''
         })
     }
    //  else{

    //    this.props.quizFinish(this.score*100/5)
    //   }
 let id  =this.qno + 1
     // Alert.alert(JSON.stringify(this.state.quest_id) + this.state.answerID);
   //   this.setState(prevState => ({    // prevState?
   //     number: prevState.quesNo
   // }));

   console.log('Console Value' + this.state.quesNo +
   'Number'  + this.state.number + 'Test ID' + this.state.testID)

       //  Alert.alert(getSnapshotBeforeUpdate())
    fetch('http://35.153.195.92/appmotivenew/test-exam.php', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({

    questid:this.state.quesNo,
    quesnum: this.state.quest_id,
    quesexam:this.state.testID,
    correctoption:this.state.correctoption,
    answerID:this.state.answerID,
    quesMark:this.state.quesMark,
    userID:this.state.userID


   })

 }).then((response) => response.json())
       .then((responseJson) => {
        this.submitLastTest(this.state.quesNo) ;

         // If server response message same as Data Matched


       }).catch((error) => {
         console.error(error);
       });



     // if(this.state.checked === null) {
     //   Alert.alert('im Empty')
     // }
     // else {
     //   Alert.alert('Im not Empty')
     // }



   }




  next(){



   // Alert.alert('Answer iD' + )

  //  this.setState({
  //   quesIDS:_quesID
  //  })

    if(this.qno < arrnew.length-1){
      this.qno+1
   let ans= '';
     // Alert.alert(this.qno++);
      console.log('Next is ' + this.qno++);

      this.setState ({
qimage:arrnew[this.qno].qimage,
          btn:arrnew[this.qno].btn,
        quest_id:arrnew[this.qno].quest_id,
        quesNo:arrnew[this.qno].questionNumber,  numberVal:arrnew[this.qno].numberID,countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options,
         correctoption : arrnew[this.qno].correctoption,
         quesMark:arrnew[this.qno].quesMark,
        answerID:''
        })
    }else{

      this.props.quizFinish(this.score*100/5)
     }


  //   this.setState(prevState => ({    // prevState?
  //     number: prevState.quesNo
  // }));

  console.log('Console Value' + this.state.quesNo +
  'Number'  + this.state.number + 'Test ID' + this.state.testID)

      //  Alert.alert(getSnapshotBeforeUpdate())
   fetch('http://35.153.195.92/appmotivenew/test-exam.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

   questid:this.state.quesNo,
   quesnum:this.qno,
   quesexam:this.state.testID,
   correctoption:this.state.correctoption,
   answerID:this.state.answerID,
   quesMark:this.state.quesMark,
   userID:this.state.userID


  })

}).then((response) => response.json())
      .then((responseJson) => {


        // If server response message same as Data Matched


      }).catch((error) => {
        console.error(error);
      });



    // if(this.state.checked === null) {
    //   Alert.alert('im Empty')
    // }
    // else {
    //   Alert.alert('Im not Empty')
    // }



  }

  clear() {
 // Alert.alert(this.state.checked)
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
  radioClick(id) {
    this.setState({
      checked: id
    });


  }




  onRemove(quesID) {
    fetch('http://35.153.195.92/appmotivenew/onRemove.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        quesID:quesID,
      //  quesnum:this.qno,
       userID:this.state.userID,
       textID : this.state.testID
      //  correctoption:this.state.correctoption,
     //  answerID:id,
      //  quesMark:this.state.quesMark,



      })

      }).then((response) => response.json())
          .then((responseJson) => {

            console.log('Deleted' + responseJson);

            ///console.log('my chek val...' + JSON.stringify( responseJson.checkVal));

           // Alert.alert( responseJson.checkVal);
           // Alert.alert('my chek val...' + JSON.stringify( responseJson.checkVal))
           // If server response message same as Data Matched
         this.setState ({
          answerID:''
         })

          }).catch((error) => {
            console.error(error);
          });





  }


  onPress= (questNumber,testID,userID,name,id) =>  {

 //  Alert.alert(userID)
    //this.showLoader();
    this.state ={
      qno:name
        };
        this.qno= this.state.qno;



     //   Alert.alert(this.state.qno);



         this.setState({ qimage:arrnew[this.qno].qimage,       btn:arrnew[this.qno].btn,   quest_id:arrnew[this.qno].quest_id,quesNo:arrnew[this.qno].questionNumber,  countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})

          this.toggleDrawer();


   // Alert.alert('Ques Number ' + questNumber + 'Test ID' +  testID + 'userID' + userID);

 return   fetch('http://35.153.195.92/appmotivenew/selectedCheck.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

       questid:questNumber,
      //  quesnum:this.qno,
       quesexam:testID,
      //  correctoption:this.state.correctoption,
     //  answerID:id,
      //  quesMark:this.state.quesMark,
       userID:userID


      })

      }).then((response) => response.json())
          .then((responseJson) => {

           // console.log('my chek val...' + JSON.stringify( responseJson.checkVal));

         //   Alert.alert( responseJson.checkVal);
           // Alert.alert('my chek val...' + JSON.stringify( responseJson.checkVal))
           // If server response message same as Data Matched
         this.setState ({
          answerID:responseJson.checkVal
         })

          }).catch((error) => {
            console.error(error);
          });





  }


  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item,index }) => (
    <View>
    <TouchableOpacity
//  onPress={this.GetFlatListItem.bind(this, JSON.stringify(index))}

onPress={() => this.onPress(item.questionNumber,

  this.state.testID,
  this.state.userID,
  JSON.stringify(index),
   index+1

  )}
 >


<View







style={[styles.round,item.answercheck =='red' ? { backgroundColor:'red'} : item.answercheck =='green' ? { backgroundColor:'green'}
: item.answercheck =='ans_review' ? { backgroundColor:'#005879'}
: item.answercheck =='not_review' ? { backgroundColor:'#005879'}
: { backgroundColor:'#a5a5a5'}]}>

<Text

style={[styles.text,item.answercheck =='red' ? { color:'white'} : item.answercheck =='green' ? { color:'white'}
: item.answercheck =='ans_review' ? { color:'white'}
: item.answercheck =='not_review' ? { color:'white'}
: { color:'black'}]}


>
   {index + 1}



 </Text>



</View>
 </TouchableOpacity>




   </View>
  )


  renderItemQues = ({ item,index }) => (
    <View>
    <TouchableOpacity
//  onPress={this.GetFlatListItem.bind(this, JSON.stringify(index))}


 >


<View







style={{width:'100%',flexDirection:'column'}}>

 <View style={{width:'100%', flexDirection:'row',flex:1,marginVertical:3}}>
<View>
<Text>
   {index + 1}



 </Text>
</View>

<View>
<Text>{item.question}</Text>
</View>
 </View>




</View>
 </TouchableOpacity>




   </View>
  )



  render() {
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={[styles.cont, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />

        </View>
      );
    }
    const questionN  =this.state.quesNo;
   const quesNumb = this.qno ;
   const lastQues  = this.state.lastQues;
   const answerID = this.state.answerID;

    const { checked } = this.state;


    const animatedValue = this.animatedValue.interpolate(
        {
          inputRange: [0, 1],
          outputRange: [DRAWER_WIDTH - 46, 0]
        });
    const { navigation } = this.props;
     let _this = this
     const currentOptions = this.state.options


     const options = Object.keys(currentOptions).map( function(k) {



       return (

       <View key={k} style={{margin:10,flexDirection:'column'}}>






        {/* <TouchableOpacity  style={{flexDirection:'row', alignContent:'space-between'}}    onPress={() => {
  _this.setState({
    checked:currentOptions[k].ansID,
     answerID:currentOptions[k].id
  })


  }  } > */}



 <View  style={{height:30}}>
<RadioButton
          value={currentOptions[k].id}
            />
</View>

 <View>
 <Text style={{textAlign:'justify'}}>
 {currentOptions[k].value }
    </Text>
 </View>


 {/* </TouchableOpacity>   */}




       </View>


       )
     });



     return (



   <>

   <View style={{backgroundColor: '#F5FCFF',paddingTop: 10, width:'100%', flex:1,flexDirection:'column',
zIndex:1,}}>




<View style={{flexDirection:'row',flex:1,position:'absolute',width:'100%'}} >

<View style={styles.header}>
         
            <CountDown
         size={15}
         until={this.state.timer}

         digitStyle={{ borderWidth: 2, borderColor: '#1CC625'}}
         digitTxtStyle={{color: '#1CC625'}}
         timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
         separatorStyle={{color: '#1CC625'}}
         timeToShow={['H', 'M', 'S']}
         timeLabels={{m: null, s: null}}
         showSeparator
       />
        </View>

<View style={{ width:'25%'
}}>




<View style={{width:'25%'}}>
 


</View>
   <View style={{width:'50%'  ,justifyContent:'center'}}>
 


         </View>

         <View style={{width:'25%',alignItems:'flex-end'}}>
       <TouchableOpacity
          onPress={() => {
            this.setPopUpVisible(true,this.state.userID,this.state.testID);
          }}>
          <Image source={require('../assets/src/correct.png')} style={{width: 45, height:45}} />
        </TouchableOpacity>

         </View>

         </View>
         </View>



        





   


   <View>


<ScrollView >


<View style={styles.container}>


<View style={{backgroundColor:'#f5f0f5',padding:5, flex: 1, flexDirection: 'row',justifyContent:'space-between',width:'100%',marginTop:60}}>
        

 

        <View style={{  textAlignVertical:'center',alignItems:'center',alignContent:'center'}} >
        <Text style={{textAlignVertical:'center',color:'black'}}> {this.state.title} </Text>
        <Text style={{color:'black'}}>Total Question - {this.state.totalQ}</Text>
          <Text style={{textAlignVertical:'center',color:'black'}}> Question Mark {this.state.quesMark}</Text>
        </View>


      </View>




     <View style={styles.headerText}>



     <View style={styles.containers}>

 <View style={{   flex: 1,flexDirection: 'column', justifyContent: "space-between", 
 alignItems: 'center',zIndex:1}}>

 <View style={styles.oval} >

    <LinearGradient  colors={['#758BAF', '#274073']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{flex:1,borderRadius:10}}>
            
    <Text style={styles.welcome}>
   {this.state.quest_id})  {this.state.question}

   </Text>
          </LinearGradient>
   
   { (this.state.qimage === '1' ) ?
   null
 :

<>
    <Button title="Image" onPress={this.ShowHideTextComponentView} />
    {
        this.state.status ?  <View style={{ flex:1,alignContent:'center',alignItems:'center' }}>

            <PhotoView
                source={{uri:this.state.qimage}}
                minimumZoomScale={1}
                maximumZoomScale={3}
                resizeMode="contain"
                onLoad={() => console.log("Image loaded!")}
                style={{width: 300, height: 300,zIndex:2 }}
            />

            {/*    <ImageZoom cropWidth={300}*/}
            {/*                       cropHeight={300}*/}
            {/*                       imageWidth={200}*/}
            {/*                       imageHeight={200}*/}
            {/*                       >*/}
            {/*<Image    style={[styles.canvas,this.state.qimage === '1' ? { paddingBottom:0} : {paddingBottom: 0} ]}*/}
            {/* source={{uri:this.state.qimage}}/>*/}
            {/* </ImageZoom>*/}
        </View> : null
    }

</>

}

</View>

</View>
<View style={{ width:'100%',    flex: 1,flexDirection: 'column', justifyContent: "space-between", alignItems: 'center',zIndex:0}}>



   <View style={{marginTop:5, marginBottom:5, flexDirection:'column' ,flex:1,width:'100%', }}>
 {/* <Text>{this.state.options[1].ansID}</Text> */}


 <View style={{ flexDirection:'column',flex:1,width:'100%',alignContent:'center'}}>


            { Object.keys(currentOptions).map((obj, k) => (


     <TouchableOpacity onPress={() => { this.setState({ answerID: currentOptions[k+1].id  }); }} style={{ borderBottomColor:'#eaebff', borderBottomWidth:1, paddingTop:4,marginBottom:4,flex:1,width:'100%',flexDirection:'row',marginHorizontal:5 ,alignContent:'space-between'}}>
<RadioButton
value="first"
status={  currentOptions[k+1].id == this.state.answerID  ? 'checked' : 'unchecked'}

/>


{
(currentOptions[k+1].value == '') ?
<View style={{paddingTop:0,marginTop:8}}>

<ImageZoom
onPress={() => { this.setState({ answerID: currentOptions[k+1].id  }); }}
// cropWidth={500}
//  cropHeight={500}
//  imageWidth={300}
//  imageHeight={300}

 >

<Image  style={{flex:1,width:'100%', resizeMode: 'contain',}}
 source={{uri:currentOptions[k+1].ansimg}}/>
</ImageZoom>
</View>
  :
<Text style={{paddingTop:8,flex: 1, flexWrap: 'wrap'}}>

{currentOptions[k+1].value }
</Text>
  }


       </TouchableOpacity>

          )
          )}










    </View>
   {/* { options } */}
   {/* </RadioButton.Group> */}

   </View>

   </View>
   <View style={{   flex: 1,flexDirection: 'column', justifyContent: "space-between", alignItems: 'center',zIndex:1}}>

   <View style={{width:'90%', flexDirection:"row", alignContent:'space-between',  }}>
 {
 /*   <Button
     onPress={() => this.prev()}
     title="Prev"
     color="#841584"
   />
   <View style={{margin:15}} />*/}
 
<TouchableOpacity
   style={{marginRight:5}}

   //  onPress={() => this.next()}

   onPress={() => this.review(this.state.quesNo)}

    >
      <LinearGradient  colors={['#ffa726', '#fb8c00']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
      <Text style={{ paddingVertical:5,color:'white'}}>Review</Text>
      </LinearGradient>
    </TouchableOpacity >

<TouchableOpacity onPress={() =>  this.onRemove(this.state.quesNo)} style={{marginRight:5}} >
<LinearGradient  colors={['#ffa726', '#fb8c00']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
  <Icon name="md-trash" size={30} color="white" />

</LinearGradient>
</TouchableOpacity >

 {quesNumb == 0 ?
 <View>
   </View> :

<TouchableOpacity onPress={() => this.prev(
questionN,
  this.state.testID,
  this.state.userID,)} style={{marginRight:5}} >
<LinearGradient  colors={['#ffa726', '#fb8c00']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
  <Icon name="md-chevron-back-circle-sharp" size={30} color="white" />

</LinearGradient>
</TouchableOpacity >



}
{quesNumb == lastQues ?
 <TouchableOpacity
 style={{marginRight:5}}

 //  onPress={() => this.next()}

 onPress={() => this.submitLast(this.state.quesNo)}

  >
    <LinearGradient  colors={['#ffa726', '#fb8c00']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
    <Text style={{ paddingVertical:5,color:'white'}}>Submit</Text>
    </LinearGradient>
  </TouchableOpacity >
:

   <TouchableOpacity


  //  onPress={() => this.next()}

  onPress={() => this.next(this.state.quesNo)}

   >
     <LinearGradient  colors={['#ffa726', '#fb8c00']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
       <Icon name="md-chevron-forward-circle-sharp" size={30} color="white" />
     </LinearGradient>
   </TouchableOpacity >
  }

   </View>
   </View>



   <View>
     <Text>
       {/* //     itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))} */}



</Text>
   </View>
 </View>

     </View>

     </View>
     </ScrollView>
     </View>

        <Animated.View style={[styles.drawer, { transform: [{ translateX: animatedValue }] }]}>





           <TouchableOpacity disabled={this.state.disabled} onPress={this.toggleDrawer} style={styles.drownerButton}>
{/* 
     <Icon

name='md-menu'
type='ionicon'
color='#517fa4'
size={25}
/> */}
<View style={{ flexDirection: 'row' }}>
                    <View style={styles.box}></View>
                    <View style={styles.box}></View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.box}></View>
                    <View style={styles.box}></View>
                </View>
       </TouchableOpacity>



          <View style={styles.drawerContainer}>
          <View>
            <Text>

              Answer Palate


            </Text>
          </View>


          {/* {this.state.questionList.map((item, key) => (

<TouchableOpacity key={key+1}
 onPress={this.GetFlatListItem.bind(this, JSON.stringify(key+1))}
 >

<View style={styles.round}>
<Text style={{textAlign:'center'}}> { key + 1 } </Text>
</View>

</TouchableOpacity>




)) } */}
{/* {this.state.questionList.map((item, key) => (  */}

{
       this.state.isLoading==true ?

          //loading view while data is loading

                  <ActivityIndicator size="large" color="#0000ff" />

           : <View></View>

      }

<FlatList
      data={this.state.questionList}
      numColumns={4}
      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
      // refreshing={this.state.refreshing}
      // onRefresh={this.handleRefresh}


    />
{/* )) } */}
<View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
       <View  style={{width:'50%'}}>
       <TouchableHighlight style={{alignItems:'center',paddingRight:3,paddingLeft:3, paddingTop:10,paddingBottom:10,backgroundColor:'#fe8d3f',textAlignVertical:'center'}}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{color:'white', }}>instruction</Text>
        </TouchableHighlight>

         </View>

         <View  style={{width:'50%'}}>
         <TouchableHighlight style={{alignItems:'center',paddingRight:3,paddingLeft:3, paddingTop:10,paddingBottom:10,backgroundColor:'#fe8d3f',textAlignVertical:'center'}}
          onPress={() => {
            this.setAllQuesModel(true);
          }}>
          <Text style={{color:'white', }}>All Queestion</Text>
        </TouchableHighlight>
         </View>
           </View>








           <Modal     style={styles.modalContent}

backdropColor = {'white'}
backdropOpacity = {1}
animationIn={'slideInLeft'}
animationOut={'slideOutRight'}
visible={this.state.allQuesModel}
onRequestClose={() => {
Alert.alert('Modal has been closed.');
}}


>
<View style={{marginTop: 5,width:'90%',padding: 5,flex:1 }}>
  <View style={{ flexDirection:'row', marginBottom:20, marginTop:20,zIndex:1}}>
    <View style={{width:'90%', }}>

    </View>

    <View style={{width:'10%', }}>
    <TouchableHighlight
    onPress={() => {
      this.setAllQuesModel(!this.state.allQuesModel);
    }}>
       <Icon

name='md-close'
type='ionicon'
color='#517fa4'
size={30}
/>


  </TouchableHighlight>
    </View>
  </View>
<View>


<FlatList
      data={this.state.questionList}
      numColumns={1}
      renderItem={this.renderItemQues}
      keyExtractor={this.keyExtractor}
      // refreshing={this.state.refreshing}
      // onRefresh={this.handleRefresh}

    />
  {/* <Text style={styles.headerText}> Screen width : {this.state.screenWidth}</Text>
<Text style={styles.headerText}>Screen height : {this.state.screenHeight}</Text>   */}

</View>
</View>
</Modal>







           <Modal     style={styles.modalContent}

backdropColor = {'white'}
backdropOpacity = {1}
animationIn={'slideInLeft'}
animationOut={'slideOutRight'}
visible={this.state.modalVisible}
onRequestClose={() => {
Alert.alert('Modal has been closed.');
}}


>
<View style={{marginTop: 5,width:'90%',padding: 5, flex:1}}>

<View style={{ flexDirection:'row', marginBottom:20, marginTop:20,zIndex:1}}>
    <View style={{width:'90%', }}>

    </View>

    <View style={{width:'10%', }}>
    <TouchableHighlight
    onPress={() => {
      this.setModalVisible(!this.state.modalVisible);
    }}>
       <Icon

name='md-close'
type='ionicon'
color='#517fa4'
size={30}
/>


  </TouchableHighlight>
    </View>
  </View>
<View>
  <Text>{this.state.timer}</Text>
   <Text>
     {this.state.instructions}

  </Text>
  {/* <Text style={styles.headerText}> Screen width : {this.state.screenWidth}</Text>
<Text style={styles.headerText}>Screen height : {this.state.screenHeight}</Text>   */}
  {/* <TouchableHighlight
    onPress={() => {
      this.setModalVisible(!this.state.modalVisible);
    }}>
    <Text>Hide Modal</Text>
  </TouchableHighlight> */}
</View>
</View>
</Modal>


<Modal     style={styles.modalContents}

backdropColor = {'white'}
backdropOpacity = {1}
animationIn={'slideInLeft'}
animationOut={'slideOutRight'}
visible={this.state.popup}
onRequestClose={() => {
Alert.alert('Modal has been closed.');
}}


>


  <View style={{flexDirection:'column',flex:1}}>
    <View style={{alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:20}}>

      <Image source={require('../assets/src/badge.png')} style={{width: 100, height:100}} />
    </View>
    <View style={styles.rowlist}>
    <View >
      <Text>  Total Question</Text>
    </View>
    <View>
      <Text>  {this.state.totalQuestion}</Text>
    </View>
    </View>

    <View style={styles.rowlist}>
    <View >
      <Text>  Attempted</Text>
    </View>
    <View>
      <Text>  {this.state.attempted}</Text>
    </View>
    </View>

    <View style={styles.rowlist}>
    <View >
      <Text>  Not Visited</Text>
    </View>
    <View>
      <Text>  {this.state.notvisited}</Text>
    </View>
    </View>
    <View style={styles.rowlist}>
    <View >
      <Text>  Un Attempted </Text>
    </View>
    <View>
      <Text>  {this.state.unattempted}</Text>
    </View>
    </View>
    <View style={styles.rowlist}>
    <View >
      <Text>  Answer & Marked for Review </Text>
    </View>
    <View>
      <Text>  {this.state.answerReview}</Text>
    </View>
    </View>
    <View style={styles.rowlist}>
    <View >
      <Text>  Mark for Reveiw </Text>
    </View>
    <View>
      <Text>  {this.state.notReview}</Text>
    </View>
    </View>

    <View>

      <View style={styles.rowlist}>
        <View style={{padding:5}}>
        <TouchableOpacity style={styles.touchBtn}
    onPress={() => {
      this.setPopUpVisible(!this.state.popup);
    }}>
    <Text style={{color:'#efefef'}}>Resume</Text>
  </TouchableOpacity>
        </View>

        <View style={{padding:5}}>
        <TouchableOpacity style={styles.touchBtn}
    onPress={() => this.submitTest(this.state.quesNo) }>
    <Text style={{color:'#efefef'}}>Submit  </Text>
  </TouchableOpacity>
        </View>
      </View>

    </View>

  </View>

</Modal>

          </View>




        </Animated.View>










<View/>
</View>
</>


     );
   }


}

const styles = StyleSheet.create(
  {
    rowlist: {
      flexDirection:'row',
      marginVertical:10,
      justifyContent:'space-between'
     // flex:1
    },
    oval: {
        width: width * 90/100,
        borderRadius: 20,
        backgroundColor: 'green',
        zIndex:-1,
        flexDirection:'column',
        flex:1


        },
        containers: {
          flex: 1,
          alignItems: 'center',


        },
        welcome: {
          fontSize:15,
          margin: 10,
          color: "white",

        },
        instructions: {
          textAlign: 'center',
          color: '#333333',
          marginBottom: 5,
        },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection:'column',paddingTop:100,



    },
    round: {
      width:50,height:50,

      marginVertical:5,
      marginHorizontal:5,
       textAlign:'center', justifyContent:'center',textAlignVertical:'center',
       justifyContent:'center',
       borderRadius:20,

    },
    headerText: {
      fontSize: 25,
      textAlign: "center",
    margin: 50,
      color: 'black',
      fontWeight: "bold",

    },
    drawer: {
      position: 'absolute',
      top: (Platform.OS == 'ios') ? 20 : 0,
      right: 0,
      bottom: 0,
      width: DRAWER_WIDTH,
      flexDirection: 'row',
      marginVertical: 20,
      marginHorizontal: 20,


    },
    drawerContainer: {
     flex: 1,
      backgroundColor: '#dddddd',
      alignItems: 'center',
      flexDirection:'column',
      flexWrap:"wrap",
         justifyContent: 'space-between',
         marginTop:100




    },
    
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 20,
      marginHorizontal: 20,

  },
    menuLayout: {
      marginBottom: 1,
      backgroundColor: 'yellow',
      width: '100%',
      fontSize: 25,
      color: 'white',
      padding: 10,
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor:'white',
      alignContent:'center',
      alignItems:'center',
      height:'25%',

    //  marginTop:10,
      width:'90%',


    },
    modalContents: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor:'white',
      alignContent:'center',
      alignItems:'center',
      height:'25%',

    //  marginTop:10,
      width:'90%',


    },

    touchBtn: {

      alignItems: 'center',
    backgroundColor: '#fe8d3f',
    color:'#efefef',
    padding: 10,
    borderRadius:5
    },
    text: {
      fontSize:15,
      textAlign: 'center',
    },
    imagecontainer: {
     flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',

      paddingHorizontal:5,
      flexDirection:'column'

    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width:'100%',





    },
    cont: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
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
    box: {
      height: 10,
      width: 10,
      backgroundColor: '#697796',
      borderRadius: 1,
      margin: 2,
  }
  });
