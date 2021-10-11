import { combineReducers } from 'redux';

import SigninReducer from './authorization/signin';
import SignupReducer from './authorization/signup';
import AllBrandsReducer from './brand/allBrands';
import AllCategoriesReducer from './category/allCategories';
import AllColorsReducer from './color/allColors';
import AllStatusesReducer from './status/allStatuses';

export default combineReducers({
  signin: SigninReducer,
  signup: SignupReducer,
  allCategories: AllCategoriesReducer,
  allBrands: AllBrandsReducer,
  allColor: AllColorsReducer,
  allStatuses: AllStatusesReducer,
});
