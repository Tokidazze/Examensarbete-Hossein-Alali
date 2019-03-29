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
        <a id='about' className='menu-item' href='/about'>
          About
        </a>
        <a id='contact' className='menu-item' href='/contact'>
          Contact
        </a>
      </Menu>
    );
  }
}

export default Sidebar;
