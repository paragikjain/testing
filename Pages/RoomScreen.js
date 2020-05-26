import React, { Component } from 'react';
import { App_Button } from '../component/App_Button';
import { View, Text ,StyleSheet ,Image, Button,TouchableOpacity, Alert} from 'react-native';
import {Context} from '../context/Provider'
import AsyncStorage from '@react-native-community/async-storage';

 export class RoomScreen extends Component {
  state={
        roomdata : this.props.route.params.roomdata,
        roomid:'',
        totalPlayer:0,
        admin:'',
        username:[],
        status:[],
        curruserIndex:0,
        local_username:this.context.local_username,
        local_userid:this.context.local_userid,
        allready:0,
      }
  

  parse_roomdata=(data)=>{
    console.log("parsing room data")
    console.log(data.userID.indexOf(this.state.local_userid))
    this.setState({
                   totalPlayer:data.totalPlayer,
                   roomid:data.roomid,
                   admin:data.username[0],
                   curruserIndex: data.userID.indexOf(this.state.local_userid)})
      for(let i=1;i<data.totalPlayer;i++){
        this.state.username.push(data.username[i])
        this.state.status.push(data.status[i])
      }
     console.log(this.state.curruserIndex)             
    }

  componentDidMount(){
    const { roomdata } = this.state;
    this.parse_roomdata(roomdata)
    this.context.socket.on('JOINEE', msg => {
      this.parse_roomdata(msg)
   });
   this.context.socket.on('remoteToggleStatus', msg => {
    this.state.status[msg]=this.state.status[msg]?0:1
    this.setState({status:this.state.status})
    if(this.state.status.indexOf(0)==-1){
      console.log("-1")
      this.setState({allready:1})
    }
    else{
     console.log("0")
      this.setState({allready:0})
    }
 });
 }
 
 toggleReady=()=>{
   this.state.status[this.state.curruserIndex]=this.state.status[this.state.curruserIndex]?0:1
   this.setState({status:this.state.status})
   this.context.socket.emit("toggleStatus",[this.state.roomid,this.state.curruserIndex])
   if(this.state.status.indexOf(0)==-1){
     console.log("-1")
     this.setState({allready:1})
   }
   else{
    console.log("0")
     this.setState({allready:0})
   }
 }

  createview=()=>{
    let view_array=[]
    for(let i=1;i<this.state.totalPlayer;i++){
      view_array.push(<View style={styles.userbox1}>
        <View style={styles.playerBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
        </View>
        <TouchableOpacity style={styles.playerButton}>
      <Text style={styles.playerText}>{this.state.username[i-1]}</Text>
      <Text>{this.state.status[i] ? 'NotReady': 'Ready'}</Text>
      </TouchableOpacity>
        </View>)
    }
    return view_array
  }


  render() {
    const { RoomId } = this.state;
    const { Status } = this.state;
    const { Totaluser } = this.state;
    return (
      <View style={styles.userComponent}>
      <Button title="Start Game" onPress={()=>this.state.allready ? this.props.navigation.navigate('SpinnerScreen') :Alert.alert("all players are not ready") }/>
      <Button title={this.state.status[this.state.curruserIndex] ? 'Ready': 'NotReady'} onPress={()=>this.toggleReady()}/>
      <View style={styles.userAvtar}>
        <View style={styles.avtarBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
          <Text style={styles.playerText}>{this.state.admin}</Text>
        </View>
        <View style={styles.userButton}>
        
        </View> 
      </View>
      <Text>
        {
         this.state.Totaluser
        }
      </Text>
      <View style={styles.playerAvtar}>
        {this.createview()}
      </View>
      <View style={styles.roomBox}>
        <View style={styles.roomCode}>
      <Text style={styles.roomText}>Room Code : {this.state.roomid}</Text> 
        </View>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  userComponent:{
    height : '100%',
    justifyContent : 'center',
    alignItems : 'center',
    // backgroundColor :'red',
  },
  userButton:{
    marginTop : 10,
  },
  userAvtar :{
    height : 200,
    // marginTop : 60,
    width : 150,
    marginBottom : 20,
    borderRadius: 20,
    // backgroundColor : 'green',
  },
  avtarBlock:{
    height : 150,
    // marginBottom : 10,
  },
  avtarImage:{
    width : '100%',
    height : '100%',
    borderRadius : 20,

  },
  playerAvtar:{
    padding : 5,
    flexDirection : 'row',
    justifyContent : 'center',
    flexWrap : 'wrap',
  },
  userbox1 :{
    width : 100,
    height : 120,
    margin : 5,
    borderRadius: 10,
    // backgroundColor : 'black',
    
  },
  userbox2:{
    width : 100,
    height : 120,
    margin : 5,
    borderRadius: 10,
    // backgroundColor : 'yellow',
  },
  userbox3:{
    width : 100,
    height : 120,
    borderRadius: 10,
    margin : 5,
    // backgroundColor : 'brown',
  },
  userbox4:{
    width : 100,
    height : 120,
    borderRadius: 10,
    margin : 5,
    // backgroundColor : 'lightpink',
  },
  userbox5:{
    width : 100,
    height : 120,
    borderRadius: 10,
    margin : 5,
    // backgroundColor : 'lightgreen',
  },
  roomCode:{
    width : 300,
    paddingVertical : 20,
    marginTop : 20,
    backgroundColor : 'lightblue',
    alignItems : 'center',
  },
  roomBox:{
    alignItems : 'center'
  },
  roomText :{
  },
  playerBlock:{
    height : 100,
  },
  playerButton:{
    margin: 5,
   backgroundColor: 'white',
   alignContent : 'center',
  },
  playerText:{
    color : 'green',
    alignSelf : 'center',
  }

});

RoomScreen.contextType=Context
// export {Header}  ;
