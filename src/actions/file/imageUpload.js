import FILE_TYPES from '../../action-types/file';
import request from '../../agent/request';

export const fetchUploadImageStart = () => ({
  type: FILE_TYPES.FETCH_UPLOADIMAGE_START,
});
export const fetchUploadImageSuccess = (data) => ({
  type: FILE_TYPES.FETCH_UPLOADIMAGE_SUCCESS,
  payload: data,
});
export const fetchUploadImageError = (err) => ({
  type: FILE_TYPES.FETCH_UPLOADIMAGE_ERROR,
  payload: err,
});

export const fetchUploadImageInfo = (image) => async (dispatch) => {
  dispatch(fetchUploadImageStart());
  return request
    .post('file/upload/image', image, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => dispatch(fetchUploadImageSuccess(response.data)))
    .catch((err) => dispatch(fetchUploadImageError(err)));
};
