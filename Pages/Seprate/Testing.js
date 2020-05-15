import React, { Component } from 'react';
import { View, Text ,Alert} from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import {Context} from './Provider' 
export class Testing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    
    console.log('new');
    this.context.socket.emit('start','hello im here');
    this.context.socket.on("Brodacast",msg => {
     alert('hjfffdr');
    });
  }


  render() {
    return (
      <Context.Consumer>{
        navneet=>
         <Text>  {navneet.a}</Text>
      }
      </Context.Consumer>
    );
  }
}

Testing.contextType=Context