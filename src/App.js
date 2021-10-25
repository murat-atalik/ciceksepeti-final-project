import 'react-toastify/dist/ReactToastify.css';
import 'style/index.scss';

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import GeneralLoading from './components/Loading/GeneralLoading';
import RouterController from './Routes/RouteController';

const Products = lazy(() => import('./pages/Products/Products'));
const Product = lazy(() => import('./pages/Product/Product'));
const AddProduct = lazy(() => import('./pages/AddProduct/AddProduct'));
const Account = lazy(() => import('./pages/Account/Account'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Signin = lazy(() => import('./pages/Signin/Signin'));
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
          <RouterController
            routeType="protected"
            component={AddProduct}
            isAuth={loggedIn}
            path="/add-product"
            exact={false}
          />
          <RouterController
            routeType="protected"
            component={Account}
            isAuth={loggedIn}
            path="/account"
            exact={false}
          />
          <RouterController
            routeType="auth"
            component={Signup}
            isAuth={loggedIn}
            path="/signup"
            exact={false}
          />
          <RouterController
            routeType="auth"
            component={Signin}
            isAuth={loggedIn}
            path="/signin"
            exact={false}
          />
          <RouterController
            routeType="public"
            component={Product}
            isAuth={loggedIn}
            path="/product/:id"
            exact={false}
          />
          <RouterController
            routeType="public"
            component={Products}
            isAuth={loggedIn}
            path="/"
            exact
          />
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
