import PRODUCT_TYPES from '../../action-types/product';
import request from '../../agent/request';

export const fetchGetProductStart = () => ({
  type: PRODUCT_TYPES.FETCH_GETPRODUCT_START,
});
export const fetchGetProductSuccess = (post) => ({
  type: PRODUCT_TYPES.FETCH_GETPRODUCT_SUCCESS,
  payload: post,
});
export const fetchGetProductError = (err) => ({
  type: PRODUCT_TYPES.FETCH_GETPRODUCT_ERROR,
  payload: err,
});

export const fetchGetProductInfo = (id) => async (dispatch) => {
  dispatch(fetchGetProductStart());
  return request
    .get(`/product/${id}`)
    .then((response) => dispatch(fetchGetProductSuccess(response.data)))
    .catch((err) => dispatch(fetchGetProductError(err)));
};
