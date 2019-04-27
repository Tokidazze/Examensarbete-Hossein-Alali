import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import CheckboxField from '../common/CheckboxField';

import './Filterbar.css';

class Filterbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      categories: [],
      checkedCategories: new Map()
    };
  }

  handleClickOutside = evt => {
    this.setState({ showing: false });
  };

  onChangeCategory(e) {
    const category = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedCategories: prevState.checkedCategories.set(category, isChecked)
    }));

    this.props.onChange(e);
  }

  render() {
    const { showing } = this.state;

    this.props.products &&
      this.props.products.map((product, index) =>
        product.category.map((cat, index) => this.state.categories.push(cat))
      );

    const nonDuplicateCategories = Array.from(
      new Set(this.state.categories)
    ).sort();

    const content = (
      <div className='bar-content'>
        <p>Category:</p>
        {nonDuplicateCategories.map((sorted, index) => (
          <div className='form-check' key={index}>
            <CheckboxField
              name={sorted}
              value={sorted}
              checked={this.state.checkedCategories.get(sorted)}
              onChange={this.onChangeCategory.bind(this)}
            />
            <label className='form-check-label' htmlFor={sorted}>
              {sorted}
            </label>
          </div>
        ))}
      </div>
    );

    return (
      <div className='filter-bar'>
        <button
          onClick={() => this.setState({ showing: !showing })}
          className='btn btn-primary'
        >
          <i className='fas fa-filter' />
        </button>
        {showing ? content : null}
      </div>
    );
  }
}

export default onClickOutside(Filterbar);
