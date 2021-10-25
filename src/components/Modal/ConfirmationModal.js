import './confirmationModal.scss';

import React from 'react';

import CustomButton from '../Button/CustomButton';

function ConfirmationModal({
  title,
  body,
  callback,
  toggleModdal,
  primaryButton,
  secondaryButton,
}) {
  return (
    <div>
      <div className="modal-wrapper">
        <div className="modal-wrapper-inner">
          <h2>{title}</h2>
          <p>{body}</p>
          <div className="modal-wrapper-buttons">
            <CustomButton theme="secondary" onClick={toggleModdal}>
              {secondaryButton}
            </CustomButton>
            <CustomButton theme="primary" onClick={callback}>
              {primaryButton}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
