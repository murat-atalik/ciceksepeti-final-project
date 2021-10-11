import BRAND_TYPES from '../../action-types/brand';
import request from '../../agent/request';

export const fetchAllBrandsStart = () => ({
  type: BRAND_TYPES.FETCH_ALLBRANDS_START,
});
export const fetchAllBrandsSuccess = (post) => ({
  type: BRAND_TYPES.FETCH_ALLBRANDS_SUCCESS,
  payload: post,
});
export const fetchAllBrandsError = (err) => ({
  type: BRAND_TYPES.FETCH_ALLBRANDS_ERROR,
  payload: err,
});

export const fetchAllBrandsInfo = () => async (dispatch) => {
  dispatch(fetchAllBrandsStart());
  return request
    .get('/detail/brand/all')
    .then((response) => dispatch(fetchAllBrandsSuccess(response.data)))
    .catch(() => dispatch(fetchAllBrandsError()));
};
