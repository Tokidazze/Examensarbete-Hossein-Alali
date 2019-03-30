import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import './Sidebar.css';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false
    };
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <Menu right isOpen={this.state.menuOpen}>
        <Link
          onClick={() => this.closeMenu()}
          id='home'
          className='menu-item'
          to='/'
        >
          Home
        </Link>
        <Link
          onClick={() => this.closeMenu()}
          id='login'
          className='menu-item'
          to='/login'
        >
          Login
        </Link>
        <Link
          onClick={() => this.closeMenu()}
          id='register'
          className='menu-item'
          to='/register'
        >
          Register
        </Link>
      </Menu>
    );
  }
}

export default Sidebar;
