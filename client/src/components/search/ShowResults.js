import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Search.css';

class ShowResults extends Component {
  componentDidUpdate(prevProps) {
    console.log(prevProps);
  }

  render() {
    const { productsFilter } = this.props.search;
    console.log(productsFilter);

    return (
      <div className='results-container'>
        {productsFilter.slice(-5).map((product, index) => (
          <div className='results' key={index}>
            <div className='result-item'>
              <img src={product.image} alt={product.title} />
              <p className='result-title'>
                <b>{product.title}</b>
              </p>
              <p className='result-price'>{product.price} SEK</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps)(ShowResults);
