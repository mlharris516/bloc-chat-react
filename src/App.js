import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC8Hf9uRFuSzIVlWysyJIGPVw1ZNSQpEPM",
    authDomain: "bloc-chat-mlh.firebaseapp.com",
    databaseURL: "https://bloc-chat-mlh.firebaseio.com",
    projectId: "bloc-chat-mlh",
    storageBucket: "bloc-chat-mlh.appspot.com",
    messagingSenderId: "349967670370"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      activeRoom: null,
    };
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  render() {
    return (
      <div className="App">
       <h1 className="App-title">Bloc Chat</h1>
       <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} />
       <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
