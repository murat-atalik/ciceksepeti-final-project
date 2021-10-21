import './uploadImage.scss';

import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import uploadIcon from '../../assests/Group6911.svg';
import uploadIconWarn from '../../assests/Group6911Warn.svg';

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
const UploadImage = ({ warn }) => {
  const [errors, setErrors] = useState(false);
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
        file.errors.forEach((err) => {
          if (err.code === 'file-too-large') {
            setErrors(true);
          }
        });
      });
      acceptedFiles.forEach(() => {
        setErrors(false);
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
  return (
    <div
      className={
        errors || warn === 'true'
          ? 'upload-image-container-error'
          : 'upload-image-container'
      }
    >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {errors || warn === 'true' ? (
          <img src={uploadIconWarn} alt="upload-icon" className="upload-icon" />
        ) : (
          <img src={uploadIcon} alt="upload-icon" className="upload-icon" />
        )}
        <p className="upload-container-body">Sürükleyip bırakarak yükle veya</p>
        <div className="upload-container-box">
          <p>Görsel Seçin</p>
        </div>
        <p className="upload-container-alert">
          PNG ve JPEG Dosya boyutu: max. 400kb
        </p>
        {errors}
      </div>
    </div>
  );
};

export default UploadImage;
