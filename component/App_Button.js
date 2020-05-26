//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert ,TouchableOpacity,ImageBackground} from 'react-native';
import { Exitpopup } from '../Pages/exitpopup'
let button = 'https://raw.githubusercontent.com/navneetofficial25/images/master/btn-pre%402x.png';

// create a component
class App_Button extends Component {

    render() {
        if (this.props.mode == '1') {
            return (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.RedirectTo)}>
                        <View style={styles.buttonview}>
                            <ImageBackground style={styles.buttonmiddle} source={require('../assets/img/base_button.png')}>
                                <Text style={styles.text}>{this.props.title}</Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity> 
               
            );
        }
        else {
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
    buttonview:{
        width: 200,
        height: 80,
      },
      buttonmiddle:{
        width : '100%',
        height : '100%',
        alignItems :'center',
        justifyContent: 'center',
      },
      text:{
        alignItems :'center',
        color : 'white',
        textShadowColor:'black',
        textShadowOffset:{width: 2, height: 2},
        textShadowRadius:10,
        shadowOpacity: 1,
        fontFamily: 'WickedMouse',
        fontSize : 20,
    
      },
      
});

//make this component available to the app
export { App_Button };
