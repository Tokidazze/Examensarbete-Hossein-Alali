import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import './Sidebar.css';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false
    };
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className='container'>
        <li>
          <Link
            onClick={() => this.closeMenu()}
            id='userpage'
            className='menu-item'
            to='/user/profile'
          >
            My Profile
          </Link>
        </li>
        <li>
          <a
            href='/login'
            onClick={this.onLogoutClick.bind(this)}
            className='menu-item'
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className='container'>
        <li>
          <Link
            onClick={() => this.closeMenu()}
            id='login'
            className='menu-item'
            to='/login'
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            onClick={() => this.closeMenu()}
            id='register'
            className='menu-item'
            to='/register'
          >
            Register
          </Link>
        </li>
      </ul>
    );

    return (
      <Menu right isOpen={this.state.menuOpen}>
        <ul className='container'>
          <li>
            <Link
              onClick={() => this.closeMenu()}
              id='home'
              className='menu-item'
              to='/'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => this.closeMenu()}
              id='products'
              className='menu-item'
              to='/products'
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              onClick={() => this.closeMenu()}
              id='category'
              className='menu-item'
              to='/products/category'
            >
              Category
            </Link>
          </li>
        </ul>
        {isAuthenticated ? authLinks : guestLinks}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Sidebar);
