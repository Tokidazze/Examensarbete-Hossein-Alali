import React from 'react';

const CheckboxField = ({
  type = 'checkbox',
  name,
  checked = false,
  onChange,
  className = 'form-check-input'
}) => (
  <input
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
    className={className}
  />
);

export default CheckboxField;
