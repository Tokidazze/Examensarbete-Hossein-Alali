import {
  ADD_TO_CART,
  ADD_ITEM_QUANTITY,
  SUBTRACT_ITEM_QUANTITY,
  REMOVE_FROM_CART
} from './types';

// Add to cart
export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    payload: id
  };
};

// Add item quantity
export const addQuantity = id => {
  return {
    type: ADD_ITEM_QUANTITY,
    payload: id
  };
};

// Subtract item quantity
export const subtractQuantity = id => {
  return {
    type: SUBTRACT_ITEM_QUANTITY,
    payload: id
  };
};

// Remove item from cart
export const removeItem = id => {
  return {
    type: REMOVE_FROM_CART,
    payload: id
  };
};
