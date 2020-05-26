import React, { Component } from "react";
import { StyleSheet, Image, View, Animated, TouchableWithoutFeedback,Text, Alert ,Easing,panHandlers ,PanResponder,PanResponderInstance} from "react-native";
import {PanGestureHandler} from 'react-native-gesture-handler'
import io from 'socket.io-client/dist/socket.io';
import {Game_Table} from '../component/Game_Table'
import SoundPlayer from 'react-native-sound-player'
let logo = 'https://pluspng.com/img-png/beer-bottle-png-hd-beer-bottle-png-image-png-image-1275.png'

const Sound = require('react-native-sound')

export class SpinnerScreen extends Component {
  state = {
    animation: new Animated.Value(0),
    speed:0,
    animation_running_status:0,
    Total_player:10,
    Current_Bottle_poes:0,
};

componentDidMount(){
  this.state.animation.addListener(({value}) => this.setState({Current_Bottle_poes:value}));
}

   rotateInterPolate = this.state.animation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  })
  Per_Player_Deg=360/this.state.Total_player
  startAnimation = (Direction) => {
    this.play_audio()
    this.setState({animation_running_status:1})
    Animated.decay(this.state.animation, {
      velocity: Direction,
      useNativeDriver: true,
    }).start(
      ()=>this.setState({animation_running_status:0},
      this.Which_Player_Turn()
      )) 
  };
  constructor(props) {
  super(props)
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({speed:Math.abs(gestureState.vx)+Math.abs(gestureState.vy)})
        if(Math.abs(gestureState.dx)>10 && Math.abs(gestureState.dy)>10&& this.state.speed>1 && this.state.animation_running_status==0){
          this.startAnimation(this.state.speed)
        }
      },
    });
  }
  play_audio=()=>{
    let hello = new Sound('bottle_rolling.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(error)
      }
      else{
        hello.play((success) => {
          if (!success) {
            console.log('Sound did not play')
          }
        })
      }
    })
  }

  Which_Player_Turn=()=>{
     let DEG_CAL=0
    for(let i =1; i<=this.state.Total_player;i++)
    {
      DEG_CAL=DEG_CAL+this.Per_Player_Deg
      if(DEG_CAL> (this.state.Current_Bottle_poes)%360)
      {
        Alert.alert("Player ID:"+i+"is winner")
        break
      }
    }
  }
  render() {
    const animatedStyles = {
      transform: [{ rotate: this.rotateInterPolate }],
    };
    return (
      <View style={styles.container} {...this._panResponder.panHandlers} >
        <Game_Table total_player={this.state.Total_player}/>
        <Animated.Image style={[styles.box, animatedStyles]} source={{ uri: logo }} >
        </Animated.Image>
       </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2C2C2',
  },
  box: {
    width: 55,
    height: 200,
    position: 'absolute',
   
  },
});