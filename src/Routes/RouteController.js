import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

const RouteController = (props) => {
  const { routeType, ...routeProps } = props;
  return (
    <>
      {routeType === 'public' && <Route {...routeProps} />}
      {routeType === 'protected' && <ProtectedRoute {...routeProps} />}
      {routeType === 'auth' && <AuthRoute {...routeProps} />}
    </>
  );
};
RouteController.propTypes = {
  routeType: PropTypes.string.isRequired,
};

export default RouteController;
