import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../../actions/adminActions';

import './Admin.css';

class AdminUser extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  onClickDelete(id) {
    this.props.deleteUser(id, this.props.history);
  }

  render() {
    const users = this.props.admin.getUsers.map(user => (
      <tr key={user._id}>
        <th scope='row'>{user.name}</th>
        <td>{user.email}</td>
        <td>
          <button type='button' className='btn btn-info'>
            Edit
          </button>
          <button
            onClick={this.onClickDelete.bind(this, user._id)}
            type='button'
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className='table-responsive'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Username</th>
              <th scope='col'>Email</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { getAllUsers, deleteUser }
)(withRouter(AdminUser));
