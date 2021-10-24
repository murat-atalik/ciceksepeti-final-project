import AUTH_TYPES from '../../action-types/authorization';

const initialState = {
  postData: {},
  isFetching: false,
  isError: '',
  isSignedIn: false,
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
        isSignedIn: true,
      };
    case AUTH_TYPES.FETCH_SIGNIN_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    case AUTH_TYPES.SIGNIN_LOG_OUT:
      return { ...initialState };
    default:
      return state;
  }
};
export default signin;
