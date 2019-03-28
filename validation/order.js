const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrderInput(data) {
  let errors = {};

  data.customerFirstName = !isEmpty(data.customerFirstName)
    ? data.customerFirstName
    : '';
  data.customerLastName = !isEmpty(data.customerLastName)
    ? data.customerLastName
    : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.zip = !isEmpty(data.zip) ? data.zip : '';
  data.city = !isEmpty(data.city) ? data.city : '';

  if (!Validator.isLength(data.customerFirstName, { min: 3, max: 60 })) {
    errors.customerFirstName = 'First name must be between 3 and 60 characters';
  }

  if (Validator.isEmpty(data.customerFirstName)) {
    errors.customerFirstName = 'First name field is required';
  }

  if (!Validator.isLength(data.customerLastName, { min: 3, max: 60 })) {
    errors.customerLastName = 'Last name must be between 3 and 60 characters';
  }

  if (Validator.isEmpty(data.customerLastName)) {
    errors.customerLastName = 'Last name field is required';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }

  if (Validator.isEmpty(data.zip)) {
    errors.zip = 'Zip field is required';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'City field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
