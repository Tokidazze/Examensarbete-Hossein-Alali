import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import adminReducer from './adminReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  admin: adminReducer,
  auth: authReducer,
  errors: errorReducer,
  order: orderReducer,
  profile: profileReducer,
  product: productReducer,
  search: searchReducer
});
