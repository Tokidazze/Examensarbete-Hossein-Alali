import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import AdminActions from './AdminActions';

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.user.role) {
      this.props.history.push('/');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div className='container'>
          <p>Welcome admin {profile.name}!</p>
          <AdminActions />
        </div>
      );
    }

    return (
      <div className='userPage'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(AdminDashboard);
