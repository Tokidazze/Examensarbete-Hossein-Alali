import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../../actions/productActions';

import './Admin.css';

class AdminProduct extends Component {
  constructor() {
    super();
    this.state = {
      allProducts: [],
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.user.role) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allProducts: nextProps.product.products
    });
  }

  onClickDelete(id) {
    this.props.deleteProduct(id, this.props.history);
  }

  onClickEdit(id, product) {
    this.props.history.push({
      pathname: `/admin/products/${id}`,
      state: {
        key: product
      }
    });
  }

  render() {
    const products = this.state.allProducts.map(product => (
      <tbody key={product._id} className='admin-product-container'>
        <tr>
          <th scope='col'>Title</th>
          <td>{product.title}</td>
        </tr>
        <tr scope='row'>
          <th scope='col'>Actions</th>
          <td>
            <button
              onClick={this.onClickEdit.bind(this, product._id, product)}
              type='button'
              className='btn btn-info'
            >
              Edit
            </button>
            <button
              onClick={this.onClickDelete.bind(this, product._id)}
              type='button'
              className='btn btn-danger'
            >
              Delete
            </button>
          </td>
        </tr>
        <tr>
          <th scope='col'>Desciption</th>
          <td className='break-word'>{product.description}</td>
        </tr>
        <tr>
          <th scope='col'>Image</th>
          <td className='break-word'>{product.image}</td>
        </tr>
        <tr>
          <th scope='col'>Price</th>
          <td>{product.price}</td>
        </tr>
        <tr>
          <th scope='col'>Category</th>
          {product.category.map((category, index) => (
            <td className='td-container' key={index}>
              {category}
            </td>
          ))}
        </tr>
        <tr>
          <th scope='col'>Stock</th>
          <td>{product.stock}</td>
        </tr>
        <tr>
          <th scope='col'>Date</th>
          <td>{product.date}</td>
        </tr>
      </tbody>
    ));
    return (
      <div className='container'>
        <Link to='/admin/dashboard' className='btn btn-secondary product-back'>
          Back
        </Link>
        <Link className='btn btn-primary' to='/admin/products/create'>
          Add product
        </Link>
        <div className='table-responsive'>
          <table className='table table-hover table-container'>{products}</table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllProducts, deleteProduct }
)(withRouter(AdminProduct));
