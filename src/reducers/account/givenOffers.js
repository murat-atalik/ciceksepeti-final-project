import ACCOUNT_TYPES from '../../action-types/account';

const initialState = {
  data: [],
  isFetching: false,
  isError: '',
};

const givenOffers = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_TYPES.FETCH_GIVENOFFERS_START:
      return { ...state, isFetching: true, data: [], isError: '' };
    case ACCOUNT_TYPES.FETCH_GIVENOFFERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        isError: '',
      };
    case ACCOUNT_TYPES.FETCH_GIVENOFFERS_ERROR:
      return { ...state, isError: action.payload, isFetching: false };

    default:
      return state;
  }
};
export default givenOffers;
