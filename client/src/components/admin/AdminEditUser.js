import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser } from '../../actions/adminActions';

class AdminEditUser extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      email: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.user.role) {
      this.props.history.push('/');
    }

    this.setState({
      id: this.props.location.state.key._id,
      name: this.props.location.state.key.name,
      email: this.props.location.state.key.email
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updatedUser = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email
    };

    this.props.updateUser(updatedUser, this.props.history);
  }

  render() {
    return (
      <div className='edit-user'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <form noValidate onSubmit={this.onSubmit}>
                <h3 className='text-center'>Edit user</h3>
                <TextFieldGroup
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={this.state.email}
                  onChange={this.onChange}
                />

                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateUser }
)(withRouter(AdminEditUser));
