import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

import './Auth.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center register-header'>Sign Up</h1>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type='text'
                  // classnames will always show, is-invalid class will only show if errors.name is triggered
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name
                  })}
                  placeholder='Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  type='email'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })}
                  placeholder='Email'
                  name='email'
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  type='password'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })}
                  placeholder='Password'
                  name='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  type='password'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password2
                  })}
                  placeholder='Confirm Password'
                  name='password2'
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
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
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
