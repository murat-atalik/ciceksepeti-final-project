import FILE_TYPES from 'action-types/file';
import axios from 'axios';

export const fetchUploadImageStart = () => ({
  type: FILE_TYPES.FETCH_UPLOADIMAGE_START,
});

export const fetchUploadImageSuccess = (data) => ({
  type: FILE_TYPES.FETCH_UPLOADIMAGE_SUCCESS,
  payload: data,
});

export const fetchUploadImagePercent = (data) => ({
  type: FILE_TYPES.FETCH_UPLOADIMAGE_PERCENT,
  payload: data,
});

export const fetchUploadImageError = (err) => ({
  type: FILE_TYPES.FETCH_UPLOADIMAGE_ERROR,
  payload: err,
});

export const removeImage = () => ({
  type: FILE_TYPES.REMOVE_IMAGE,
});

export const fetchUploadImageInfo = (image) => async (dispatch) => {
  const file = new FormData();
  file.append('file', image, image.name);
  dispatch(fetchUploadImageStart());
  return axios
    .post(
      'https://fe-bootcamp-api.herokuapp.com/api/fe/v1/file/upload/image',
      file,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${file.boundary}`,
        },
        onUploadProgress: (progressEvent) =>
          dispatch(
            fetchUploadImagePercent(
              Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            )
          ),
      }
    )
    .then((response) => dispatch(fetchUploadImageSuccess(response.data.url)))
    .catch((err) => dispatch(fetchUploadImageError(err)));
};
