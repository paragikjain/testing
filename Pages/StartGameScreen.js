import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Alert } from 'react-native';
import {Context} from '../context/Provider'
import io from 'socket.io-client/dist/socket.io';

class StartGameScreen extends Component {
  componentDidMount(){
  this.context.socket.emit("start","hello")

  }
    render() {
      return (
      <Context.Consumer>{
        food=><Text>{food.a}</Text>
      }
        </Context.Consumer>
    );
    }
  }

  StartGameScreen.contextType= Context

  export{StartGameScreen};