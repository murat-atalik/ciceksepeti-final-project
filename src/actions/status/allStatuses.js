import STATUS_TYPES from '../../action-types/status';
import request from '../../agent/request';

export const fetchAllStatusesStart = () => ({
  type: STATUS_TYPES.FETCH_ALLSTATUSES_START,
});
export const fetchAllStatusesSuccess = (post) => ({
  type: STATUS_TYPES.FETCH_ALLSTATUSES_SUCCESS,
  payload: post,
});
export const fetchAllStatusesError = (err) => ({
  type: STATUS_TYPES.FETCH_ALLSTATUSES_ERROR,
  payload: err,
});

export const fetchAllStatusesInfo = () => async (dispatch) => {
  dispatch(fetchAllStatusesStart());
  return request
    .get('/detail/status/all')
    .then((response) => dispatch(fetchAllStatusesSuccess(response.data)))
    .catch(() => dispatch(fetchAllStatusesError()));
};
