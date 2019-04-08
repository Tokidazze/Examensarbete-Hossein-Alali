import { GET_ALL_ORDERS, LOADING } from '../actions/types';

const initialState = {
  orders: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
