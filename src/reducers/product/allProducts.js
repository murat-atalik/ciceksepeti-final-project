import PRODUCT_TYPES from 'action-types/product';

const initialState = {
  products: [],
  isFetching: false,
  isError: '',
};

const allProducts = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_TYPES.FETCH_ALLPRODUCTS_START:
      return { ...state, isFetching: true, products: [], isError: '' };
    case PRODUCT_TYPES.FETCH_ALLPRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isFetching: false,
        isError: '',
      };
    case PRODUCT_TYPES.FETCH_ALLPRODUCTS_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default allProducts;
