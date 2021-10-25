import ACCOUNT_TYPES from 'action-types/account';
import axios from 'axios';
import { toast } from 'react-toastify';

import { fetchGivenOffersInfo } from './givenOffers';
import { fetchRecievedOffersInfo } from './receivedOffers';

export const fetchAcceptOfferStart = () => ({
  type: ACCOUNT_TYPES.FETCH_ACCEPTOFFER_START,
});

export const fetchAcceptOfferSuccess = () => ({
  type: ACCOUNT_TYPES.FETCH_ACCEPTOFFER_SUCCESS,
});

export const fetchAcceptOfferError = (err) => ({
  type: ACCOUNT_TYPES.FETCH_ACCEPTOFFER_ERROR,
  payload: err,
});

export const fetchAcceptOfferInfo = (id) => async (dispatch) => {
  dispatch(fetchAcceptOfferStart());
  return axios
    .put(
      `https://bootcampapi.techcs.io/api/fe/v1/account/accept-offer/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      }
    )
    .then(() => {
      dispatch(fetchAcceptOfferSuccess());
      toast.success('Teklif Onaylandı', {
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
      dispatch(fetchAcceptOfferError(err));
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
