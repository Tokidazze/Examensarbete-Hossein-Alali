import React from 'react';

const CheckboxField = ({
  type = 'checkbox',
  name,
  value,
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
    value={value}
  />
);

export default CheckboxField;
