import React, { Component } from 'react';
import Moment from 'react-moment';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            activeRoomMessages: [],
            newMessageText: '',
        };
        this.messagesRef = this.props.firebase.database().ref("Messages");

    }

    activeRoomMessages(activeRoom) {
        if (!activeRoom) {
            return;
        }
        this.setState(
                { activeRoomMessages: this.state.messages.filter(message => message.roomId === activeRoom.key) }
        );
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) }, () => { this.activeRoomMessages( this.props.activeRoom );
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        this.activeRoomMessages( nextProps.activeRoom );
    }

    createMessage(newMessageText) {
        if (!this.props.activeRoom || !newMessageText) { return; }
        this.messagesRef.push({
            content: newMessageText,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.activeRoom.key,
            username: this.props.user ? this.props.user.displayName : 'Anonymous',
        });
            this.setState({ newMessageText: ''});
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ newMessageText: e.target.value });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.createMessage(this.state.newMessageText);
    }

    render() {
        return (
            <main>
        <p>Room: {this.props.activeRoom ? this.props.activeRoom.name : ''}</p>
        <table>
            <tr>
                <th>User</th>
                <th>Message</th>
                <th>Sent</th>
            </tr>
            {this.state.activeRoomMessages.map(message => (
                        <tr key={message.key}>
                            <td className="user-name">{message.username ? message.username : 'Anonymous'}</td>
                            <td className="content">{message.content}</td>
                            <td className="sentAt"><Moment element="span" format="MM/DD/YY hh:mm A" className="sent-at">
	  	  { message.sentAt }
		</Moment></td>
                        </tr>
                    ))}
            
        </table>
        
        <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessageText) } }>
          <input type="text" value={ this.state.newMessageText } onChange={ this.handleChange.bind(this) } content="newMessageText" placeholder="Write your message here..." />
          <input type="submit" value="Send"/>
        </form>

        </main>
     
            /*<table
             id="message-component">
                <caption className="active-room">Room: {this.props.activeRoom ? this.props.activeRoom.name : ''}
                </caption>
                <tbody id="message-list">
                    <tr>
                        <th>User</th>
                        <th>Message</th>
                        <th>Sent</th>
                    </tr>
                    {this.state.activeRoomMessages.map(message => (
                        <tr key={message.key}>
                            <td className="user-name">{message.username ? message.username : 'Anonymous'}</td>
                            <td className="content">{message.content}</td>
                            <td className="sentAt">{message.sentAt}</td>
                        </tr>
                    ))}
                </tbody>
                <form id="create-message" onSubmit={ (e) => {this.handleSubmit(e) }  }>
                    <input type="text" value={ this.state.newMessageText } onChange={ this.handleChange.bind(this) } name="newMessageText" placeholder="Enter text here..."/>
                    <input type="submit" value="Send"/>
                </form>
            </table>*/
          );
    }
}

export default MessageList;