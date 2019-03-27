const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserEdit(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = 'Name must be beetween 2 and 20 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
