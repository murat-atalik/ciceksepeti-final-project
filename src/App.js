import 'react-toastify/dist/ReactToastify.css';
import './style/index.scss';

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import RouterController from './Routes/RouteController';
import {
  authenticationRoutes,
  protectedRoutes,
  publicRoutes,
} from './Routes/routes';

function App() {
  let loggedIn = false;
  if (localStorage.getItem('email')) {
    loggedIn = true;
  }
  return (
    <Router>
      <Switch>
        {protectedRoutes.map(({ path, component, ...rest }) => (
          <RouterController
            key={component}
            routeType="protected"
            component={component}
            isAuth={loggedIn}
            path={path}
            rest={rest}
          />
        ))}
        {authenticationRoutes.map(({ path, component, ...rest }) => (
          <RouterController
            key={component}
            routeType="auth"
            component={component}
            isAuth={loggedIn}
            path={path}
            rest={rest}
          />
        ))}
        {publicRoutes.map(({ path, component, ...rest }) => (
          <RouterController
            key={component}
            routeType="public"
            component={component}
            isAuth={loggedIn}
            path={path}
            rest={rest}
          />
        ))}
      </Switch>
      <ToastContainer
        className="react-toastfiy"
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
