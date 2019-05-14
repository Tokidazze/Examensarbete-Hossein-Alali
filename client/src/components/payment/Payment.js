import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createOrder } from '../../actions/orderActions';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stripeLoading: true
    };
    // onStripeUpdate must be bound or else clicking on button will produce error.
    this.onStripeUpdate = this.onStripeUpdate.bind(this);
    // binding loadStripe as a best practice, not doing so does not seem to cause error.
    this.loadStripe = this.loadStripe.bind(this);
  }

  loadStripe(onload) {
    if (!window.StripeCheckout) {
      const script = document.createElement('script');
      script.onload = function() {
        console.info('Stripe script loaded');
        onload();
      };
      script.src = 'https://checkout.stripe.com/checkout.js';
      document.head.appendChild(script);
    } else {
      onload();
    }
  }

  componentDidMount() {
    this.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: 'pk_test_d9J5PqHSVu8alhM0ujRSP65R00OOoVW2cr',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: token => {
          this.setState({ loading: true });

          const { customerData } = this.props;
          this.props.createOrder(customerData, token, this.props.history);
        }
      });

      this.setState({
        stripeLoading: false,
        // loading needs to be explicitly set false so component will render in 'loaded' state.
        loading: false
      });
    });
  }

  componentWillUnmount() {
    if (this.stripeHandler) {
      this.stripeHandler.close();
    }
  }

  onStripeUpdate(e) {
    e.preventDefault();

    this.stripeHandler.open({
      name: 'Chat&Shop',
      description: 'Games',
      panelLabel: 'Make Payment',
      allowRememberMe: false
    });
  }

  render() {
    // const { stripeLoading, loading } = this.state;
    // console.log(this.props);
    return (
      <div>
        {/* {loading || stripeLoading ? (
          <p>loading..</p>
        ) : ( */}
        <button
          className='btn btn-info btn-block mt-4'
          onClick={this.onStripeUpdate}
        >
          Checkout
        </button>
        {/* )} */}
      </div>
    );
  }
}

export default connect(
  null,
  { createOrder }
)(withRouter(Payment));
