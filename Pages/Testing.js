import React, { Component } from 'react';
import { View, Text ,Button} from 'react-native';
import io from 'socket.io-client/dist/socket.io';


var socket = io('http://13.52.248.221:5000'); 
export  class Testing extends Component {

    
  componentDidMount() {
    

    
    socket.on('send', msg => {
        alert(msg)
    });


  }

  send(){
    socket.emit('send','hi');
  }
  render() {
    return (
      <View>
        <Text>  </Text>

        <Button title="send" onPress={this.send} />
      </View>
    );
  }
}
