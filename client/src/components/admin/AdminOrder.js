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
      <tbody key={order._id} className='admin-product-container'>
        <tr>
          <th scope='col'>Firstname</th>
          <td>{order.customerFirstName}</td>
        </tr>

        <tr>
          <th scope='col'>Lastname</th>
          <td className='break-word'>{order.customerLastName}</td>
        </tr>
        <tr>
          <th scope='col'>Address</th>
          <td className='break-word'>{order.address}</td>
        </tr>
        <tr>
          <th scope='col'>Zip</th>
          <td>{order.zip}</td>
        </tr>
        <tr>
          <th scope='col'>City</th>
          <td>{order.city}</td>
        </tr>
        <tr>
          <th scope='col'>Products</th>
          {order.orderProducts.map((product, index) => (
            <td className='td-container' key={index}>
              {product.productTitle} x{product.quantity}
              <p>{product.price}</p>
            </td>
          ))}
        </tr>
        <tr>
          <th scope='col'>Total</th>
          <td>{order.totalSum} SEK</td>
        </tr>
        <tr>
          <th scope='col'>Date</th>
          <td>{order.date}</td>
        </tr>
      </tbody>
    ));
    return (
      <div className='container'>
        <Link to='/admin/dashboard' className='btn btn-secondary'>
          Back
        </Link>
        <div className='table-responsive'>
          <table className='table table-hover'>{orders}</table>
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
