//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import{ MainScreen } from './Pages/MainScreen';
import{ CreateGameScreen } from './Pages/CreateGameScreen';
import{ StartGameScreen } from './Pages/StartGameScreen';
import { RoomScreen } from './Pages/RoomScreen'


//Naviagtion Control Stack
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}>
      <Stack.Screen name="Truth And Dare" component={MainScreen}  />
      <Stack.Screen name="CreateGameScreen" component={CreateGameScreen}  />
      <Stack.Screen name="StartGameScreen" component={StartGameScreen}  />
      <Stack.Screen name="RoomScreen" component={RoomScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



//make this component available to the app
export default App;
