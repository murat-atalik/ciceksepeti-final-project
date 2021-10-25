import CATEGORY_TYPES from 'action-types/category';
import request from 'agent/request';

export const fetchAllCategoriesStart = () => ({
  type: CATEGORY_TYPES.FETCH_ALLCATEGORIES_START,
});

export const fetchAllCategoriesSuccess = (post) => ({
  type: CATEGORY_TYPES.FETCH_ALLCATEGORIES_SUCCESS,
  payload: post,
});

export const fetchAllCategoriesError = (err) => ({
  type: CATEGORY_TYPES.FETCH_ALLCATEGORIES_ERROR,
  payload: err,
});

export const fetchAllCategoriesInfo = () => async (dispatch) => {
  dispatch(fetchAllCategoriesStart());
  return request
    .get('/detail/category/all')
    .then((response) => dispatch(fetchAllCategoriesSuccess(response.data)))
    .catch((err) => dispatch(fetchAllCategoriesError(err)));
};
