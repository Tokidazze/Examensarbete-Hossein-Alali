import axios from 'axios';
import { GET_ALL_ORDERS, GET_ERRORS, CLEAR_CART } from './types';

// Get all orders
export const getAllOrders = () => dispatch => {
  axios
    .get('/api/orders/all')
    .then(res => {
      dispatch({
        type: GET_ALL_ORDERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create order
export const createOrder = (customerData, stripeToken, history) => dispatch => {
  axios
    .post('/api/orders/payment', {
      customerData: customerData,
      stripeToken: stripeToken
    })
    .then(res => {
      dispatch({
        type: CLEAR_CART,
        payload: []
      });
    })
    .then(res => history.push('/user/profile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
