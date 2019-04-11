import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllProducts } from '../../actions/productActions';
import ProductsCards from '../cards/ProductsCards';

class Products extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const { products } = this.props.product;

    return (
      <div className=''>
        <ProductsCards products={products} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getAllProducts }
)(withRouter(Products));
