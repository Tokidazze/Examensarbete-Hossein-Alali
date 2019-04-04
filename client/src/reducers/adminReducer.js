import { GET_ALL_USERS, LOADING } from '../actions/types';

const initialState = {
  getUsers: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_USERS:
      return {
        ...state,
        getUsers: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
