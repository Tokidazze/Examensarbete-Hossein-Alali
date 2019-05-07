import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Spinner from '../common/Spinner';

class ChatScreen extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      currentRoom: {},
      currentUser: {}
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:1f8f2f41-6b31-4104-a400-4e26edca68c7',
      userId: this.props.username,
      tokenProvider: new TokenProvider({
        url: '/api/users/chatAuth'
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoomMultipart({
          roomId: '19394872',
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(err => console.log(err));
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      roomId: this.state.currentRoom.id,
      text
    });
  }

  render() {
    const messageList = <MessageList messages={this.state.messages} />;
    const spinner = <Spinner />;
    return (
      <div>
        <div>{this.state.messages.length > 0 ? messageList : spinner}</div>
        <SendMessageForm onSubmit={this.sendMessage} />
      </div>
    );
  }
}

export default ChatScreen;
