import PRODUCT_TYPES from '../../action-types/product';
import request from '../../agent/request';

export const fetchPurchaseProductStart = () => ({
  type: PRODUCT_TYPES.FETCH_PURCHASEPRODUCT_START,
});
export const fetchPurchaseProductSuccess = () => ({
  type: PRODUCT_TYPES.FETCH_PURCHASEPRODUCT_SUCCESS,
});
export const fetchPurchaseProductError = (err) => ({
  type: PRODUCT_TYPES.FETCH_PURCHASEPRODUCT_ERROR,
  payload: err,
});

export const fetchPurchaseProductInfo = (id) => async (dispatch) => {
  dispatch(fetchPurchaseProductStart());
  return request
    .put(`/product/purchase/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then(() => dispatch(fetchPurchaseProductSuccess()))
    .catch((err) => dispatch(fetchPurchaseProductError(err)));
};
