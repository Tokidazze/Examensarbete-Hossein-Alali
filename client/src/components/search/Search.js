import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProduct } from '../../actions/searchActions';
import ShowResults from './ShowResults';
import onClickOutside from 'react-onclickoutside';

import './Search.css';

class Search extends Component {
  state = {
    showing: false
  };

  handleClickOutside = evt => {
    this.setState({ showing: false });
  };

  onClickClose(e) {
    this.setState({ showing: false });
  }

  render() {
    const { showing } = this.state;
    const { searchProduct, value } = this.props;

    return (
      <div className='search-container'>
        <input
          type='text'
          className='form-control'
          placeholder='Search'
          onClick={() => this.setState({ showing: true })}
          onChange={e => searchProduct(e.target.value.toLowerCase())}
          value={value}
        />
        <div className='results-parent'>
          {showing ? (
            <ShowResults onClick={this.onClickClose.bind(this)} />
          ) : null}
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
)(onClickOutside(Search));
