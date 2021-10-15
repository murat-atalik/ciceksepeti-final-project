import ACCOUNT_TYPES from '../../action-types/account';

const initialState = {
  isFetching: false,
  isError: '',
};

const cancelOffer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_TYPES.FETCH_CANCELOFFER_START:
      return { ...state, isFetching: true, isError: '' };
    case ACCOUNT_TYPES.FETCH_CANCELOFFER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: '',
      };
    case ACCOUNT_TYPES.FETCH_CANCELOFFER_ERROR:
      return { ...state, isError: action.payload, isFetching: false };

    default:
      return state;
  }
};
export default cancelOffer;
