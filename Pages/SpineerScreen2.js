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
        this.startAnimation();
    });
  

  }

  startAnimation()  {
    Animated.timing(this.state.animation, {
      toValue: Math.floor((Math.random() * 10000) + 1),
      duration: 3000,
    }).start() 
  };

  click_Screen= ()=>{
    this.socket.emit('start',"Bottle Roatating");
    this.startAnimation();
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