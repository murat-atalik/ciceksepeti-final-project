import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(routerProps) =>
      isAuth ? (
        <Component {...routerProps} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
    }
  />
);

export default ProtectedRoute;
