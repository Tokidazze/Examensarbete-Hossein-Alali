import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar';
import Cart from '../order/Cart';
import logo from '../../img/logo.png';
import Search from '../search/Search';

import './Layout.css';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-light bg-light'>
          <Link className='navbar-brand' to='/'>
            <img id='logo' src={logo} alt='logo' />
          </Link>
          {/* TODO: if case for diffrent navbar */}
          <div className='navbar-end'>
            <Cart />
            <Sidebar />
          </div>
        </nav>
        <div className='container form-container'>
          <form className='form-inline my-2 my-lg-0 navbar-form'>
            <Search />
          </form>
        </div>
      </div>
    );
  }
}

export default Navbar;
