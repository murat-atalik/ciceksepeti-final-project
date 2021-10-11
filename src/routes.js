import Account from './pages/account/Account';
import Product from './pages/product/Product';
import Products from './pages/products/Products';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import UploadProduct from './pages/upload-product/UploadProduct';

export const protectedRoutes = [
  { path: '/account', component: Account, exact: false },
  { path: '/uploadproduct', component: UploadProduct, exact: false },
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
