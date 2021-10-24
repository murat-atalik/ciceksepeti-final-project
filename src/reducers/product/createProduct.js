import PRODUCT_TYPES from '../../action-types/product';

const initialState = {
  product: {},
  isFetching: false,
  isError: '',
  isProductCreated: false,
};

const createProduct = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_TYPES.FETCH_CREATEPRODUCT_START:
      return {
        ...state,
        isFetching: true,
        isError: '',
        product: {},
        isProductCreated: false,
      };
    case PRODUCT_TYPES.FETCH_CREATEPRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isFetching: false,
        isError: '',
        isProductCreated: true,
      };
    case PRODUCT_TYPES.FETCH_CREATEPRODUCT_ERROR:
      return {
        ...state,
        isError: action.payload,
        isFetching: false,
        product: {},
        isProductCreated: false,
      };
    case PRODUCT_TYPES.REDIRECT_PRODUCT:
      return {
        ...state,
        isError: action.payload,
        isFetching: false,
        product: {},
        isProductCreated: false,
      };
    default:
      return state;
  }
};
export default createProduct;
