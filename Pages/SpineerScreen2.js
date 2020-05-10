import React, { Component } from "react";
import { StyleSheet, Image, View, Animated, TouchableWithoutFeedback } from "react-native";
let logo = 'https://pluspng.com/img-png/beer-bottle-png-hd-beer-bottle-png-image-png-image-1275.png'
import io from 'socket.io-client/dist/socket.io';

export class SpinnerScreen extends Component {
  state = {
    animation: new Animated.Value(0),

  };

  componentDidMount() {
    this.socket = io('http://13.52.248.221:5000'); 


    this.socket.on('start', msg => {
        this.startAnimation(1*msg);
    });
  

  }

  startAnimation(a)  {
    Animated.timing(this.state.animation, {
      toValue:a,
      duration: 3000,
    }).start() 
  };

  click_Screen= ()=>{
    var a=Math.floor((Math.random() * 10000) + 1);
    this.socket.emit('start',a);

    this.startAnimation(a);
  }
  render() {

    const rotateInterPolate = this.state.animation.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"],
    })
    const animatedStyles = {
      transform: [{ rotate: rotateInterPolate }],
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.click_Screen}>
          <Animated.Image style={[styles.box, animatedStyles]} source={{ uri: logo }} >
        
          </Animated.Image>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 150,
    height: 250,
   
  },
});