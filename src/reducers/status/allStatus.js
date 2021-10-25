import STATUS_TYPES from 'action-types/status';

const initialState = {
  allStatus: [],
  isFetching: false,
  isError: '',
};

const allStatus = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_TYPES.FETCH_ALLSTATUS_START:
      return { ...state, isFetching: true, allStatus: [], isError: '' };
    case STATUS_TYPES.FETCH_ALLSTATUS_SUCCESS:
      return {
        ...state,
        allStatus: action.payload,
        isFetching: false,
        isError: '',
      };
    case STATUS_TYPES.FETCH_ALLSTATUS_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default allStatus;
