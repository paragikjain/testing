//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet ,Button,Alert} from 'react-native';
import {Exitpopup} from '../Pages/exitpopup'


// create a component
class App_Button extends Component {
   
    render() {
        if (this.props.mode=='1') {
            return (
                <View style={styles.Button_Design}>
                    <Button
                    title={this.props.title}
                    onPress={() =>this.props.navigation.navigate(this.props.RedirectTo,)}
                    />
                </View>
            );    
        }
        else{
            return (
                <View style={styles.Button_Design}>
                    <Button
                    title={this.props.title}
                    onPress={Exitpopup}
                    />
                </View>
            );
        } 
    }
}

// define your styles
const styles = StyleSheet.create({
    Button_Design: {
        marginTop:10,
        width:"50%",
        alignSelf:"center",
        color:"red",
    },
});

//make this component available to the app
export {App_Button};
