import BRAND_TYPES from '../../action-types/brand';

const initialState = {
  postData: [],
  isFetching: false,
  isError: '',
};

const allBrands = (state = initialState, action) => {
  switch (action.type) {
    case BRAND_TYPES.FETCH_ALLBRANDS_START:
      return { ...state, isFetching: true, postData: {}, isError: '' };
    case BRAND_TYPES.FETCH_ALLBRANDS_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        isFetching: false,
        isError: '',
      };
    case BRAND_TYPES.FETCH_ALLBRANDS_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default allBrands;
