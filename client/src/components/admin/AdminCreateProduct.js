import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import { createProduct } from '../../actions/productActions';

class AdminCreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      image: '',
      price: null,
      category: [],
      stock: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const createProduct = {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      price: this.state.price,
      category: this.state.category,
      stock: this.state.stock
    };

    this.props.createProduct(createProduct, this.props.history);
  }

  render() {
    return (
      <div className='create-product'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <form noValidate onSubmit={this.onSubmit}>
                <h3 className='text-center'>Create product</h3>
                <TextFieldGroup
                  type='text'
                  placeholder='Title'
                  name='title'
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Description'
                  name='description'
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Image'
                  name='image'
                  value={this.state.image}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Price'
                  name='price'
                  value={this.state.price}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Category'
                  name='category'
                  value={this.state.category}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Stock'
                  name='stock'
                  value={this.state.stock}
                  onChange={this.onChange}
                />

                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createProduct }
)(withRouter(AdminCreateProduct));
