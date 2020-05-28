import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {App_Button} from '../component/App_Button';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import {Text_Box} from '../component/Text_Box';
import io from 'socket.io-client/dist/socket.io';
import {Context} from '../context/Provider'
import AsyncStorage from '@react-native-community/async-storage';

class CreateGameScreen extends Component {
  state={
    isModalVisible : false,
    id : '',
    local_username:this.context.local_username,
    local_userid:this.context.local_userid,
    usernameexist:this.context.usernameexist,
  }
  componentDidMount() {
    this.context.socket.on('connect', function() {
      console.log('check 2');
    });
    this.context.socket.on('JOINEE', msg => {
      console.log(msg)
      this.setState({isModalVisible: false})
      this.props.navigation.navigate('RoomScreen',{
          roomdata : msg,
      });

      this.context.socket.on('NOTJOINEE', msg => {
        this.setState({isModalVisible: false});
        Alert.alert(msg);
      });
 });
}

//local Storage Data Handling
setDataFromLocal = async () => {
  try {
    await AsyncStorage.setItem('Usernames',this.state.local_username)
    var result  = this.state.local_username;
    var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    await AsyncStorage.setItem('UserID',result)
    this.context.usernameexist=1;
    this.context.local_username=this.state.local_username;
    this.context.local_userid=result;
    this.props.navigation.navigate('CreateGameScreen',);
  } catch (e) {
    // saving error
  }
  console.log("i am in saving")
}
//EOF local Storage Data Handling
create(){
  var result  = '';
  var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log("Result", result);
  let createdata={}

  if(result.length != 0){
    createdata={"roomid":result,"username":[this.state.local_username],"status":[0],"userID":[this.state.local_userid],"totalPlayer":1}
}else{
   console.log("Please Retry")
  }
  //console.log(this.state.Roomid[0].demo.roomid)
   if(this.context.socket.emit("create",createdata)){
    this.props.navigation.navigate('RoomScreen',{
      roomdata : createdata
    });
  }
  else{
    alert('Something wrong');
  }

}
joinroom(){
  console.log("clicking on join")
  let joindata={"roomid":this.state.id,"username":[this.state.local_username],"userID":[this.state.local_userid]}
  this.context.socket.emit('NEW_USER',joindata);
}
  render() {
    if(this.state.usernameexist==0){
      return(
        <View>
        <Text>Please enter your name</Text>
        <TextInput
        onChangeText={(text) => this.setState({local_username:text})}/>
        <Button title="Save" onPress={()=>this.setDataFromLocal()} />
        </View>
        );
    }
    else{
    return (
    
      //   <View style={styles.Button_Box}>
      //         <Button title="Create" onPress={() => this.create()} />
      //         {/* <App_Button title="Create Game" navigation={this.props.navigation} RedirectTo='RoomScreen'  mode='1' /> */}
      //         <View style={styles.Button_Design}>
      //           <Button title="Join Game" onPress={()=>this.setState({isModalVisible: true})} />
      //         </View>
      //         <Modal style={{justifyContent: 'center', height:'10%'}} isVisible={this.state.isModalVisible}>
      //           <View style={{flex: 1,
      //                         flexDirection: 'column',
      //                         justifyContent: 'center',
      //                         alignItems: 'center',
      //                         backgroundColor:'red'}}>
      //               <View >
      //             <Text>Please Enter Game ID</Text>
      //             <TextInput
      //               onChangeText={(text) => this.setState({id:text})}
      //             />

      //             <Button title="JOin Room" onPress={()=>this.joinroom()} />
      //              </View>
      //              </View>
      //         </Modal>
      //  </View>
      <View style={styles.Button_Box}>
        <ImageBackground
          source={require('../assets/img/bg_bubble.png')}
          style={(styles.fixed, styles.image)}
        />
        <ScrollView
          contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
          style={styles.fixed}>
          <View style={styles.midbutton}>
            <TouchableOpacity
              onPress={() => this.create()}>
              <View style={styles.buttonview}>
                <ImageBackground
                  style={styles.buttonmiddle}
                  source={require('../assets/img/base_button.png')}>
                  <Text style={styles.text}>Create Room</Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.setState({isModalVisible: true})}>
              <View style={styles.buttonview}>
                <ImageBackground
                  style={styles.buttonmiddle}
                  source={require('../assets/img/base_button.png')}>
                  <Text style={styles.text}>Join Room</Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
              <Modal style={styles.modelBox} isVisible={this.state.isModalVisible}>
              <View style={styles.modalView} >
              <ImageBackground style={styles.modalbg} source={require('../assets/img/bg_bubble.png')}>
                <Text style={styles.uppermodalText}>Enter Room Code</Text>
              <TextInput
                style={styles.modalInput}
                />
                <TouchableOpacity
              onPress={()=>this.setState({isModalVisible: false})}>
              <View style={styles.modalbuttonview}>
                <ImageBackground
                  resizeMode="contain"
                  style={styles.modalbuttonmiddle}
                  source={require('../assets/img/base_button.png')}>
                  <Text style={styles.text}>Join</Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
              </ImageBackground>
              </View>
              </Modal>
      </View>
    );}
  }
}

// define your styles
const styles = StyleSheet.create({
  modalView:{
    width : '100%',
    height : 200,
    backgroundColor: 'orange',
    borderRadius : 10,
  },
  uppermodalText:{
    fontFamily: 'WickedMouse',
    fontSize : 20,
    color : '#fff',
    textShadowColor:'black',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:10,
    shadowOpacity: 1,
    marginVertical : 20,
  },
  modalbuttonview:{
    width: 130,
    height: 80,
  },
  modalbuttonmiddle:{
    width : '100%',
    marginTop : 10,
    height : '100%',
    alignItems :'center',
    justifyContent: 'center',
  },
  modalInput:{
    backgroundColor : 'white',
    height : 40,
    textAlign : 'center',
    borderRadius : 30,
    width : 150,
  },
  modelBox:{
    alignItems : 'center',
  },
  modalbg:{
    flex : 1,
    justifyContent :'center',
    alignItems : 'center',
  },
  Button_Box: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1486ED',
  },
  logo: {
    width: 300,
    height: 300,
    borderColor: '#fff',
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  midbutton: {
    alignItems: 'center',
  },
  buttonview:{
    width: 200,
    height: 80,
  },
  buttonmiddle:{
    width : '100%',
    height : '100%',
    alignItems :'center',
    justifyContent: 'center',
  },
  text:{
    alignItems :'center',
    color : 'white',
    textShadowColor:'black',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:10,
    shadowOpacity: 1,
    fontFamily: 'WickedMouse',
    fontSize : 15,

  },
});

CreateGameScreen.contextType = Context;
export {CreateGameScreen};
