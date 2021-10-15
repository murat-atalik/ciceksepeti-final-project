import ACCOUNT_TYPES from '../../action-types/account';
import request from '../../agent/request';

export const fetchGivenOffersStart = () => ({
  type: ACCOUNT_TYPES.FETCH_GIVENOFFERS_START,
});
export const fetchGivenOffersSuccess = (post) => ({
  type: ACCOUNT_TYPES.FETCH_GIVENOFFERS_SUCCESS,
  payload: post,
});
export const fetchGivenOffersError = (err) => ({
  type: ACCOUNT_TYPES.FETCH_GIVENOFFERS_ERROR,
  payload: err,
});

export const fetchGivenOffersInfo = () => async (dispatch) => {
  dispatch(fetchGivenOffersStart());
  return request
    .get('/account/given-offers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => dispatch(fetchGivenOffersSuccess(response.data)))
    .catch((err) => dispatch(fetchGivenOffersError(err)));
};
