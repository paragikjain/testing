import React, { Component } from 'react';
import {Text, View,StyleSheet} from 'react-native';
import {Text_Box} from '../Component/Text_Box'
import{App_Button} from '../Component/App_Button'

class JoinRoomScreen extends Component {
    render() {
      return (
        <View style={{ marginTop:"40%" }}>
        <Text style={{textAlign:"center"}}>Please Enter Game ID</Text>
        <Text_Box />
        <App_Button title="Join Game"/>
        </View>
      );
    }
  }


  export{JoinRoomScreen};