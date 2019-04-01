import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class UserPage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return <div>User info and orders here</div>;
  }
}

export default connect(
  null,
  { getCurrentProfile }
)(UserPage);
