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

  // TODO: refactor and rewrite if time allows

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

  filterGamesByCategory(gamesList, gameCategories) {
    let completeGameList = [];

    gamesList.map(game => {
      if (this.arrContainsCategory(gameCategories, game.category)) {
        completeGameList.push(game);
      }
    });

    return this.setState({
      filteredGames: completeGameList
    });
  }

  arrContainsCategory(arr1, arr2) {
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

    this.filterGamesByCategory(prod, filters);
  }

  render() {
    const { products } = this.state;
    const { filteredGames } = this.state;

    const filteredGamesCard = (
      <div className='container cards-container'>
        {filteredGames.map((product, index) => (
          <div className='card game-card' key={index}>
            <img
              src={product.image}
              className='card-img-top'
              alt='product'
              onClick={this.onClickProduct.bind(this, product._id)}
            />
            <div className='card-body'>
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
    );

    const allProducts = (
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
    );

    return (
      <div className='product-cards'>
        <div className='container cards-topper'>
          <p>Games: {products.length}</p>
          <Filterbar
            products={products}
            onChange={this.handleCategoryChange.bind(this)}
          />
        </div>
        {filteredGamesCard.props.children.length > 0
          ? filteredGamesCard
          : allProducts}
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
