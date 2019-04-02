import React from 'react';
import { Link } from 'react-router-dom';

const AdminActions = () => {
  return (
    <div className='container'>
      <h4>Admin Actions</h4>
      <div className='btn-group mb-4'>
        <Link to='/admin/user' className='btn btn-light'>
          <i className='fas fa-users text-info mr-1' />
          Handle Users
        </Link>
        <Link to='/admin/product' className='btn btn-light'>
          <i className='fas fa-gamepad text-info mr-1' />
          Handle Products
        </Link>
        <Link to='/admin/order' className='btn btn-light'>
          <i className='fas fa-mail-bulk text-info mr-1' />
          Handle Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminActions;
