import FILE_TYPES from '../../action-types/file';

const initialState = {
  file: {},
  isFetching: false,
  isError: '',
};

const allStatus = (state = initialState, action) => {
  switch (action.type) {
    case FILE_TYPES.FETCH_UPLOADIMAGE_START:
      return { ...state, isFetching: true, file: {}, isError: '' };
    case FILE_TYPES.FETCH_UPLOADIMAGE_SUCCESS:
      return {
        ...state,
        file: action.payload,
        isFetching: false,
        isError: '',
      };
    case FILE_TYPES.FETCH_UPLOADIMAGE_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default allStatus;
