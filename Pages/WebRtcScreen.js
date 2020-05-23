/**
  ===========================================================================
 * @file: WebRtcScreen.js
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
import * as mediasoupClient from 'mediasoup-client'
import {RTCPeerConnection,RTCIceCandidate,RTCSessionDescription,RTCView,MediaStream,
        MediaStreamTrack,mediaDevices,registerGlobals} from 'react-native-webrtc';
import io from 'socket.io-client/dist/socket.io';
registerGlobals()
class WebRtcScreen extends Component {
    componentDidMount(){
          const roomId = 'roomId';
          const peerName = 'peerNamsse';
          const room = new mediasoupClient.Room();   
          const socket = io('http://13.52.248.221:8080', { query: { roomId, peerName } });  
          room.join(peerName)
  .then((peers) => {
    console.debug('PEERS:', peers);

    // Create the Transport for sending our media.
    sendTransport = room.createTransport('send');
    // Create the Transport for receiving media from remote Peers.
    recvTransport = room.createTransport('recv');

    peers.forEach(peer => handlePeer(peer));
  })
  .then(() => {
    // Get our mic and camera
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
  })
  .then((stream) => {
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];
    // Create Producers for audio and video.
    const audioProducer = room.createProducer(audioTrack);
    const videoProducer = room.createProducer(videoTrack);
    // Send our audio.
    audioProducer.send(sendTransport);
    // Send our video.
    videoProducer.send(sendTransport);
  });

// Event fired by local room when a new remote Peer joins the Room
room.on('newpeer', (peer) => {
  console.debug('A new Peer joined the Room:', peer.name);

  // Handle the Peer.
  handlePeer(peer);
});

// Event fired by local room
room.on('request', (request, callback, errback) => {
  console.debug('REQUEST:', request);
  socket.emit('mediasoup-request', request, (err, response) => {
    if (!err) {
      // Success response, so pass the mediasoup response to the local Room.
      callback(response);
    } else {
      errback(err);
    }
  });
});

// Be ready to send mediaSoup client notifications to our remote mediaSoup Peer
room.on('notify', (notification) => {
  console.debug('New notification from local room:', notification);
  socket.emit('mediasoup-notification', notification);
});

// Handle notifications from server, as there might be important info, that affects stream
socket.on('mediasoup-notification', (notification) => {
  console.debug('New notification came from server:', notification);
  room.receiveNotification(notification);
});

function handlePeer(peer) {
  // Handle all the Consumers in the Peer.
  peer.consumers.forEach(consumer => handleConsumer(consumer));

  // Event fired when the remote Room or Peer is closed.
  peer.on('close', () => {
    console.log('Remote Peer closed');
  });

  // Event fired when the remote Peer sends a new media to mediasoup server.
  peer.on('newconsumer', (consumer) => {
    console.log('Got a new remote Consumer');

    // Handle the Consumer.
    handleConsumer(consumer);
  });

  function handleConsumer(consumer) {
    // Receive the media over our receiving Transport.
    consumer.receive(recvTransport)
      .then((track) => {
        console.debug('Receiving a new remote MediaStreamTrack:', consumer.kind);
  
        // Attach the track to a MediaStream and play it.
        const stream = new MediaStream();
        stream.addTrack(track);
  
        if (consumer.kind === 'video') {
          const video = document.createElement('video');
          video.setAttribute('style', 'max-width: 400px;');
          video.setAttribute('playsinline', '');
          video.srcObject = stream;
          document.getElementById('container').appendChild(video);
          video.play();
        }
        if (consumer.kind === 'audio') {
          const audio = document.createElement('audio');
          audio.srcObject = stream;
          document.getElementById('container').appendChild(audio);
          audio.play();
        }
      });
  
    // Event fired when the Consumer is closed.
    consumer.on('close', () => {
      console.log('Consumer closed');
    });
  }
  

}

    }
  render() {
    return (
      <View >

      </View>
    );
  }
}

//AudioScreen.contextType= Context
export{WebRtcScreen};