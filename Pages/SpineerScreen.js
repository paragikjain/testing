import React from 'react';
//import react in our project
import { StyleSheet, View, Animated, Text,Image, Easing ,Alert, Button} from 'react-native';
//import all the components we needed
//import io from "socket.io-client";
//import socketIO from 'socket.io-client';
import io from 'socket.io-client/dist/socket.io';
var Rand_Deg


export  class SpinnerScreen extends React.Component {
  constructor() {
    super();
    this.RotateValueHolder = new Animated.Value(0);
  }
  

  state={
    deg_x : 0,
    deg_y : 0,
    msg : "Default"
  }

  
  componentDidMount() {
    this.socket = io('http://192.168.43.31:5000'); 


    this.socket.on('start', msg => {
      this.setState({deg_x : 0, deg_y : 1361})
    });
  
    this.socket.on('stop', msg => {
      this.random_deg()
    });

    this.StartImageRotateFunction();
}
  StartImageRotateFunction() {
    
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => this.StartImageRotateFunction());
  }

  jewelStyle(x,y) {
    const RotateData = this.RotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: [x.toString()+"deg", y.toString()+"deg"],
      });
      
    return {
        width: 100,
        height: 200,
        transform: [{ rotate: RotateData }],
    }
  }

  random_deg(){
    Rand_Deg=Math.floor((Math.random() * 200) + 0);
    this.setState({deg_x : Rand_Deg, deg_y : Rand_Deg})
}

start(){
  this.socket.emit('start',"Bottle Roatating");
     this.setState({deg_x : 0, deg_y : 1361})
}

stop(){
  this.socket.emit('stop',"Ratation stopped");
  this.random_deg()
}
  
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.imgBack}>
        <Animated.Image
          style={this.jewelStyle(this.state.deg_x,this.state.deg_y)}
          source={{
            uri:
              'https://pluspng.com/img-png/beer-bottle-png-hd-beer-bottle-png-image-png-image-1275.png',
          }}
        />
        </View>
        <Text>{this.state.msg}</Text>
        <Button title="Start"  onPress={()=>this.start() }/>
        <Button title="Stop"  onPress={()=> this.stop()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgBack:{
    width : 300,
    height : 300,
    alignItems :'center',
    borderRadius : 150,
    justifyContent : 'center',
    backgroundColor : 'yellow',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2C2C2',
  }});