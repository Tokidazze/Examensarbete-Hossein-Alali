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
      instanceLocator: 'v1:us1:464a2e86-22e9-4b79-a7c1-67f315f2ce5e',
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
          roomId: 'c7e9abbe-1026-4038-9bcf-8c28b55cc1f2',
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
