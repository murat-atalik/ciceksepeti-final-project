import './signup.scss';

import { fetchSignupInfo } from 'actions/authorization/signup';
import FormComponent from 'components/FormComponents/FormComponent';
import React from 'react';
import { useSelector } from 'react-redux';

import model from '../../assests/Group52.png';

function Signup() {
  const isSignedIn = useSelector((state) => state.signup.isSignedIn);

  return (
    <div className="signup">
      <div className="image">
        <img src={model} alt="model" />
      </div>
      <div className="form-container">
        <FormComponent
          type="signin"
          fetch={fetchSignupInfo}
          isSignedIn={isSignedIn}
        />
      </div>
    </div>
  );
}

export default Signup;
