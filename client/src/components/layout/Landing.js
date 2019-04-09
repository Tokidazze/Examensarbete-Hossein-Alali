import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getAllProducts } from '../../actions/productActions';
import LandingPageCards from '../cards/LandingPageCards';

class Landing extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const { products } = this.props.product;

    return (
      <div className=''>
        <div
          id='games-carousel'
          className='carousel slide'
          data-ride='carousel'
        >
          <ol className='carousel-indicators'>
            <li
              data-target='#games-carousel'
              data-slide-to='0'
              className='active'
            />
            <li data-target='#games-carousel' data-slide-to='1' />
            <li data-target='#games-carousel' data-slide-to='2' />
          </ol>
          <div className='carousel-inner'>
            <div className='carousel-item active'>
              <Link to='/products/categories'>
                <img
                  src='https://images.unsplash.com/photo-1496857239036-1fb137683000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
                  className='d-block w-100'
                  alt='img-1'
                />
              </Link>
            </div>
            <div className='carousel-item'>
              <Link to='/products/categories'>
                <img
                  src='https://images.unsplash.com/photo-1465920431246-94bf7d9d4269?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                  className='d-block w-100'
                  alt='img-2'
                />
              </Link>
            </div>
            <div className='carousel-item'>
              <Link to='/products/categories'>
                <img
                  src='https://images.unsplash.com/photo-1453955994444-36bcd2f979fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                  className='d-block w-100'
                  alt='img-3'
                />
              </Link>
            </div>
          </div>
          <a
            className='carousel-control-prev'
            href='#games-carousel'
            role='button'
            data-slide='prev'
          >
            <span className='carousel-control-prev-icon' aria-hidden='true' />
            <span className='sr-only'>Previous</span>
          </a>
          <a
            className='carousel-control-next'
            href='#games-carousel'
            role='button'
            data-slide='next'
          >
            <span className='carousel-control-next-icon' aria-hidden='true' />
            <span className='sr-only'>Next</span>
          </a>
        </div>
        <LandingPageCards products={products} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getAllProducts }
)(withRouter(Landing));
