import axios from 'axios';
import { GET_ALL_ORDERS, GET_ERRORS } from './types';

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
