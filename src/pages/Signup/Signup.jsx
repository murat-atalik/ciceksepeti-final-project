import './signup.scss';

import { fetchSignupInfo } from 'actions/authorization/signup';
import FormComponent from 'components/FormComponents/FormComponent';
import React from 'react';

import model from '../../assests/Group52.png';

function Signup() {
  return (
    <div className="signup">
      <div className="image">
        <img src={model} alt="model" />
      </div>
      <div className="form-container">
        <FormComponent type="signup" fetch={fetchSignupInfo} />
      </div>
    </div>
  );
}

export default Signup;
