import React, { Component } from 'react';
import { App_Button } from '../component/App_Button';
import { View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ImageBackground,} from 'react-native';
import {Context} from '../context/Provider'
import AsyncStorage from '@react-native-community/async-storage';
let width = 100
let height = 100;
let adminwidth = width * 1.25;
let adminheight = height * 1.25;
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
      // <View style={styles.userComponent}>
      // <Button title="Start Game" onPress={()=>this.state.allready ? this.props.navigation.navigate('SpinnerScreen') :Alert.alert("all players are not ready") }/>
      // <Button title={this.state.status[this.state.curruserIndex] ? 'Ready': 'NotReady'} onPress={()=>this.toggleReady()}/>
      // <View style={styles.userAvtar}>
      //   <View style={styles.avtarBlock}>
      //     <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
      //     <Text style={styles.playerText}>{this.state.admin}</Text>
      //   </View>
      //   <View style={styles.userButton}>
        
      //   </View> 
      // </View>
      // <Text>
      //   {
      //    this.state.Totaluser
      //   }
      // </Text>
      // <View style={styles.playerAvtar}>
      //   {this.createview()}
      // </View>
      // <View style={styles.roomBox}>
      //   <View style={styles.roomCode}>
      // <Text style={styles.roomText}>Room Code : {this.state.roomid}</Text> 
      //   </View>
      // </View>
      // </View>
      <View style={styles.userComponent}>
      <ImageBackground
        source={require('../assets/img/bg_bubble.png')}
        style={styles.image}>
        <View style={{paddingTop:30}}>
          <View resizeMode="contain" style={styles.roomBox}>
            <ImageBackground
              resizeMode="contain"
              source={require('../assets/img/rcode.png')}
              style={styles.roomBg}>
              <Text style={styles.roomFont}>DCEF3</Text>
            </ImageBackground>
          </View>
        </View>
        <View style={{}}>
          <View style={styles.userAvtar}>
            <View style={styles.adminplayerCard}>
              <Image
                resizeMode="contain"
                style={styles.adminfirstLayer}
                source={require('../assets/img/imgbox1@2xafter.png')}
              />
              <View style={[styles.adminsecondLayer, styles.adminStatus]} />
              <Image
                style={styles.adminthirdLayer}
                source={require('../assets/img/avatar2.png')}
              />
            </View>
            <View style={styles.adminbottomPlate}>
              <ImageBackground
                resizeMode="contain"
                source={require('../assets/img/plynme.png')}
                style={styles.image}>
                <Text style={styles.templateText}>Navneet</Text>
              </ImageBackground>
            </View>
          </View>
        </View>
        <View style={styles.playerAvtar}>
          <View style={styles.userAvtar}>
            <View style={styles.playerCard}>
              <Image
                resizeMode="contain"
                style={styles.firstLayer}
                source={require('../assets/img/imgbox1@2xafter.png')}
              />
              <View style={[styles.secondLayer, styles.statusFirst]} />
              <Image
                style={styles.thirdLayer}
                source={require('../assets/img/img_avatar2.png')}
              />
            </View>
            <View style={styles.bottomPlate}>
              <ImageBackground
                resizeMode="contain"
                source={require('../assets/img/plynme.png')}
                style={styles.image}>
                <Text style={styles.templateText}>Navneet</Text>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.userAvtar}>
            <View style={styles.playerCard}>
              <Image
                resizeMode="contain"
                style={styles.firstLayer}
                source={require('../assets/img/imgbox1@2xafter.png')}
              />
              <View style={[styles.secondLayer, styles.statusSecond]} />
              <Image
                style={styles.thirdLayer}
                source={require('../assets/img/img_avatar2.png')}
              />
            </View>
            <View style={styles.bottomPlate}>
              <ImageBackground
                resizeMode="contain"
                source={require('../assets/img/plynme.png')}
                style={styles.image}>
                <Text style={styles.templateText}>Navneet</Text>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.userAvtar}>
            <View style={styles.playerCard}>
              <Image
                resizeMode="contain"
                style={styles.firstLayer}
                source={require('../assets/img/imgbox1@2xafter.png')}
              />
              <View style={[styles.secondLayer, styles.statusThird]} />
              <Image
                style={styles.thirdLayer}
                source={require('../assets/img/img_avatar2.png')}
              />
            </View>
            <View style={styles.bottomPlate}>
              <ImageBackground
                resizeMode="contain"
                source={require('../assets/img/plynme.png')}
                style={styles.image}>
                <Text style={styles.templateText}>Navneet</Text>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.userAvtar}>
            <View style={styles.playerCard}>
              <Image
                resizeMode="contain"
                style={styles.firstLayer}
                source={require('../assets/img/imgbox1@2xafter.png')}
              />
              <View style={[styles.secondLayer, styles.statusFourth]} />
              <Image
                style={styles.thirdLayer}
                source={require('../assets/img/img_avatar2.png')}
              />
            </View>
            <View style={styles.bottomPlate}>
              <ImageBackground
                resizeMode="contain"
                source={require('../assets/img/plynme.png')}
                style={styles.image}>
                <Text style={styles.templateText}>Navneet</Text>
              </ImageBackground>
            </View>
          </View>
        </View>
        <View style={styles.footerRow}>
          <TouchableOpacity>
            <View style={styles.footerFirst}>
              <ImageBackground
                resizeMode="contain"
                source={require('../assets/img/greenbtn.png')}
                style={styles.image}>
                <Text style={styles.commonText}>Ready</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.footerSecond}>
              <ImageBackground
                resizeMode="contain"
                source={require('../assets/img/redbtn.png')}
                style={styles.image}>
                <Text style={styles.commonText}>Let's Play</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  userComponent: {
    flex: 1,
    backgroundColor: '#1486ED',
    // backgroundColor :'red',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userAvtar: {
    alignItems: 'center',
    // backgroundColor : 'green',
  },

  playerAvtar: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 300,
    flexWrap: 'wrap',
  },
  roomBox: {
    alignItems: 'center',
    width: 200,
    height: 110,
  },
  roomBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  footerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  footerFirst: {
    width: 120,
    height: 60,
    margin: 5,
  },
  footerSecond: {
    width: 120,
    height: 60,
    margin: 5,
  },
  roomFont: {
    position: 'absolute',
    bottom: 30,
  },

  playerCard: {
    width: width,
    height: height,
    marginTop: 15,
    marginBottom: 2,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  firstLayer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  secondLayer: {
    width: width / 4.3465,
    height: width / 4.3465,
    position: 'absolute',
    right: width / 70,
    top: width / 12.5,
    borderRadius: width / 4.3465 / 2,
    zIndex: 1,
  },
  statusFirst: {
    backgroundColor: 'green',
  },
  statusSecond: {
    backgroundColor: 'green',
  },
  statusThird: {
    backgroundColor: 'red',
  },
  statusFourth: {
    backgroundColor: 'red',
  },
  thirdLayer: {
    width: width - width / 10,
    height: height - height / 10,
    borderRadius: (width - width / 10) / 2,
  },
  adminplayerCard: {
    width: adminwidth,
    height: adminheight,
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  adminfirstLayer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  adminsecondLayer: {
    width: adminwidth / 4.3465,
    height: adminwidth / 4.3465,
    position: 'absolute',
    right: adminwidth / 70,
    top: adminwidth / 12.5,
    borderRadius: adminwidth / 4.3465 / 2,
    zIndex: 1,
  },
  adminStatus: {
    backgroundColor: 'red',
  },
  adminthirdLayer: {
    width: adminwidth - adminwidth / 10,
    height: adminheight - adminheight / 10,
    borderRadius: (adminwidth - adminwidth / 10) / 2,
  },
  adminbottomPlate: {
    width: 100,
    height: 30,
  },
   bottomPlate: {
    width: 70,
    height: 30,
  },
  commonText:{
    color : 'white',
    fontFamily: 'WickedMouse',
  },
  templateText:{
    color : 'white',
    fontFamily: 'WickedMouse',
    fontSize : 10,
  }
});

RoomScreen.contextType=Context
// export {Header}  ;
