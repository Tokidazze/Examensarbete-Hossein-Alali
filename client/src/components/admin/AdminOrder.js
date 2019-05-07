import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../actions/orderActions';

import './Admin.css';

class AdminOrder extends Component {
  constructor() {
    super();
    this.state = {
      allOrders: [],
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getAllOrders();
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.user.role) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allOrders: nextProps.order.orders
    });
  }

  // first, last, address, zip, city, totalSum, date, orderProducts.title, quantity, price
  render() {
    const orders = this.state.allOrders.map(order => (
      <tr key={order._id}>
        <th scope='row'>{order.customerFirstName}</th>
        <td>{order.customerLastName}</td>
        <td>{order.address}</td>
        <td>{order.zip}</td>
        <td>{order.city}</td>
        <td>
          {order.orderProducts.map(products => (
            <div key={products._id}>
              <li className='product-title'>
                {products.productTitle} x {products.quantity}
              </li>
              <li>{products.price}</li>
            </div>
          ))}
        </td>
        <td>{order.totalSum}</td>
        <td>{order.date}</td>

        {/* <td>
          <button
            onClick={this.onClickEdit.bind(this, user._id, user)}
            type='button'
            className='btn btn-info'
          >
            Edit
          </button>
          <button
            onClick={this.onClickDelete.bind(this, user._id)}
            type='button'
            className='btn btn-danger'
          >
            Delete
          </button>
        </td> */}
      </tr>
    ));
    return (
      <div className='container'>
        <Link to='/admin/dashboard' className='btn btn-secondary'>
          Back
        </Link>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>Customer Firstname</th>
                <th scope='col'>Customer Lastname</th>
                <th scope='col'>Address</th>
                <th scope='col'>Zip</th>
                <th scope='col'>City</th>
                <th scope='col'>Order</th>
                <th scope='col'>Total Sum</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>{orders}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllOrders }
)(withRouter(AdminOrder));
