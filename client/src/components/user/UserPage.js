import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

import './UserPage.css';

class UserPage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;
    // console.log(profile);

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div className='container'>
          <div className='container user-info'>
            <h4 className=''>User information</h4>
            <p>Username: {profile.name}</p>
            <p>Email: {profile.email}</p>
          </div>

          <div className='container order-info'>
            <h4>Orders</h4>
            {profile.orders.length > 0
              ? profile.orders.map((order, index) => (
                  <div className='table-responsive' key={index}>
                    <p>Order</p>
                    <table className='table table-hover'>
                      <tbody>
                        <tr>
                          <th scope='col'>Firstname</th>
                          <td>{order.customerFirstName}</td>
                        </tr>
                        <tr>
                          <th scope='col'>Lastname</th>
                          <td>{order.customerLastName}</td>
                        </tr>
                        <tr>
                          <th scope='col'>Address</th>
                          <td>{order.address}</td>
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
                          <th scope='col'>Order</th>
                          {order.orderProducts.map((item, index) => (
                            <td className='td-container' key={index}>
                              {item.productTitle} x{item.quantity}
                              <p>Price {item.price}</p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th scope='col'>Total</th>
                          <td>{order.totalSum}</td>
                        </tr>
                        <tr>
                          <th scope='col'>Date</th>
                          <td>{order.date}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))
              : null}
          </div>
        </div>
      );
    }

    return (
      <div className='userPage'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(UserPage);
