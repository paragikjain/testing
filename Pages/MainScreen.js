import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Alert } from 'react-native';
import { App_Button } from '../component/App_Button';

class MainScreen extends Component {

    render() {
        return (
    <View style={styles.Button_Box}>
          <App_Button title="Start Game" navigation={this.props.navigation} RedirectTo='StartGameScreen'  mode='1' />
          <App_Button title="Play with friend" navigation={this.props.navigation} RedirectTo='CreateGameScreen' mode='1'/>
          <App_Button title="Toss" navigation={this.props.navigation} RedirectTo='TossScreen' mode='1'/>
          <App_Button title="Spineer" navigation={this.props.navigation} RedirectTo='SpinnerScreen' mode='1'/>
          <App_Button title="Connection" navigation={this.props.navigation} RedirectTo='Connection' mode='1'/>
          <App_Button title="Exit"  mode='0'/>
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
    export{MainScreen};