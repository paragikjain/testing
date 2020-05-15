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
      console.log("HI")
      this.setState({isModalVisible: false})
      this.props.navigation.navigate('RoomScreen',{
          socket : this.socket,
          check : 0,
          name : 'navneet',
          message : msg,
          status : false,
          UserId : "JEF8JF343",
        
      });

      this.context.socket.on('NOTJOINEE', msg => {
        this.setState({isModalVisible: false})
        Alert.alert(msg)
      });

      

      
  });
}
create(){
  console.log("I am in create finctonc")
  if(this.context.socket.emit("create","ROOMX")){
    this.props.navigation.navigate('RoomScreen',{

      roomid : 'ROOMX',
      status : false,
      UserId : "KF8F88F8D",
  
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