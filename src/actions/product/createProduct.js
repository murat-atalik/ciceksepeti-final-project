import PRODUCT_TYPES from 'action-types/product';
import request from 'agent/request';
import { toast } from 'react-toastify';

import { fetchAllProductsInfo } from './getAllProducts';

export const fetchCreateProductStart = () => ({
  type: PRODUCT_TYPES.FETCH_CREATEPRODUCT_START,
});

export const fetchCreateProductSuccess = (data) => ({
  type: PRODUCT_TYPES.FETCH_CREATEPRODUCT_SUCCESS,
  payload: data,
});

export const fetchCreateProductError = (err) => ({
  type: PRODUCT_TYPES.FETCH_CREATEPRODUCT_ERROR,
  payload: err,
});

export const redirectProduct = () => ({
  type: PRODUCT_TYPES.REDIRECT_PRODUCT,
});

export const fetchCreateProductInfo = (value) => async (dispatch) => {
  dispatch(fetchCreateProductStart());
  return request
    .post('product/create', value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => {
      dispatch(fetchCreateProductSuccess(response.data));
      toast.success('Ürün ekleme başarılı', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        closeButton: false,
      });
    })
    .catch((err) => {
      dispatch(fetchCreateProductError(err));
      toast.error('Kullanıcı sisteme giriş yapmalı', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        closeButton: false,
      });
    })
    .finally(() => dispatch(fetchAllProductsInfo()));
};
