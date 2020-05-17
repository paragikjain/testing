import React, { Component} from 'react';
import { View, Text,TextInput, StyleSheet, Button,Alert } from 'react-native';
import { App_Button } from '../component/App_Button';
import Modal from 'react-native-modal';
import {Text_Box} from '../component/Text_Box'
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
   this.context.socket.on('connect',function() {
      console.log('check 2');
    });
    this.context.socket.on('JOINEE', msg => {
      console.log(msg)
      this.setState({isModalVisible: false})
      this.props.navigation.navigate('RoomScreen',{
          roomdata : msg,
      });

      this.context.socket.on('NOTJOINEE', msg => {
        this.setState({isModalVisible: false})
        Alert.alert(msg)
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
  <View style={styles.Button_Box}>
        <Button title="Create" onPress={() => this.create()} />
        {/* <App_Button title="Create Game" navigation={this.props.navigation} RedirectTo='RoomScreen'  mode='1' /> */}
        <View style={styles.Button_Design}>
          <Button title="Join Game" onPress={()=>this.setState({isModalVisible: true})} />
        </View>
        <Modal style={{justifyContent: 'center', height:'10%'}} isVisible={this.state.isModalVisible}>
          <View style={{flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:'red'}}>
              <View >
            <Text>Please Enter Game ID</Text>
            <TextInput
              onChangeText={(text) => this.setState({id:text})}
            />

            <Button title="JOin Room" onPress={()=>this.joinroom()} />
             </View>
             </View>
        </Modal>
 </View>
      );
    }
    }
  }

      // define your styles
const styles = StyleSheet.create({
    Button_Box: {
      justifyContent: 'center',
      alignItems: 'center',
      flex:1
    },
    Button_Design: {
      marginTop:10,
      width:"50%",
      alignSelf:"center",
      color:"red",
  },
  });

  CreateGameScreen.contextType= Context
  export{CreateGameScreen};