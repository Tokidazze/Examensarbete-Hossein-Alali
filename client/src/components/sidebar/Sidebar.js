import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';

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
        <a
          onClick={() => this.closeMenu()}
          id='home'
          className='menu-item'
          href='/'
        >
          Home
        </a>
        <a
          onClick={() => this.closeMenu()}
          id='login'
          className='menu-item'
          href='/login'
        >
          Login
        </a>
        <a
          onClick={() => this.closeMenu()}
          id='register'
          className='menu-item'
          href='/register'
        >
          Register
        </a>
      </Menu>
    );
  }
}

export default Sidebar;
