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
      this.props.getCurrentProfile();
      this.setState({ username: this.props.profile.name });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isAuthenticated) {
      this.setState({ username: nextProps.profile.name });
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
  auth: state.auth,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(ChatContainer);
