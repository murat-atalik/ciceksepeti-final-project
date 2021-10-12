import { fetchAllBrandsInfo } from 'actions/brand/getAllBrands';
import { fetchAllCategoriesInfo } from 'actions/category/getAllCategories';
import { fetchAllColorsInfo } from 'actions/color/allColors';
import { fetchAllStatusesInfo } from 'actions/status/allStatuses';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import RouterController from './Routes/RouteController';
import {
  authenticationRoutes,
  protectedRoutes,
  publicRoutes,
} from './Routes/routes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBrandsInfo());
    dispatch(fetchAllCategoriesInfo());
    dispatch(fetchAllColorsInfo());
    dispatch(fetchAllStatusesInfo());
  }, [dispatch]);
  const loggedIn = false;
  // eslint-disable-next-line no-debugger
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
    </Router>
  );
}

export default App;
