import { toast } from 'react-toastify';

import PRODUCT_TYPES from '../../action-types/product';
import request from '../../agent/request';
import { fetchGivenOffersInfo } from '../account/givenOffers';

export const fetchOfferProductStart = () => ({
  type: PRODUCT_TYPES.FETCH_OFFERPRODUCT_START,
});

export const fetchOfferProductSuccess = () => ({
  type: PRODUCT_TYPES.FETCH_OFFERPRODUCT_SUCCESS,
});

export const fetchOfferProductError = (err) => ({
  type: PRODUCT_TYPES.FETCH_OFFERPRODUCT_ERROR,
  payload: err,
});

export const fetchOfferProductInfo = (id, value) => async (dispatch) => {
  dispatch(fetchOfferProductStart());
  return request
    .post(`/product/offer/${id}`, value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then(() => {
      dispatch(fetchOfferProductSuccess());
      toast.success('Teklif başarılı', {
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
      dispatch(fetchOfferProductError(err));
      if (err.response.status === 401) {
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
      } else {
        toast.error('Ürün bulunamadı', {
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
      }
    })
    .finally(() => dispatch(fetchGivenOffersInfo()));
};
