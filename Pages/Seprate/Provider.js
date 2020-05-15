import React, { Component } from 'react';
import { View, Text } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
const Context = React.createContext();

  class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        a:123454,
        socket : io('http://192.168.43.252:5000')
    };
  }

  render() {
    return (
        <Context.Provider
        value={{
            socket:this.state.socket,
            a:this.state.a
        }}

    >
           {this.props.children}
            </Context.Provider>
    );
  }
}
export {Provider,Context}