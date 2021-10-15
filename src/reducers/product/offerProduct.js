import PRODUCT_TYPES from '../../action-types/product';

const initialState = {
  isFetching: false,
  isError: '',
};

const offerProduct = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_TYPES.FETCH_OFFERPRODUCT_START:
      return { ...state, isFetching: true, isError: '' };
    case PRODUCT_TYPES.FETCH_OFFERPRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: '',
      };
    case PRODUCT_TYPES.FETCH_OFFERPRODUCT_ERROR:
      return { ...state, isError: action.payload, isFetching: false };

    default:
      return state;
  }
};
export default offerProduct;
