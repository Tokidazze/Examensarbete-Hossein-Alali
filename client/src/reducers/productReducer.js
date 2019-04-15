import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  ADD_TO_CART,
  LOADING
} from '../actions/types';

const initialState = {
  products: [],
  product: [],
  addedItems: [],
  total: 0,
  loading: false
};

export default function(state = initialState, action) {
  if (action.type === ADD_TO_CART) {
    let addedItem = state.products.find(
      product => product._id === action.payload
    );
    console.log(addedItem);

    let existed_item = state.addedItems.find(
      product => action.payload === product._id
    );
    if (existed_item) {
      addedItem.quantity += 1;

      return {
        ...state,
        total: state.total + addedItem.price
      };
    } else {
      addedItem.quantity = 1;

      let newTotal = state.total + addedItem.price;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      };
    }
  }
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
