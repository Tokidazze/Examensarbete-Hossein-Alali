import { GET_ALL_PRODUCTS, SEARCH, LOADING } from '../actions/types';

const initialState = {
  products: [],
  value: '',
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };

    // Search
    case SEARCH:
      const { value } = action;
      const productsFilter = state.products.filter(
        // includes works here
        product => product.title.toLowerCase().indexOf(value) > -1
      );
      return {
        ...state,
        value,
        productsFilter
      };

    default:
      return state;
  }
}
