import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { dataTestid, value } = props;
  return (
    <button type="button" data-testid={ dataTestid }>
      { value }
    </button>
  );
};

Button.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;
