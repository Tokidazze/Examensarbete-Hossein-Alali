const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.image = !isEmpty(data.image) ? data.image : '';
  data.category = !isEmpty(data.category) ? data.category : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = 'Image is required';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
