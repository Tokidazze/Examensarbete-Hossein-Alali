import axios from 'axios';
import { GET_ALL_USERS, GET_ERRORS } from './types';

// Get all users
export const getAllUsers = () => dispatch => {
  axios
    .get('/api/admin/users/all')
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
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
export const updateUser = (updatedUser, history) => dispatch => {
  axios
    .put(`/api/admin/edit/user/${updatedUser.id}`, updatedUser)
    .then(res => history.push('/admin/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete user
export const deleteUser = (id, history) => dispatch => {
  axios
    .delete(`/api/admin/delete/user/${id}`)
    .then(res => history.push('/admin/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
