import ACCOUNT_TYPES from '../../action-types/account';

const initialState = {
  data: [],
  isFetching: false,
  isError: '',
  isDataReceived: false,
};

const givenOffers = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_TYPES.FETCH_GIVENOFFERS_START:
      return {
        ...state,
        isFetching: true,
        data: [],
        isError: '',
        isDataReceived: false,
      };
    case ACCOUNT_TYPES.FETCH_GIVENOFFERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        isError: '',
        isDataReceived: true,
      };
    case ACCOUNT_TYPES.FETCH_GIVENOFFERS_ERROR:
      return {
        ...state,
        isError: action.payload,
        isFetching: false,
        isDataReceived: true,
      };

    default:
      return state;
  }
};
export default givenOffers;
