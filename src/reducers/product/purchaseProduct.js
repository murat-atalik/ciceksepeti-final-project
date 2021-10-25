import PRODUCT_TYPES from 'action-types/product';

const initialState = {
  isFetching: false,
  isError: '',
};

const purchaseProduct = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_TYPES.FETCH_PURCHASEPRODUCT_START:
      return { ...state, isFetching: true, isError: '' };
    case PRODUCT_TYPES.FETCH_PURCHASEPRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: '',
      };
    case PRODUCT_TYPES.FETCH_PURCHASEPRODUCT_ERROR:
      return { ...state, isError: action.payload, isFetching: false };

    default:
      return state;
  }
};
export default purchaseProduct;
