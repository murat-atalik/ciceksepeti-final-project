import AUTH_TYPES from '../../action-types/authorization';
import request from '../../agent/request';

export const fetchSignupStart = () => ({
  type: AUTH_TYPES.FETCH_SIGNUP_START,
});
export const fetchSignupSuccess = (post) => ({
  type: AUTH_TYPES.FETCH_SIGNUP_SUCCESS,
  payload: post,
});
export const fetchSignupError = (err) => ({
  type: AUTH_TYPES.FETCH_SIGNUP_ERROR,
  payload: err,
});

export const fetchSignupInfo = (user) => async (dispatch) => {
  dispatch(fetchSignupStart());
  return request
    .post(`/authorization/signup/${user}`)
    .then((response) => dispatch(fetchSignupSuccess(response.data)))
    .catch(() => dispatch(fetchSignupError()));
};
