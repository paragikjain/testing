import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Alert } from 'react-native';
//import Dialog, { DialogContent } from 'react-native-popup-dialog';

// create a component
function  Exitpopup() {
    return (
        Alert.alert("Are you sure??")
    );
}




//make this component available to the app
export {Exitpopup};


