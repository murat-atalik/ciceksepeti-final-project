import axios from 'axios';
import { toast } from 'react-toastify';

import ACCOUNT_TYPES from 'action-types/account';
import { fetchGivenOffersInfo } from './givenOffers';
import { fetchRecievedOffersInfo } from './receivedOffers';

export const fetchRejectOfferStart = () => ({
  type: ACCOUNT_TYPES.FETCH_REJECTOFFER_START,
});

export const fetchRejectOfferSuccess = (post) => ({
  type: ACCOUNT_TYPES.FETCH_REJECTOFFER_SUCCESS,
  payload: post,
});

export const fetchRejectOfferError = (err) => ({
  type: ACCOUNT_TYPES.FETCH_REJECTOFFER_ERROR,
  payload: err,
});

export const fetchRejectOfferInfo = (id) => async (dispatch) => {
  dispatch(fetchRejectOfferStart());
  return axios
    .post(
      `https://bootcampapi.techcs.io/api/fe/v1/account/reject-offer/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      }
    )
    .then((response) => {
      dispatch(fetchRejectOfferSuccess(response.data));
      toast.success('Teklif Reddedildi', {
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
      dispatch(fetchRejectOfferError(err));
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
    .finally(() => {
      dispatch(fetchGivenOffersInfo());
      dispatch(fetchRecievedOffersInfo());
    });
};
