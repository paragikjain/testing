import React, { Component } from 'react';
import {Text,TouchableOpacity ,View,StyleSheet, Button} from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";

//starting timer
var StartClock = new Date();
var StartTime = StartClock.getTime();
console.log(StartTime);
//code for genrating random words
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var Word = []; 
var charactersLength = characters.length;
for(var i=0; i<5; i++)
{
    while(1){
        var index=Math.floor(Math.random()*charactersLength);
        if(Word.includes(characters.charAt(index))){
            continue;
        }
        else{
            break;
        }
    }
    Word.push(characters.charAt(index));
}
var wordDict= [];
//end of code

//code of insert 5 random character to front end
for(var i=0; i<5; i++){
    
    wordDict.push({key:Word[i],backgroundColor:`rgb(${Math.floor(Math.random() * 255)}, ${index *
        5}, ${132})`,label:Word[i]});
}



  class TossScreen extends Component {
    state = {
      data: wordDict,
      answer:"",
      time:""
    };
    
    checkorder = () => {

       var EndClock = new Date();
       var timeDiff =EndClock.getTime()-StartTime;
        var userAns=[];
       for(var i=0; i<5;i++){
        userAns.push(this.state.data[i].key)
       }
       if(JSON.stringify(userAns)==JSON.stringify(Word.sort())){
        this.setState({
                answer: 'Correct',
                time:timeDiff/1000
            })
        }
        else{
            this.setState({
                answer: 'Wrong',
                time:timeDiff/1000
            })
        }
      }

    renderItem = ({ item, index, drag, isActive }) => {
      return (
        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: isActive ? "blue" : item.backgroundColor,
            alignItems: "center",
            justifyContent: "center"
          }}
          onLongPress={drag}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 32
            }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    };
   
    render() {
      return (
        <View style={{ flex: 1, marginTop:50 }}>
          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => this.setState({ data })}
          />
          <Text>{this.state.time}</Text>
          <Text>{this.state.answer}</Text>
          <Button title="submit" onPress={this.checkorder} />
        </View>
      );
    }
  }



  export{TossScreen};