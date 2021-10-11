import COLOR_TYPES from '../../action-types/color';

const initialState = {
  postData: [],
  isFetching: false,
  isError: '',
};

const allColors = (state = initialState, action) => {
  switch (action.type) {
    case COLOR_TYPES.FETCH_ALLCOLORS_START:
      return { ...state, isFetching: true, postData: {}, isError: '' };
    case COLOR_TYPES.FETCH_ALLCOLORS_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        isFetching: false,
        isError: '',
      };
    case COLOR_TYPES.FETCH_ALLCOLORS_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default allColors;
