import { lazy } from 'react';

const Products = lazy(() => import('pages/Products/Products'));
const Product = lazy(() => import('pages/Product/Product'));
const AddProduct = lazy(() => import('pages/AddProduct/AddProduct'));
const Account = lazy(() => import('pages/Account/Account'));
const Signup = lazy(() => import('pages/Signup/Signup'));
const Signin = lazy(() => import('pages/Signin/Signin'));
export const protectedRoutes = [
  { path: '/account', component: Account, exact: false },
  { path: '/add-product', component: AddProduct, exact: false },
];
export const publicRoutes = [
  { path: '/product/:id', component: Product, exact: false },
  { path: '/', component: Products, exact: true },
];
export const authenticationRoutes = [
  { path: '/signin', component: Signin, exact: false },
  { path: '/signup', component: Signup, exact: false },
];
