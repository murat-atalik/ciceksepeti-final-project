import './signin.scss';

import FormComponent from 'components/FormComponents/FormComponent';
import React from 'react';

import model from '../../assests/Group52.png';

function Signin() {
  return (
    <div className="signin">
      <div className="image">
        <img src={model} alt="model" />
      </div>
      <div className="form-container">
        <FormComponent type="signin" />
      </div>
    </div>
  );
}

export default Signin;
