import ACCOUNT_TYPES from '../../action-types/account';
import request from '../../agent/request';

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
  return request
    .post(`account/reject-offer${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => dispatch(fetchRejectOfferSuccess(response.data)))
    .catch((err) => dispatch(fetchRejectOfferError(err)));
};
