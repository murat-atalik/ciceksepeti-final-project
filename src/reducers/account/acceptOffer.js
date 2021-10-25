import ACCOUNT_TYPES from 'action-types/account';

const initialState = {
  isFetching: false,
  isError: '',
};

const rejectOffer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_TYPES.FETCH_ACCEPTOFFER_START:
      return { ...state, isFetching: true, isError: '' };
    case ACCOUNT_TYPES.FETCH_ACCEPTOFFER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: '',
      };
    case ACCOUNT_TYPES.FETCH_ACCEPTOFFER_ERROR:
      return { ...state, isError: action.payload, isFetching: false };

    default:
      return state;
  }
};
export default rejectOffer;
