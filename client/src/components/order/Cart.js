import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeItem,
  addQuantity,
  subtractQuantity
} from '../../actions/cartActions';

import './Order.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false
    };
  }

  handleRemove = id => {
    this.props.removeItem(id);
  };
  //to add the quantity
  handleAddQuantity = id => {
    this.props.addQuantity(id);
  };
  //to substruct from the quantity
  handleSubtractQuantity = id => {
    this.props.subtractQuantity(id);
  };

  render() {
    const { showing } = this.state;

    let addedItems = this.props.items.addedItems.length ? (
      this.props.items.addedItems.map(item => {
        return (
          <li className='cart-items' key={item._id}>
            <div className='item-img'>
              <img src={item.image} alt={item.image} className='' />
            </div>

            <div className='item-desc'>
              <span className='title'>
                <b>{item.title}</b>
              </span>
              <span>Price: {item.price} SEK</span>
              <span>Quantity: {item.quantity}</span>
              <div className='add-remove'>
                <button
                  onClick={() => {
                    this.handleAddQuantity(item._id);
                  }}
                  className='btn'
                >
                  <i className='fas fa-plus' />
                </button>
                <button
                  onClick={() => {
                    this.handleSubtractQuantity(item._id);
                  }}
                  className='btn'
                >
                  <i className='fas fa-minus' />
                </button>
              </div>
              <button
                onClick={() => {
                  this.handleRemove(item._id);
                }}
                className='btn btn-danger'
              >
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <p>Nothing added.</p>
    );

    const cartContent = (
      <div className='container cart-content'>
        <p>My added item(s)</p>
        {addedItems}
        Total: {this.props.items.total}
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

const mapStateToProps = state => {
  return {
    items: state.product
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(removeItem(id));
    },
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
