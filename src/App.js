import 'react-toastify/dist/ReactToastify.css';
import 'style/index.scss';

import React, { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import GeneralLoading from './components/Loading/GeneralLoading';
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
    console.log(`!signup.isSignedIn`, !signup.isSignedIn);
    console.log(`!signup.isSignedIn`, !signup.isSignedIn);
    console.log(`locasl`, localStorage.getItem('isSignedin'));
    if (
      localStorage.getItem('isSignedin') !== 'true' &&
      !signin.isSignedIn &&
      !signup.isSignedIn
    ) {
      setLoggedIn(false);
    }
  }, [signin.isSignedIn, signup.isSignedIn]);
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
      <Suspense fallback={<GeneralLoading />}>
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
      </Suspense>
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
