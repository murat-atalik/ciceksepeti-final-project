import AUTH_TYPES from '../../action-types/authorization';
import request from '../../agent/request';

export const fetchSigninStart = () => ({
  type: AUTH_TYPES.FETCH_SIGNIN_START,
});
export const fetchSigninSuccess = (post) => ({
  type: AUTH_TYPES.FETCH_SIGNIN_SUCCESS,
  payload: post,
});
export const fetchSigninError = (err) => ({
  type: AUTH_TYPES.FETCH_SIGNIN_ERROR,
  payload: err,
});

export const fetchSigninInfo = (user) => async (dispatch) => {
  dispatch(fetchSigninStart());
  return request
    .post(`/authorization/signin/${user}`)
    .then((response) => dispatch(fetchSigninSuccess(response.data)))
    .catch(() => dispatch(fetchSigninError()));
};
