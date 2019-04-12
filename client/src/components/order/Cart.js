import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Order.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false
    };
  }

  render() {
    const { showing } = this.state;

    const cartContent = (
      <div className='container cart-content'>
        <p>My added item(s)</p>

        <div className='cart-order'>
          <p>Titel: Game here</p>
          <p>Price: 200</p>
        </div>

        <Link
          onClick={() => this.setState({ showing: !showing })}
          to='/checkout/order'
          className='btn btn-primary checkout-btn'
        >
          Proceed to Checkout
        </Link>
      </div>
    );

    return (
      <div className='cart'>
        <span onClick={() => this.setState({ showing: !showing })}>
          <i className='fas fa-shopping-cart text-info' />
        </span>
        {showing ? cartContent : null}
      </div>
    );
  }
}

export default Cart;
