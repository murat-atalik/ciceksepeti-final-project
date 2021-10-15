import ACCOUNT_TYPES from '../../action-types/account';
import request from '../../agent/request';

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
    .delete(`/account/cancel/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then(() => dispatch(fetchCancelOfferSuccess()))
    .catch((err) => dispatch(fetchCancelOfferError(err)));
};
