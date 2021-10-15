import STATUS_TYPES from '../../action-types/status';
import request from '../../agent/request';

export const fetchAllStatusStart = () => ({
  type: STATUS_TYPES.FETCH_ALLSTATUS_START,
});
export const fetchAllStatusSuccess = (post) => ({
  type: STATUS_TYPES.FETCH_ALLSTATUS_SUCCESS,
  payload: post,
});
export const fetchAllStatusError = (err) => ({
  type: STATUS_TYPES.FETCH_ALLSTATUS_ERROR,
  payload: err,
});

export const fetchAllStatusesInfo = () => async (dispatch) => {
  dispatch(fetchAllStatusStart());
  return request
    .get('/detail/status/all')
    .then((response) => dispatch(fetchAllStatusSuccess(response.data)))
    .catch(() => dispatch(fetchAllStatusError()));
};
