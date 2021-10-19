import './signup.scss';

import { fetchSignupInfo } from 'actions/authorization/signup';
import FormComponent from 'components/FormComponents/FormComponent';
import React from 'react';
import { useSelector } from 'react-redux';

import model from '../../assests/Group52.png';

function Signup() {
  const signup = useSelector((state) => state.signup);

  return (
    <div className="signup">
      <div className="image">
        <img src={model} alt="model" />
      </div>
      <div className="form-container">
        <FormComponent
          type="signin"
          fetch={fetchSignupInfo}
          isSignedIn={signup.isSignedIn}
          isFetching={signup.isFetching}
        />
      </div>
    </div>
  );
}

export default Signup;
