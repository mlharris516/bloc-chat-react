import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      username: null,
    };
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span id="user">
           <User 
            firebase={firebase} 
            setUser={this.setUser.bind(this)} 
            user={this.state.user} />
        </span>

        <h1 className="App-title">Bloc Chat</h1>
        </header>

        <aside id="sidebar">
          <div>Chat Rooms</div>
          <RoomList 
            firebase={firebase}  
            activeRoom={this.state.activeRoom} 
            setActiveRoom={this.setActiveRoom.bind(this)}
            user={this.state.user} 
          />
          </aside>
          <span id="main">
            <MessageList 
              firebase={firebase} 
              activeRoom={this.state.activeRoom} 
              user={this.state.user} 
          />
          </span>
      </div>
    );
  }
}

export default App;
