import './uploadImage.scss';

import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchUploadImageInfo,
  removeImage,
} from '../../actions/file/imageUpload';
import uploadIcon from '../../assests/Group6911.svg';
import ProgressBar from '../ProgressBar/ProgressBar';

const baseStyle = {
  height: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  borderWidth: '1px',
  borderRadius: '10px',
  borderColor: '#B1B1B1',
  borderStyle: 'dashed',
  backgroundColor: '#FFFFFF',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#4B9CE2',
  backgroundColor: '#F0F8FF',
  color: '#4B9CE2',
};

const acceptStyle = {
  borderColor: '#4B9CE2',
  backgroundColor: '#F0F8FF',
  color: '#4B9CE2',
};

const rejectStyle = {
  borderColor: '#F77474',
  backgroundColor: '#FFF2F2',
  color: '#F77474',
};
const UploadImage = ({ imageUrlErr, imageUrlMsg, setSelected, value }) => {
  const uploadImage = useSelector((state) => state.uploadImage);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ err: false, msg: '' });
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/png,image/jpg,image/jpeg',
    multiple: false,
    minSize: 0,
    maxSize: 409600,
    onDrop: (acceptedFiles, fileRejections) => {
      fileRejections.forEach((file) => {
        for (let i = 0; i < file.errors.length; i = +1) {
          const err = file.errors[i];
          if (err.code === 'file-invalid-type') {
            setErrors({
              err: true,
              msg: 'Dosya Formatı PNG/JPG/JPEG Olmalı',
            });
            break;
          }
          if (err.code === 'file-too-large') {
            setErrors({
              err: true,
              msg: `Dosya Boyutu 400KB'tan Büyük Olmamalı`,
            });
          }
        }
      });
      acceptedFiles.forEach((file) => {
        setErrors({ err: false, msg: '' });
        dispatch(fetchUploadImageInfo(file));
      });
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  const clearImageUrl = () => {
    dispatch(removeImage());
    setSelected('');
  };

  useEffect(() => {
    if (
      !uploadImage.isFetching &&
      uploadImage.file.length > 0 &&
      value !== uploadImage.file
    ) {
      setSelected(uploadImage.file);
    }
  }, [setSelected, uploadImage.file, uploadImage.isFetching, value]);
  return (
    <div className="upload-image-wrapper">
      {uploadImage.file.length === 0 && !uploadImage.isFetching && (
        <div className="upload-image-container">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />

            <img src={uploadIcon} alt="upload-icon" className="upload-icon" />

            <p className="upload-container-body">
              Sürükleyip bırakarak yükle veya
            </p>
            <div className="upload-container-box">
              <p>Görsel Seçin</p>
            </div>
            <p className="upload-container-alert">
              PNG ve JPEG Dosya boyutu: max. 400kb
            </p>
          </div>
          <p className="upload-image-err">
            {imageUrlMsg}
            {imageUrlErr && errors.err && ' ve '}
            {errors.msg}
          </p>
        </div>
      )}
      {uploadImage.file.length === 0 && uploadImage.isFetching && (
        <ProgressBar progress={uploadImage.progress} />
      )}
      {uploadImage.file.length !== 0 && !uploadImage.isFetching && (
        <div className="upload-image-preview">
          <img src={uploadImage.file} alt="Product" />
          <span
            onClick={() => {
              clearImageUrl();
            }}
            role="none"
            aira-hidden="true"
          >
            x
          </span>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
