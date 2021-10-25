import PRODUCT_TYPES from 'action-types/product';

const initialState = {
  product: {},
  isFetching: false,
  isError: '',
};

const allProducts = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_TYPES.FETCH_GETPRODUCT_START:
      return { ...state, isFetching: true, product: {}, isError: '' };
    case PRODUCT_TYPES.FETCH_GETPRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isFetching: false,
        isError: '',
      };
    case PRODUCT_TYPES.FETCH_GETPRODUCT_ERROR:
      return { ...state, isError: action.payload, isFetching: false };

    default:
      return state;
  }
};
export default allProducts;
