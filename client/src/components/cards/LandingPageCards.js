import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';

import './Cards.css';

class LandingPageCards extends Component {
  onClickProduct(id, product) {
    this.props.history.push({
      pathname: `/products/${id}`
    });
  }

  onCartClick(id) {
    this.props.addToCart(id);
  }

  render() {
    const products = this.props.products;
    return (
      <div className='container cards-container'>
        {products.slice(-10).map((product, index) => (
          <div className='card game-card' key={index}>
            <img
              src={product.image}
              className='card-img-top'
              alt='product'
              onClick={this.onClickProduct.bind(this, product._id)}
            />
            <div className='card-body'>
              {/* <h5 className='card-title'>{product.title}</h5> */}
              <p className='card-text'>{product.price} SEK</p>
              <div className='btn-group' role='group' aria-label='Basic example'>
                <button
                  onClick={this.onCartClick.bind(this, product._id)}
                  className='btn btn-secondary'
                >
                  <i className='fas fa-cart-plus' />
                </button>
                <button
                  onClick={this.onClickProduct.bind(this, product._id)}
                  className='btn btn-primary'
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => {
      dispatch(addToCart(id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LandingPageCards));
