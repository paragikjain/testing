/**
  ===========================================================================
 * @file: AudioScreen.js
 *
 * @brief: This file contains stuff realtead audio recording and sending to socet as packets
 *
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

import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import {Context} from '../context/Provider'

var blob;
function convertToBlob(chunk){
   blob = new Blob(chunk, { 'type' : 'audio/ogg; codecs=opus' });
}

class AudioScreen extends Component {
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true
 
 };

  async componentDidMount() {


    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      convertToBlob(chunk)
      //var blob = new Blob(chunk, { 'type' : 'audio/ogg; codecs=opus' });
      this.context.socket.emit("radio",blob)
    });
  }



  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ audioFile, recording: false });
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory('Playback');

    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { recording, paused, audioFile } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

AudioScreen.contextType= Context
export{AudioScreen};