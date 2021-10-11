import CATEGORY_TYPES from '../../action-types/category';

const initialState = {
  postData: [],
  isFetching: false,
  isError: '',
};

const allCategories = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case CATEGORY_TYPES.FETCH_ALLCATEGORIES_START:
      return { ...state, isFetching: true, postData: [], isError: '' };
    case CATEGORY_TYPES.FETCH_ALLCATEGORIES_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        isFetching: false,
        isError: '',
      };
    case CATEGORY_TYPES.FETCH_GETCATEGORY_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default allCategories;
