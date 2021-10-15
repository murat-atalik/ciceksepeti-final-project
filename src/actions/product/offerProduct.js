import PRODUCT_TYPES from '../../action-types/product';
import request from '../../agent/request';

export const fetchOfferProductStart = () => ({
  type: PRODUCT_TYPES.FETCH_OFFERPRODUCT_START,
});
export const fetchOfferProductSuccess = () => ({
  type: PRODUCT_TYPES.FETCH_OFFERPRODUCT_SUCCESS,
});
export const fetchOfferProductError = (err) => ({
  type: PRODUCT_TYPES.FETCH_OFFERPRODUCT_ERROR,
  payload: err,
});

export const fetchOfferProductInfo = (id, value) => async (dispatch) => {
  dispatch(fetchOfferProductStart());
  return request
    .post(`/product/offer/${id}`, value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then(() => dispatch(fetchOfferProductSuccess()))
    .catch((err) => dispatch(fetchOfferProductError(err)));
};
