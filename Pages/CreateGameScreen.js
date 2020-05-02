import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Alert } from 'react-native';
import { App_Button } from '../Component/App_Button';

class CreateGameScreen extends Component {
    render() {
      return (
  <View style={styles.Button_Box}>
        <App_Button title="Create Game" navigation={this.props.navigation} RedirectTo='RoomScreen'  mode='1' />
        <App_Button title="Join Game" navigation={this.props.navigation} RedirectTo='JoinRoomScreen'  mode='1' />
        
      </View>
      );
    }
  }

      // define your styles
const styles = StyleSheet.create({
    Button_Box: {
      justifyContent: 'center',
      alignItems: 'center',
      flex:1
    },
  });
    export{CreateGameScreen};