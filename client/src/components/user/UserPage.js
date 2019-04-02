import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class UserPage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div className='container'>
          <p>Welcome {profile.name}!</p>

          <div className='container user-info'>
            <h4 className=''>User information</h4>
            <p>Username: {profile.name}</p>
            <p>Email: {profile.email}</p>
          </div>

          <div className='container order-info'>
            <h4>Orders</h4>
            <p>TODO: orders here</p>
          </div>
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
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(UserPage);
