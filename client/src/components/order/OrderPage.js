import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createOrder } from '../../actions/orderActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Payment from '../payment/Payment';

class OrderPage extends Component {
  constructor() {
    super();
    this.state = {
      ïd: '',
      customerFirstName: '',
      customerLastName: '',
      address: '',
      zip: '',
      city: '',
      totalSum: 0,
      orderProducts: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        totalSum: nextProps.products.total,
        orderProducts: nextProps.products.addedItems
      });
    }
  }

  componentWillMount() {
    this.setState({
      totalSum: this.props.products.total,
      orderProducts: this.props.products.addedItems
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onSubmit(e) {
  //   e.preventDefault();

  //   const orderData = {
  //     customerFirstName: this.state.customerFirstName,
  //     customerLastName: this.state.customerLastName,
  //     address: this.state.address,
  //     zip: this.state.zip,
  //     city: this.state.city,
  //     orderProducts: this.state.orderProducts,
  //     totalSum: this.state.totalSum
  //   };

  //   this.props.createOrder(orderData, this.props.history);
  // }

  render() {
    const { errors } = this.state;

    const customerData = {
      id: this.props.auth.user.id,
      customerFirstName: this.state.customerFirstName,
      customerLastName: this.state.customerLastName,
      address: this.state.address,
      zip: this.state.zip,
      city: this.state.city,
      orderProducts: this.state.orderProducts,
      totalSum: this.state.totalSum
    };

    return (
      <div className='order-page'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center register-header'>
                My order
              </h1>
              <div>
                <div>
                  {this.state.orderProducts.map((item, index) => (
                    <div className='container checkout-items' key={index}>
                      <p>
                        <b>Title: {item.title}</b> x{item.quantity}
                      </p>
                      <p>
                        <b>Price: </b>
                        {item.price} SEK
                      </p>
                    </div>
                  ))}
                </div>
                <p>Total: {this.state.totalSum} SEK</p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type='text'
                  placeholder='First name'
                  name='customerFirstName'
                  value={this.state.customerFirstName}
                  onChange={this.onChange}
                  error={errors.customerFirstName}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Last name'
                  name='customerLastName'
                  value={this.state.customerLastName}
                  onChange={this.onChange}
                  error={errors.customerLastName}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Address'
                  name='address'
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Zip'
                  name='zip'
                  value={this.state.zip}
                  onChange={this.onChange}
                  error={errors.zip}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='City'
                  name='city'
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />

                {/* <input type='submit' className='btn btn-info btn-block mt-4' /> */}
                <Payment
                  customerData={customerData}
                  errors={this.state.errors}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  products: state.product
});

export default connect(
  mapStateToProps,
  { createOrder }
)(withRouter(OrderPage));
