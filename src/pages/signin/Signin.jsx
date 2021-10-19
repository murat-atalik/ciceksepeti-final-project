import './signin.scss';

import { fetchSigninInfo } from 'actions/authorization/signin';
import FormComponent from 'components/FormComponents/FormComponent';
import React from 'react';
import { useSelector } from 'react-redux';

import model from '../../assests/Group52.png';

function Signin() {
  const signin = useSelector((state) => state.signin);

  return (
    <div className="signin">
      <div className="image">
        <img src={model} alt="model" />
      </div>
      <div className="form-container">
        <FormComponent
          type="signin"
          fetch={fetchSigninInfo}
          isSignedIn={signin.isSignedIn}
          isFetching={signin.isFetching}
        />
      </div>
    </div>
  );
}

export default Signin;
