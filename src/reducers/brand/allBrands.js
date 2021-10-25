import BRAND_TYPES from 'action-types/brand';

const initialState = {
  allBrands: [],
  isFetching: false,
  isError: '',
};

const allBrands = (state = initialState, action) => {
  switch (action.type) {
    case BRAND_TYPES.FETCH_ALLBRANDS_START:
      return { ...state, isFetching: true, allBrands: {}, isError: '' };
    case BRAND_TYPES.FETCH_ALLBRANDS_SUCCESS:
      return {
        ...state,
        allBrands: action.payload,
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
