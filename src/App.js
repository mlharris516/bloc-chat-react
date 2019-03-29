import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './Components/RoomList';

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
    this.state = {
      rooms: [],
      newRoomName: ''
    };
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;
