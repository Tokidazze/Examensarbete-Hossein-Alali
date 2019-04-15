import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  ADD_TO_CART,
  ADD_ITEM_QUANTITY,
  SUBTRACT_ITEM_QUANTITY,
  REMOVE_FROM_CART,
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

    // Add item to cart
    case ADD_TO_CART:
      let addedItem = state.products.find(
        product => product._id === action.payload
      );

      let existed_item = state.addedItems.find(
        product => action.payload === product._id
      );
      if (existed_item) {
        // addedItem?
        existed_item.quantity += 1;

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

    // Remove item from cart
    case REMOVE_FROM_CART:
      let itemToRemove = state.addedItems.find(
        item => action.payload === item._id
      );
      let new_items = state.addedItems.filter(
        item => action.payload !== item._id
      );

      // Calculating the total
      let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
      console.log(itemToRemove);
      return {
        ...state,
        addedItems: new_items,
        total: newTotal
      };

    // Add to existing item
    case ADD_ITEM_QUANTITY:
      let toAddItem = state.addedItems.find(
        product => product._id === action.payload
      );
      toAddItem.quantity += 1;
      let newTotalFromAdding = state.total + toAddItem.price;
      return {
        ...state,
        total: newTotalFromAdding
      };

    // Subtract from existing item
    case SUBTRACT_ITEM_QUANTITY:
      let toSubtractItem = state.addedItems.find(
        product => product._id === action.payload
      );
      //if the quantity == 0 then it should be removed
      if (toSubtractItem.quantity === 1) {
        let new_items = state.addedItems.filter(
          item => item._id !== action.payload
        );
        let newTotal = state.total - toSubtractItem.price;
        return {
          ...state,
          addedItems: new_items,
          total: newTotal
        };
      } else {
        toSubtractItem.quantity -= 1;
        let newTotal = state.total - toSubtractItem.price;
        return {
          ...state,
          total: newTotal
        };
      }

    default:
      return state;
  }
}
