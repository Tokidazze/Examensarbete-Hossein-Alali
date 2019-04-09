import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPageCards extends Component {
  render() {
    const products = this.props.products;
    console.log(products);
    return (
      <div className='container'>
        {products.map((product, index) => (
          <div className='card' key={index}>
            <img src={product.image} className='card-img-top' alt='product' />
            <div className='card-body'>
              <h5 className='card-title'>{product.title}</h5>
              <p className='card-text'>{product.price}kr</p>
              <div
                className='btn-group'
                role='group'
                aria-label='Basic example'
              >
                <button className='btn btn-secondary'>
                  <i className='fas fa-cart-plus' />
                </button>
                <Link to='/' className='btn btn-primary'>
                  Buy
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default LandingPageCards;
