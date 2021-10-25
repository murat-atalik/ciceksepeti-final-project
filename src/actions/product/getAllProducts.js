import PRODUCT_TYPES from 'action-types/product';
import request from 'agent/request';

export const fetchAllProductsStart = () => ({
  type: PRODUCT_TYPES.FETCH_ALLPRODUCTS_START,
});

export const fetchAllProductsSuccess = (post) => ({
  type: PRODUCT_TYPES.FETCH_ALLPRODUCTS_SUCCESS,
  payload: post,
});

export const fetchAllProductsError = (err) => ({
  type: PRODUCT_TYPES.FETCH_ALLPRODUCTS_ERROR,
  payload: err,
});

export const fetchAllProductsInfo = () => async (dispatch) => {
  dispatch(fetchAllProductsStart());
  return request
    .get('/product/all')
    .then((response) => dispatch(fetchAllProductsSuccess(response.data)))
    .catch((err) => dispatch(fetchAllProductsError(err)));
};
