import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

import './Chat.css';
import ChatScreen from './ChatScreen';

class ChatContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({ username: this.props.auth.user.name });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({ username: nextProps.auth.user.name });
    }
  }

  render() {
    const noUsername = <div>Please sign in to Chat!</div>;

    const usernameExists = <ChatScreen username={this.state.username} />;

    return (
      <div className='chat-container'>
        <div className='chat-box'>
          {this.props.auth.isAuthenticated ? usernameExists : noUsername}
        </div>
        <div className='chat-icon'>
          <i className='fas fa-comment-alt' />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ChatContainer);
