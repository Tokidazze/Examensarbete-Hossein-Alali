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
          className='container carousel slide'
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
              <Link to='/products/5ca7247a47082a56e8967976'>
                <img
                  src='https://cdn.cdkeys.com/media/responsivebannerslider/banneronen_1553244008.jpg'
                  className='d-block w-100'
                  alt='img-1'
                />
              </Link>
            </div>
            <div className='carousel-item'>
              <Link to='/products/5cadf442041fd1e5850417c5'>
                <img
                  src='https://cdn.cdkeys.com/media/responsivebannerslider/banneren_1554901906.jpg'
                  className='d-block w-100'
                  alt='img-2'
                />
              </Link>
            </div>
            <div className='carousel-item'>
              <Link to='/products/5cdaad9ed0f7db045cb5b86f'>
                <img
                  src='https://cdn.cdkeys.com/media/responsivebannerslider/banneronen_1557812205.jpg'
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
