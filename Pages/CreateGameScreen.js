import React, { Component} from 'react';
import { View, Text, StyleSheet, Button,Alert } from 'react-native';
import { App_Button } from '../component/App_Button';
import Modal from 'react-native-modal';
import {Text_Box} from '../component/Text_Box'


class CreateGameScreen extends Component {
  state={
    isModalVisible : false,
  }
  render() {
      return (
  <View style={styles.Button_Box}>
        <App_Button title="Create Game" navigation={this.props.navigation} RedirectTo='RoomScreen'  mode='1' />
        <View style={styles.Button_Design}>
          <Button title="Join Game" onPress={()=>this.setState({isModalVisible: true})} />
        </View>
        <Modal style={{justifyContent: 'center', height:'10%'}} isVisible={this.state.isModalVisible}>
          <View style={{flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:'red',width:50,height:50}}>
              <View >
            <Text>Please Enter Game ID</Text>
            <Text_Box />
             </View>
             </View>
        </Modal>
 </View>
      );
    }
  }

      // define your styles
const styles = StyleSheet.create({
    Button_Box: {
      justifyContent: 'center',
      alignItems: 'center',
      flex:1
    },
    Button_Design: {
      marginTop:10,
      width:"50%",
      alignSelf:"center",
      color:"red",
  },
  });
    export{CreateGameScreen};