import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProductById } from '../../actions/productActions';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: '',
      price: null,
      category: [],
      stock: null,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.product.title,
      description: nextProps.product.description,
      image: nextProps.product.image,
      price: nextProps.product.price,
      category: nextProps.product.category,
      stock: nextProps.product.stock
    });
  }

  componentDidMount() {
    this.props.getProductById(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h1>hej</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product
});

export default connect(
  mapStateToProps,
  { getProductById }
)(withRouter(ProductPage));
