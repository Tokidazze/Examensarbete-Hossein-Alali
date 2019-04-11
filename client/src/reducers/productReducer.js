import { GET_ALL_PRODUCTS, GET_PRODUCT, LOADING } from '../actions/types';

const initialState = {
  products: [],
  product: [],
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

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
