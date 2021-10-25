import './signin.scss';

import { fetchSigninInfo } from 'actions/authorization/signin';
import model from 'assests/Group52.png';
import FormComponent from 'components/FormComponents/FormComponent';
import React from 'react';
import { useSelector } from 'react-redux';

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
          selector={signin}
        />
      </div>
    </div>
  );
}

export default Signin;
