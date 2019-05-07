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
      <tr key={product._id}>
        <th scope='row'>
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
        </th>
        <td>{product.title}</td>
        <td className='desc-container'>{product.description}</td>
        <td>{product.image}</td>
        <td>{product.price}</td>
        <td>
          {product.category.slice(0, 6).map((category, index) => (
            <div key={index}>{category}</div>
          ))}
        </td>
        <td>{product.stock}</td>
        <td>{product.date}</td>
      </tr>
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
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>Actions</th>
                <th scope='col'>Title</th>
                <th scope='col'>Description</th>
                <th scope='col'>Image</th>
                <th scope='col'>Price</th>
                <th scope='col'>Category</th>
                <th scope='col'>Stock</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>{products}</tbody>
          </table>
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
