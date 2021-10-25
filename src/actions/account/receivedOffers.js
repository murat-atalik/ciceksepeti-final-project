import ACCOUNT_TYPES from 'action-types/account';
import request from 'agent/request';

export const fetchRecievedOffersStart = () => ({
  type: ACCOUNT_TYPES.FETCH_RECEIVEDOFFERS_START,
});

export const fetchRecievedOffersSuccess = (post) => ({
  type: ACCOUNT_TYPES.FETCH_RECEIVEDOFFERS_SUCCESS,
  payload: post,
});

export const fetchRecievedOffersError = (err) => ({
  type: ACCOUNT_TYPES.FETCH_RECEIVEDOFFERS_ERROR,
  payload: err,
});

export const fetchRecievedOffersInfo = () => async (dispatch) => {
  dispatch(fetchRecievedOffersStart());
  return request
    .get('/account/received-offers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => dispatch(fetchRecievedOffersSuccess(response.data)))
    .catch((err) => dispatch(fetchRecievedOffersError(err)));
};
