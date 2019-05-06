import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

class ChatScreen extends Component {
  componentDidMount() {
    // const chatManager = new ChatManager({
    //   instanceLocator: 'v1:us1:1f8f2f41-6b31-4104-a400-4e26edca68c7',
    //   userId: this.props.username,
    //   tokenProvider: new TokenProvider({
    //       url:
    //   })
    // });
    console.log('hej');
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>hello there friend</h1>
      </div>
    );
  }
}

export default ChatScreen;
