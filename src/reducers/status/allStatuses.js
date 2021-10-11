import STATUS_TYPES from '../../action-types/status';

const initialState = {
  postData: [],
  isFetching: false,
  isError: '',
};

const allStatuses = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_TYPES.FETCH_ALLSTATUSES_START:
      return { ...state, isFetching: true, postData: {}, isError: '' };
    case STATUS_TYPES.FETCH_ALLSTATUSES_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        isFetching: false,
        isError: '',
      };
    case STATUS_TYPES.FETCH_ALLSTATUSES_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default allStatuses;
