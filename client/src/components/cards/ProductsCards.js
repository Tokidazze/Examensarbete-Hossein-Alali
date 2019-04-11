import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './Cards.css';

class ProductsCards extends Component {
  onClickProduct(id) {
    this.props.history.push({
      pathname: `/products/${id}`
    });
  }

  render() {
    const products = this.props.products;
    return (
      <div className='product-cards'>
        <div className='container cards-topper'>
          <p>Games: {products.length}</p>
          <button className='btn btn-primary'>
            <i className='fas fa-filter' />
          </button>
        </div>
        <div className='container cards-container'>
          {products.map((product, index) => (
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
                <div
                  className='btn-group'
                  role='group'
                  aria-label='Basic example'
                >
                  <button className='btn btn-secondary'>
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
      </div>
    );
  }
}

export default withRouter(ProductsCards);
