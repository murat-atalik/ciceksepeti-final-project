import { toast } from 'react-toastify';

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
    .post('/authorization/signin', user)
    .then((response) => {
      dispatch(fetchSigninSuccess(response.data));
      toast.success('Girş başarılı.', {
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
      localStorage.setItem('access-token', response.data.access_token);
      localStorage.setItem('email', user.email);
    })
    .catch((err) => {
      dispatch(fetchSigninError(err));
      toast.error('Emailiniz veya şifreniz hatalı.', {
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
    });
};
