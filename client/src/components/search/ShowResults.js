import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Search.css';

class ShowResults extends Component {
  onClickProduct(id) {
    this.props.history.push({
      pathname: `/products/${id}`
    });
    this.props.onClick();
  }

  render() {
    const { productsFilter } = this.props.search;

    return (
      <div className="results-container">
        {productsFilter !== undefined
          ? productsFilter.slice(-5).map((product, index) => (
              <div
                className="results"
                key={index}
                onClick={this.onClickProduct.bind(this, product._id)}
              >
                <div className="result-item">
                  <img src={product.image} alt={product.title} />
                  <p className="result-title">
                    <b>{product.title}</b>
                  </p>
                  <p className="result-price">{product.price} SEK</p>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps)(withRouter(ShowResults));
