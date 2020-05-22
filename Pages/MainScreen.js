/**
  ===========================================================================
 * @file: Mainscreen.js
 *
 * @brief: Mainscreen from where we will navigate to other componenet of application
 *
 *
 * ============================================================================
 *
 * Copyright © Eniacoder, 2020
 *
 * This material, including documentation and any related computer programs,is
 * protected by copyright controlled by Eniacoder.All rights are
 * reserved.Copying, including reproducing,storing, adapting or translating,any
 * or all of this material require written consent of Eniacoder.
 * This material may also contain confidential information,which should not be
 * disclosed to others without prior written consent of Eniacoder.
 *
 * ============================================================================
 *
 * <b> REVISION HISTORY </b>
 *
 * @Version 1.0 : 22-MAY-2019 
 * Author :Parag Jain 
 *                                          
 *
 *
 *============================================================================
 */



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
          <App_Button title="WebRtc" navigation={this.props.navigation} RedirectTo='WebRtcScreen' mode='1'/>
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