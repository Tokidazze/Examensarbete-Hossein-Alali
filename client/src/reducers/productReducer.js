import { GET_ALL_PRODUCTS, LOADING } from '../actions/types';

const initialState = {
  products: [],
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

    default:
      return state;
  }
}
