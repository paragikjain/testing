//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet ,Button,Alert,Dimensions} from 'react-native';
import Canvas from 'react-native-canvas';



// create a component
class Game_Table extends Component {
    componentDidMount() {
        this.refs.canvas.width = 800;
        this.refs.canvas.height = 800;
        this.handleCanvas();
       
    }
    
    handleCanvas(){
        const context = this.refs.canvas.getContext('2d');
        context.fillStyle = 'purple';
        //context.fillRect(0, 0, 0, 0);
        var x = this.refs.canvas.width / 2;
        var y = this.refs.canvas.height / 2;
        // number of days
        var days = 1;
        // number of hours
        var hours = this.props.total_player;
        // one segment represents an hour so divide degrees by hours
        var segmentWidth = 360 / hours;
        // size of a pie : it is an angle in radians
        var pieAngle = 2 * Math.PI / hours;
        // how thick you want a segment
        var segmentDepth = 180;

        for (var i = 1; i <= days; i++) {
            var radius=i * segmentDepth
            for (var i = 0; i < hours; i++) {
                context.beginPath();
                
                context.moveTo(x, y);
                context.arc(x, y, radius, i*pieAngle, (i+1)*pieAngle, false);
                context.lineWidth = segmentDepth;
                var hueValue = i * 15;
                context.fillStyle = 'hsl(' + hueValue + ',70%, 60%)';
                // '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = '#444';
                context.stroke();
            }
        }
        
}



   render() {
                return (
                    <Canvas ref="canvas" />
        );    
    }
}

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export {Game_Table};
