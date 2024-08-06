import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DateInput = ({
  className = '',
  placeholder = 'Select a date',
  title = "",
  name = '',
  size = globalInputVariants.size.default,
  rounded = globalInputVariants.rounded.default,
  block = false,
  onChange = () => {},
  value,
}) => {
  const handleDateChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="date"
      className={`border rounded p-2 ${className}`}
      placeholder={placeholder}
      onChange={handleDateChange}
      name={name}
      value={value}
    />
  );
};

DateInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default DateInput;
