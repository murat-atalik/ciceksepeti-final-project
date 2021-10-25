import COLOR_TYPES from 'action-types/color';
import request from 'agent/request';

export const fetchAllColorsStart = () => ({
  type: COLOR_TYPES.FETCH_ALLCOLORS_START,
});

export const fetchAllColorsSuccess = (post) => ({
  type: COLOR_TYPES.FETCH_ALLCOLORS_SUCCESS,
  payload: post,
});

export const fetchAllColorsError = (err) => ({
  type: COLOR_TYPES.FETCH_ALLCOLORS_ERROR,
  payload: err,
});

export const fetchAllColorsInfo = () => async (dispatch) => {
  dispatch(fetchAllColorsStart());
  return request
    .get('/detail/color/all')
    .then((response) => dispatch(fetchAllColorsSuccess(response.data)))
    .catch((err) => dispatch(fetchAllColorsError(err)));
};
