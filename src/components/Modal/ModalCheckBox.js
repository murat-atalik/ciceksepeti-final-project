import React from 'react';

import checkedOutline from 'assests/Ellipse1304-Outline.svg';
import checked from 'assests/Group6909.svg';

const ModalCheckBox = ({ label, value, callback, className }) => (
  <div
    role="button"
    className={className}
    onClick={callback}
    onKeyDown={callback}
    tabIndex={0}
  >
    {value && <img src={checked} alt="checked" />}
    {!value && <img src={checkedOutline} alt="checked" />}
    <span> {label}</span>
  </div>
);

export default ModalCheckBox;
