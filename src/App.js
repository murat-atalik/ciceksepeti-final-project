import 'react-toastify/dist/ReactToastify.css';
import './style/index.scss';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import RouterController from './Routes/RouteController';
import {
  authenticationRoutes,
  protectedRoutes,
  publicRoutes,
} from './Routes/routes';

function App() {
  const signin = useSelector((state) => state.signin);
  const signup = useSelector((state) => state.signup);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('isSignedin') === 'true'
  );
  useEffect(() => {
    if (
      localStorage.getItem('isSignedin') === 'true' ||
      signin.isSignedIn ||
      signup.isSignedIn
    ) {
      setLoggedIn(true);
    }
  }, [signin.isSignedIn, signup.isSignedIn]);

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
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
