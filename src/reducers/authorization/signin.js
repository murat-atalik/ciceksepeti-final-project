import AUTH_TYPES from '../../action-types/authorization';

const initialState = {
  postData: {},
  isFetching: false,
  isError: '',
};

const signin = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.FETCH_SIGNIN_START:
      return { ...state, isFetching: true, postData: {}, isError: '' };
    case AUTH_TYPES.FETCH_SIGNIN_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        isFetching: false,
        isError: '',
      };
    case AUTH_TYPES.FETCH_SIGNIN_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default signin;
