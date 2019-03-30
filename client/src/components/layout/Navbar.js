import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar';

import './Layout.css';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-light bg-light'>
          <Link className='navbar-brand' to='/'>
            Chat&Buy
          </Link>
          <Sidebar />
        </nav>
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
    );
  }
}

export default Navbar;
