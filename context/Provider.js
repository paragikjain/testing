import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';

const Context = React.createContext();

class Provider extends Component {
    state = {
        socket : io('http://192.168.43.31:5000'),
        usernameexist:0,
        local_username:'',
        local_userid:'',
    };
    getDataFromLocal = async () => {
        try {
          const value = await AsyncStorage.getItem('Usernames')
          const value2 = await AsyncStorage.getItem('UserID')
          if(value !== null) {
          this.setState({usernameexist:1,local_username:value,local_userid:value2})
          }
        } catch(e) {
          console.log("errors")
        }
      }

    render() {
        this.getDataFromLocal()
        return (
            <Context.Provider
                value={{
                    socket:this.state.socket,
                    usernameexist:this.state.usernameexist,
                    local_userid:this.state.local_userid,
                    local_username:this.state.local_username
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export{Provider,Context}