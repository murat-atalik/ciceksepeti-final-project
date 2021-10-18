import axios from 'axios';
import { toast } from 'react-toastify';

import PRODUCT_TYPES from '../../action-types/product';
import { fetchGetProductInfo } from './getProduct';

export const fetchPurchaseProductStart = () => ({
  type: PRODUCT_TYPES.FETCH_PURCHASEPRODUCT_START,
});
export const fetchPurchaseProductSuccess = () => ({
  type: PRODUCT_TYPES.FETCH_PURCHASEPRODUCT_SUCCESS,
});
export const fetchPurchaseProductError = (err) => ({
  type: PRODUCT_TYPES.FETCH_PURCHASEPRODUCT_ERROR,
  payload: err,
});

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access-token')}`,
  },
};

export const fetchPurchaseProductInfo = (id) => async (dispatch) => {
  dispatch(fetchPurchaseProductStart());
  return axios
    .put(
      `https://bootcampapi.techcs.io/api/fe/v1/product/purchase/${id}`,
      null,
      config
    )
    .then(() => {
      dispatch(fetchPurchaseProductSuccess());
      toast.success('Satın Alındı', {
        position: 'top-right',
        autoClose: 5000,
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
      dispatch(fetchPurchaseProductError(err));
      if (err.response.status === 401) {
        toast.error('Kullanıcı sisteme giriş yapmalı', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          closeButton: false,
        });
      } else {
        toast.error('Ürün bulunamadı', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          closeButton: false,
        });
      }
    })
    .then(() => dispatch(fetchGetProductInfo(id)));
};
