import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return <div>Admin dashboard</div>;
  }
}

export default connect(
  null,
  { getCurrentProfile }
)(AdminDashboard);
