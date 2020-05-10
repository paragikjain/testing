//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet ,Button,Alert,Dimensions} from 'react-native';



// create a component
class Game_Table extends Component {
   render() {
                return (
            <View style={styles.Table_Design} >
                
            </View>
        );    
    }
}

// define your styles
const styles = StyleSheet.create({
    Table_Design: {
        
        width : 380,
        height : 380,
        alignItems :'center',
        borderRadius : 270,
        justifyContent : 'center',
        backgroundColor : 'orange',
        },
});

//make this component available to the app
export {Game_Table};
