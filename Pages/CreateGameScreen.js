import React, { Component} from 'react';
import { View, Text,TextInput, StyleSheet, Button,Alert } from 'react-native';
import { App_Button } from '../component/App_Button';
import Modal from 'react-native-modal';
import {Text_Box} from '../component/Text_Box'
import io from 'socket.io-client/dist/socket.io';
import {Context} from '../context/Provider'
 
class CreateGameScreen extends Component {
  state={
    isModalVisible : false,
    id : '',
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
create(){
  var result  = '';
  var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
     
  }
  console.log("Result", result);
demo={}

  if(result.length != 0){
    demo={"roomid":result,"username":"parag","totalPlayer":1}
}else{
   console.log("Please Retry")
  }
  //console.log(this.state.Roomid[0].demo.roomid)
   if(this.context.socket.emit("create",demo)){
    this.props.navigation.navigate('RoomScreen',{
      roomdata : demo
    });
  }
  else{
    alert('Something wrong');
  }

}
joinroom(){
  console.log("clicking on join")
  this.context.socket.emit('NEW_USER',this.state.id);
}
  render() {
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