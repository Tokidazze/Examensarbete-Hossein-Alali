import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';

import './Cards.css';
import Filterbar from '../filterbar/Filterbar';

class ProductsCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filters: [],
      filteredGames: []
    };
  }

  componentDidMount() {
    this.setState({ products: this.props.products });
  }

  onClickProduct(id) {
    this.props.history.push({
      pathname: `/products/${id}`
    });
  }

  onCartClick(id) {
    this.props.addToCart(id);
  }

  filterGames(gamesList, gameCategories) {
    let completeGameList = [];

    let res = gamesList.map(game => {
      if (this.arrContains(gameCategories, game.category)) {
        completeGameList.push(game);
      }
    });
    console.log(completeGameList);
    return completeGameList;
  }

  arrContains(arr1, arr2) {
    let contains = true;
    arr1.map(arr1item => {
      if (!arr2.includes(arr1item)) {
        contains = false;
      }
    });
    return contains;
  }

  handleCategoryChange(e) {
    const name = e.target.name;
    const checked = e.target.checked;

    const prod = this.state.products;

    const filters = this.state.filters;
    let index;

    // check if the check box is checked or unchecked
    if (checked) {
      // add the value of the checkbox to filters array
      filters.push(name);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = filters.indexOf(name);
      filters.splice(index, 1);
    }

    // update the state with the new array of options
    this.setState({ filters: filters });

    const na = filters.join().split(',');

    this.filterGames(prod, na);
  }

  render() {
    const { products } = this.state;
    // const { filters } = this.state;
    // console.log(filters);

    return (
      <div className='product-cards'>
        <div className='container cards-topper'>
          <p>Games: {products.length}</p>
          <Filterbar
            products={products}
            onChange={this.handleCategoryChange.bind(this)}
          />
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
)(withRouter(ProductsCards));
