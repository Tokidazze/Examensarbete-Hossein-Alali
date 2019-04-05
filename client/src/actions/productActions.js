import axios from 'axios';
import { GET_ALL_PRODUCTS, GET_ERRORS } from './types';

// Get all products
export const getAllProducts = () => dispatch => {
  axios
    .get('/api/products/all')
    .then(res => {
      dispatch({
        type: GET_ALL_PRODUCTS,
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

// Update user
export const updateProduct = (updatedProduct, history) => dispatch => {
  axios
    .put(`/api/products/update/${updatedProduct.id}`, updatedProduct)
    .then(res => history.push('/admin/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete product
export const deleteProduct = (id, history) => dispatch => {
  axios
    .delete(`/api/products/delete/${id}`)
    .then(res => history.push('/admin/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
