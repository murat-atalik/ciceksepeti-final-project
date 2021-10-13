import Account from '../pages/Account/Account';
import AddProduct from '../pages/AddProduct/AddProduct';
import Product from '../pages/Product/Product';
import Products from '../pages/Products/Products';
import Signin from '../pages/Signin/Signin';
import Signup from '../pages/Signup/Signup';

export const protectedRoutes = [
  { path: '/account', component: Account, exact: false },
  { path: '/add-product', component: AddProduct, exact: false },
];
export const publicRoutes = [
  { path: '/products', component: Products, exact: false },
  { path: '/product/:id', component: Product, exact: false },
  { path: '/', component: Products, exact: true },
];
export const authenticationRoutes = [
  { path: '/signin', component: Signin, exact: false },
  { path: '/signup', component: Signup, exact: false },
];
