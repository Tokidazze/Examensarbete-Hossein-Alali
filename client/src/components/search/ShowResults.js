import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowResults extends Component {
  render() {
    const { productsFilter } = this.props.search;
    console.log(productsFilter);

    return (
      <div>
        <h1>results</h1>
        {productsFilter.slice(-5).map((product, index) => (
          <div className='card game-card' key={index}>
            {product.title}
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
