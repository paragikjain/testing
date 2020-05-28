import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Alert,Image,ImageBackground,ScrollView} from 'react-native';
import {App_Button} from '../component/App_Button';
let logo =
  'https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-2.png';
class MainScreen extends Component {
  render() {
    return (
      <View style={styles.Button_Box}>
      <ImageBackground source={require('../assets/img/bg_bubble.png')} style={(styles.fixed, styles.image)} />
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
        style={styles.fixed}>
       <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/img/logo.png')} />
        </View>
        <View style={styles.midbutton}>
        {/* <App_Button
          title="Start Game"
          navigation={this.props.navigation}
          RedirectTo="StartGameScreen"
          mode="1"
        /> */}
        <App_Button
          title="Play Now"
          navigation={this.props.navigation}
          RedirectTo="CreateGameScreen"
          mode="1"
        />
        <App_Button
          title="Toss"
          navigation={this.props.navigation}
          RedirectTo="TossScreen"
          mode="1"
        />
        {/* <App_Button
          title="Spineer"
          navigation={this.props.navigation}
          RedirectTo="SpinnerScreen"
          mode="1"
        />
        <App_Button
          title="Connection"
          navigation={this.props.navigation}
          RedirectTo="Connection"
          mode="1"
        />*/
        <App_Button
          title="Testing"
          navigation={this.props.navigation}
          RedirectTo="Testing"
          mode="1"
        /> 
        }
        </View>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  Button_Box: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1486ED',
  },
  logo: {
    width: 300,
    height: 300,
    borderColor: '#fff',
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  midbutton: {
    alignItems: 'center',
  },

});
export {MainScreen};
