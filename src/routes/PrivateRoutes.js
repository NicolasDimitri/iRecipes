import { PropTypes } from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../helpers/secutiry';

export default function PrivateRoutes({ component: Component, ...rest }) {
  return (<Route
    { ... rest }
    render={ (props) => (
      !Auth() ? (
        <Component { ... props } />
      ) : (
        <Redirect to={ { pathname: '/' } } />
      )
    ) }
  />);
}

PrivateRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};
