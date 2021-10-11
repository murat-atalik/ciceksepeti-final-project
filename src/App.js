import './App.css';

import { fetchAllBrandsInfo } from 'actions/brand/getAllBrands';
import { fetchAllCategoriesInfo } from 'actions/category/getAllCategories';
import { fetchAllColorsInfo } from 'actions/color/allColors';
import { fetchAllStatusesInfo } from 'actions/status/allStatuses';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { authenticationRoutes, protectedRoutes, publicRoutes } from 'routes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBrandsInfo());
    dispatch(fetchAllCategoriesInfo());
    dispatch(fetchAllColorsInfo());
    dispatch(fetchAllStatusesInfo());
  }, [dispatch]);
  const loggedIn = true;
  // eslint-disable-next-line no-debugger
  return (
    <Router>
      <Switch>
        {loggedIn &&
          protectedRoutes.map(({ path, component, ...rest }) => (
            <Route key={path} component={component} path={path} {...rest} />
          ))}
        {!loggedIn &&
          authenticationRoutes.map(({ path, component, ...rest }) => (
            <Route key={path} component={component} path={path} {...rest} />
          ))}
        {publicRoutes.map(({ path, component, ...rest }) => (
          <Route key={path} component={component} path={path} {...rest} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
