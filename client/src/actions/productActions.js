import axios from 'axios';
import { GET_ALL_PRODUCTS, GET_PRODUCT, GET_ERRORS } from './types';

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

// Get single product
export const getProductById = id => dispatch => {
  axios
    .get(`/api/products/product/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCT,
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

// Create product
export const createProduct = (productData, history) => dispatch => {
  axios
    .post('/api/products/create', productData)
    .then(res => history.push('/admin/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update product
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
