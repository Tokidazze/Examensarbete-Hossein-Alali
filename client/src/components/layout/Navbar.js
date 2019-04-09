import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar';
import logo from '../../img/logo.png';

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
          <Sidebar />
        </nav>
        <div className='container form-container'>
          <form className='form-inline my-2 my-lg-0 navbar-form'>
            <input
              className='form-control mr-sm-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button className='btn btn--success my-2 my-sm-0' type='submit'>
              <i className='fas fa-search' />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Navbar;
