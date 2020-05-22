/**
  ===========================================================================
 * @file: App.js
 *
 * @brief: This file contains main page which holds navigator for other pics
 *
 * ============================================================================
 *
 * Copyright © Eniacoder, 2020
 *
 * This material, including documentation and any related computer programs,is
 * protected by copyright controlled by Eniacoder.All rights are
 * reserved.Copying, including reproducing,storing, adapting or translating,any
 * or all of this material require written consent of Eniacoder.
 * This material may also contain confidential information,which should not be
 * disclosed to others without prior written consent of Eniacoder.
 *
 * ============================================================================
 *
 * <b> REVISION HISTORY </b>
 *
 * @Version 1.0 : 22-MAY-2019 
 * Author :Parag Jain 
 *                                          
 *
 *
 *============================================================================
 */

//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import{ MainScreen } from './Pages/MainScreen';
import{ CreateGameScreen } from './Pages/CreateGameScreen';
import{ StartGameScreen } from './Pages/StartGameScreen';
import { RoomScreen } from './Pages/RoomScreen';
import { JoinRoomScreen } from './Pages/JoinRoomScreen';
import { TossScreen } from './Pages/TossScreen'
import { SpinnerScreen } from './Pages/SpineerScreen2'
import {Provider} from './context/Provider'
import {AudioScreen} from './Pages/AudioScreen'
import {WebRtcScreen} from './Pages/WebRtcScreen'

//Naviagtion Control Stack
const Stack = createStackNavigator();

function App() {
  return (
    <Provider>
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}> 
      <Stack.Screen name="Truth And Dare" component={MainScreen}  />
      <Stack.Screen name="CreateGameScreen" component={CreateGameScreen}  />
      <Stack.Screen name="StartGameScreen" component={StartGameScreen}  />
      <Stack.Screen name="RoomScreen" component={RoomScreen}  />
      <Stack.Screen name="JoinRoomScreen" component={JoinRoomScreen}  />
      <Stack.Screen name="TossScreen" component={TossScreen}  />
      <Stack.Screen name="SpinnerScreen" component={SpinnerScreen}  />
      <Stack.Screen name="WebRtcScreen" component={WebRtcScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}



//make this component available to the app
export default App;
