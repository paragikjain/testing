import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io';

const Context = React.createContext();

class Provider extends Component {
    state = {
        socket : io('http://192.168.43.31:5000'),
        a:1
    };

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

export{Provider,Context}