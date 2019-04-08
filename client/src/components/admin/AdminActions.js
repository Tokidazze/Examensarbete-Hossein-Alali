import React from 'react';
import { Link } from 'react-router-dom';

const AdminActions = () => {
  return (
    <div className='container'>
      <h4>Admin Actions</h4>
      <div className='btn-group mb-4'>
        <Link to='/admin/users' className='btn btn-light'>
          <i className='fas fa-users text-info mr-1' />
          <br />
          Handle Users
        </Link>
        <Link to='/admin/products' className='btn btn-light'>
          <i className='fas fa-gamepad text-info mr-1' />
          <br />
          Handle Products
        </Link>
        <Link to='/admin/orders' className='btn btn-light'>
          <i className='fas fa-mail-bulk text-info mr-1' />
          <br />
          Handle Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminActions;
