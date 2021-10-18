import { toast } from 'react-toastify';

import ACCOUNT_TYPES from '../../action-types/account';
import request from '../../agent/request';
import { fetchGivenOffersInfo } from './givenOffers';

export const fetchCancelOfferStart = () => ({
  type: ACCOUNT_TYPES.FETCH_CANCELOFFER_START,
});
export const fetchCancelOfferSuccess = () => ({
  type: ACCOUNT_TYPES.FETCH_CANCELOFFER_SUCCESS,
});
export const fetchCancelOfferError = (err) => ({
  type: ACCOUNT_TYPES.FETCH_CANCELOFFER_ERROR,
  payload: err,
});

export const fetchCancelOfferInfo = (id) => async (dispatch) => {
  dispatch(fetchCancelOfferStart());
  return request
    .delete(`/account/cancel-offer/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then(() => {
      dispatch(fetchCancelOfferSuccess());
      toast.success('Teklif geri çekildi', {
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
      dispatch(fetchCancelOfferError(err));
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
    .finally(() => dispatch(fetchGivenOffersInfo()));
};
