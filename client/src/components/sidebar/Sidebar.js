import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import onClickOutside from 'react-onclickoutside';

import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  handleClickOutside = evt => {
    this.closeMenu();
  };

  render() {
    const { user, isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="container">
        <li>
          <Link
            onClick={() => this.closeMenu()}
            id="userpage"
            className="menu-item"
            to="/user/profile"
          >
            My Profile
          </Link>
        </li>
        <li>
          <a href="/login" onClick={this.onLogoutClick.bind(this)} className="menu-item">
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="container">
        <li>
          <Link onClick={() => this.closeMenu()} id="login" className="menu-item" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link onClick={() => this.closeMenu()} id="register" className="menu-item" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );

    const adminLinks = (
      <ul className="container">
        <li>
          <Link
            onClick={() => this.closeMenu()}
            id="admin-dashboard"
            className="menu-item"
            to="/admin/dashboard"
          >
            Admin Dashboard
          </Link>
        </li>
        <li>
          <Link
            onClick={() => this.closeMenu()}
            id="admin-product"
            className="menu-item"
            to="/admin/products"
          >
            Admin Products
          </Link>
        </li>
        <li>
          <Link
            onClick={() => this.closeMenu()}
            id="admin-user"
            className="menu-item"
            to="/admin/users"
          >
            Admin Users
          </Link>
        </li>
        <li>
          <Link
            onClick={() => this.closeMenu()}
            id="admin-order"
            className="menu-item"
            to="/admin/orders"
          >
            Admin Orders
          </Link>
        </li>
      </ul>
    );

    return (
      <Menu
        right
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
      >
        <ul className="container">
          <li>
            <Link onClick={() => this.closeMenu()} id="home" className="menu-item" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link
              onClick={() => this.closeMenu()}
              id="products"
              className="menu-item"
              to="/products"
            >
              Products
            </Link>
          </li>
        </ul>
        {user.role ? adminLinks : null}
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
  { logoutUser, clearCurrentProfile }
)(onClickOutside(Sidebar));
