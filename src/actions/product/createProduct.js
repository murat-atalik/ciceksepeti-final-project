import PRODUCT_TYPES from '../../action-types/product';
import request from '../../agent/request';

export const fetchCreateProductStart = () => ({
  type: PRODUCT_TYPES.FETCH_CREATEPRODUCT_START,
});
export const fetchCreateProductSuccess = () => ({
  type: PRODUCT_TYPES.FETCH_CREATEPRODUCT_SUCCESS,
});
export const fetchCreateProductError = (err) => ({
  type: PRODUCT_TYPES.FETCH_CREATEPRODUCT_ERROR,
  payload: err,
});

export const fetchCreateProductInfo = (value) => async (dispatch) => {
  dispatch(fetchCreateProductStart());
  return request
    .post('produc/create', value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => dispatch(fetchCreateProductSuccess(response.data)))
    .catch((err) => dispatch(fetchCreateProductError(err)));
};
