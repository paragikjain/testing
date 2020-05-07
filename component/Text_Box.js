//import liraries
import React, { Component } from 'react';
import { TextInput , StyleSheet } from 'react-native';

const BLUE = "#428AF8"
const LIGHT_GRAY = "#D3D3D3"
// create a component
class Text_Box extends Component {
    state={
        isFocused : false
    };

    handleFocus = event => {
        this.setState({isFocused : true});
        if(this.props.onFocus){
            this.props.onFocus(event);
        }
    };
    handleBlur = event => {
        this.setState({isFocused : true});
        if(this.props.onBlur){
            this.props.onBlur(event);
        }
    };
   
    render() {
        const { isFocused } =this.state;
        return (
            <TextInput 
            placeholder="Enter Game ID"
            selectionColor={BLUE}
            underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY} 
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={styles.TextBox_Design} />
        );    
    }
}

// define your styles
const styles = StyleSheet.create({
    TextBox_Design: {
        marginTop:10,
        width:"80%",
        height:"10%",
        alignSelf:"center",
        color:"red",
    },
});

//make this component available to the app
export {Text_Box};
