import { SEARCH } from './types';

// Search
export const searchProduct = value => {
  return {
    type: SEARCH,
    value
  };
};
