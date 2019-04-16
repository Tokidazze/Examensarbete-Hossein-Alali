import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProduct } from '../../actions/searchActions';

class Search extends Component {
  render() {
    const { searchProduct, value } = this.props;
    return (
      <div className='input-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Search'
          onChange={e => searchProduct(e.target.value.toLowerCase())}
          value={value}
        />
        <div className='input-group-append'>
          <button className='btn btn-info' type='button'>
            <i className='fa fa-search' />
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ productsFilter }) {
  return { value: productsFilter };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ searchProduct }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
