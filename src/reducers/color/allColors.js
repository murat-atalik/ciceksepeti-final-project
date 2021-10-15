import COLOR_TYPES from '../../action-types/color';

const initialState = {
  allColors: [],
  isFetching: false,
  isError: '',
};

const color = (state = initialState, action) => {
  switch (action.type) {
    case COLOR_TYPES.FETCH_ALLCOLORS_START:
      return { ...state, isFetching: true, allColors: [], isError: '' };
    case COLOR_TYPES.FETCH_ALLCOLORS_SUCCESS:
      return {
        ...state,
        allColors: action.payload,
        isFetching: false,
        isError: '',
      };
    case COLOR_TYPES.FETCH_ALLCOLORS_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default color;
