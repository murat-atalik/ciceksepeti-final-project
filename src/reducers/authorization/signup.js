import AUTH_TYPES from '../../action-types/authorization';

const initialState = {
  postData: {},
  isFetching: false,
  isError: '',
  isSignedIn: false,
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.FETCH_SIGNUP_START:
      return { ...state, isFetching: true, postData: {}, isError: '' };
    case AUTH_TYPES.FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        isFetching: false,
        isError: '',
        isSignedIn: true,
      };
    case AUTH_TYPES.FETCH_SIGNUP_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default signup;
