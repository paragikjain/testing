import React, { Component } from 'react';
import { View, Text ,StyleSheet ,Image, Button,TouchableOpacity} from 'react-native';

 export class CreateGroup extends Component {


  render() {
    return (
      <View style={styles.userComponent}>
      <View style={styles.userAvtar}>
        <View style={styles.avtarBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
        </View>
        <View style={styles.userButton}>
          <Button  title="Start" />
        </View> 
      </View>
      <View style={styles.playerAvtar}>
        <View style={styles.userbox1}>
        <View style={styles.playerBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
        </View>
        <TouchableOpacity style={styles.playerButton}>
          <Text style={styles.playerText}>Ready</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.userbox2}>
        <View style={styles.playerBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
        </View>
        <TouchableOpacity style={styles.playerButton}>
          <Text style={styles.playerText}>Ready</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.userbox3}>
        <View style={styles.playerBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
        </View>
        <TouchableOpacity style={styles.playerButton}>
          <Text style={styles.playerText}>Ready</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.userbox4}>
        <View style={styles.playerBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
        </View>
        <TouchableOpacity style={styles.playerButton}>
          <Text style={styles.playerText}>Ready</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.userbox5}>
        <View style={styles.playerBlock}>
          <Image source={require('./img_avatar.png')} style = {styles.avtarImage}/>
        </View>
        <TouchableOpacity style={styles.playerButton}>
          <Text style={styles.playerText}>Ready</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.roomBox}>
        <View style={styles.roomCode}>
         <Text style={styles.roomText}>Room Code : 4BHF5F2FVJF3R</Text> 
        </View>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  userComponent:{
    height : '100%',
    justifyContent : 'center',
    alignItems : 'center',
    // backgroundColor :'red',
  },
  userButton:{
    marginTop : 10,
  },
  userAvtar :{
    height : 200,
    // marginTop : 60,
    width : 150,
    marginBottom : 20,
    borderRadius: 20,
    // backgroundColor : 'green',
  },
  avtarBlock:{
    height : 150,
    // marginBottom : 10,
  },
  avtarImage:{
    width : '100%',
    height : '100%',
    borderRadius : 20,

  },
  playerAvtar:{
    padding : 5,
    flexDirection : 'row',
    justifyContent : 'center',
    flexWrap : 'wrap',
  },
  userbox1 :{
    width : 100,
    height : 120,
    margin : 5,
    borderRadius: 10,
    // backgroundColor : 'black',
    
  },
  userbox2:{
    width : 100,
    height : 120,
    margin : 5,
    borderRadius: 10,
    // backgroundColor : 'yellow',
  },
  userbox3:{
    width : 100,
    height : 120,
    borderRadius: 10,
    margin : 5,
    // backgroundColor : 'brown',
  },
  userbox4:{
    width : 100,
    height : 120,
    borderRadius: 10,
    margin : 5,
    // backgroundColor : 'lightpink',
  },
  userbox5:{
    width : 100,
    height : 120,
    borderRadius: 10,
    margin : 5,
    // backgroundColor : 'lightgreen',
  },
  roomCode:{
    width : 300,
    paddingVertical : 20,
    marginTop : 20,
    backgroundColor : 'lightblue',
    alignItems : 'center',
  },
  roomBox:{
    alignItems : 'center'
  },
  roomText :{
  },
  playerBlock:{
    height : 100,
  },
  playerButton:{
    margin: 5,
   backgroundColor: 'white',
   alignContent : 'center',
  },
  playerText:{
    color : 'green',
    alignSelf : 'center',
  }

});
// export {Header}  ;
