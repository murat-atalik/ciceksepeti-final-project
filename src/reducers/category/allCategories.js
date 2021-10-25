import CATEGORY_TYPES from 'action-types/category';

const initialState = {
  allCategories: [],
  isFetching: false,
  isError: '',
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_TYPES.FETCH_ALLCATEGORIES_START:
      return { ...state, isFetching: true, allCategories: [], isError: '' };
    case CATEGORY_TYPES.FETCH_ALLCATEGORIES_SUCCESS:
      return {
        ...state,
        allCategories: action.payload,
        isFetching: false,
        isError: '',
      };
    case CATEGORY_TYPES.FETCH_GETCATEGORY_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default category;
