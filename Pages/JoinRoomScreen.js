import React, { Component } from 'react';
import {Text, View,StyleSheet} from 'react-native';
import {Text_Box} from '../component/Text_Box'
import{App_Button} from '../component/App_Button'

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