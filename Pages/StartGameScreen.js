import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Alert } from 'react-native';
import {Context} from '../context/Provider'


class StartGameScreen extends Component {
  render() {
      return (
      <Context.Consumer>{
        data=><View>
        <Text>{data.usernameexist}</Text>
        <Text>{data.local_username}</Text>
        <Text>{data.local_userid}</Text>
      </View>
      }
        </Context.Consumer>
    );
    }
  }

  StartGameScreen.contextType= Context

  export{StartGameScreen};