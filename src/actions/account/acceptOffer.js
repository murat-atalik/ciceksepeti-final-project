import ACCOUNT_TYPES from '../../action-types/account';
import request from '../../agent/request';

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
  return request
    .put(`/account/accept-offer/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then(() => dispatch(fetchAcceptOfferSuccess()))
    .catch((err) => dispatch(fetchAcceptOfferError(err)));
};
