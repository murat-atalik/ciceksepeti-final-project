import FILE_TYPES from '../../action-types/file';

const initialState = {
  file: '',
  progress: 0,
  isFetching: false,
  isError: '',
};

const allStatus = (state = initialState, action) => {
  switch (action.type) {
    case FILE_TYPES.FETCH_UPLOADIMAGE_START:
      return { ...state, isFetching: true, file: '', isError: '', progress: 0 };
    case FILE_TYPES.FETCH_UPLOADIMAGE_SUCCESS:
      return {
        ...state,
        file: action.payload,
        progress: 0,
        isFetching: false,
        isError: '',
      };
    case FILE_TYPES.FETCH_UPLOADIMAGE_PERCENT:
      return {
        ...state,
        file: '',
        progress: action.payload,
        isFetching: true,
        isError: '',
      };
    case FILE_TYPES.FETCH_UPLOADIMAGE_ERROR:
      return {
        ...state,
        isError: action.payload,
        isFetching: false,
        progress: 0,
      };
    case FILE_TYPES.REMOVE_IMAGE:
      return {
        ...state,
        file: '',
        isError: '',
        isFetching: false,
        progress: 0,
      };
    default:
      return state;
  }
};
export default allStatus;
