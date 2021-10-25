import AUTH_TYPES from 'action-types/authorization';
import request from 'agent/request';
import { toast } from 'react-toastify';

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

export const signupLogout = () => ({
  type: AUTH_TYPES.SIGNUP_LOG_OUT,
});

export const fetchSignupInfo = (user) => async (dispatch) => {
  dispatch(fetchSignupStart());
  return request
    .post('/authorization/signup', user)
    .then((response) => {
      dispatch(fetchSignupSuccess(response.data));
      toast.success('Girş başarılı.', {
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
      localStorage.setItem('access-token', response.data.access_token);
      localStorage.setItem('email', user.email);
      localStorage.setItem('isSignedin', true);
    })
    .catch((err) => {
      dispatch(fetchSignupError(err));
      toast.error('Email adresi kullanımda.', {
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
    });
};
