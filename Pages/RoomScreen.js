import React, { Component } from 'react';
import { App_Button } from '../component/App_Button';
import { View, Text ,StyleSheet ,Image, Button,TouchableOpacity} from 'react-native';
import {Context} from '../context/Provider'

 export class RoomScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      roomdata : this.props.route.params.roomdata,
      roomid:'',
      totalPlayer:0,
      admin:'',
      username:[]
    }
  }

  parse_roomdata=(data)=>{
    console.log("parsing room data")
    let users=data.username.split(' ')
    this.setState({
                   totalPlayer:data.totalPlayer,
                   roomid:data.roomid,
                   admin:users[0]})
      for(let i=1;i<data.totalPlayer;i++){
        console.log("users i:"+users[i])
        this.state.username.push(users[i])
      }
                  
    }

  componentDidMount(){
    const { roomdata } = this.state;
    this.parse_roomdata(roomdata)
    this.context.socket.on('JOINEE', msg => {
      this.parse_roomdata(msg)
   });
 }

  createview=()=>{
    view_array=[]
    for(let i=0;i<this.state.totalPlayer-1;i++){
      view_array.push(<View style={styles.userbox1}>
        <View style={styles.playerBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
        </View>
        <TouchableOpacity style={styles.playerButton}>
      <Text style={styles.playerText}>{this.state.username[i]}</Text>
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
      <View style={styles.userAvtar}>
        <View style={styles.avtarBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
          <Text>{this.state.admin}</Text>
        </View>
        <View style={styles.userButton}>
        <App_Button title={!Status ? 'Created' : 'Ready'} navigation={this.props.navigation} RedirectTo='SpinnerScreen' mode='1'/>
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
