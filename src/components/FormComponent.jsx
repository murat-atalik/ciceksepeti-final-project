import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import ProjectLogo from '../assests/Group6607.svg';
import Button from './Button/Button';
import Input from './Input/Input';

function FormComponent({ type }) {
  return (
    <>
      <div className="form">
        {type === 'signin' ? (
          <div className="form-title">
            <h2>Üye Ol</h2>
            <div>Fırsatlardan yararlanmak için üye ol!</div>
          </div>
        ) : (
          <div className="form-title">
            <h2>Giriş Yap</h2>
            <div>Fırsatlardan yararlanmak için giriş yap!</div>
          </div>
        )}
        <Input
          className="email-input"
          type="email"
          value=""
          placeholder="example@example.com"
        />
        <Input className="password-input" type="password" value="asdasd" />
        <Button theme="primary" className="custom-btn">
          {type === 'signin' ? 'Üye Ol' : 'Giriş Yap'}
        </Button>
        {type !== 'signin' ? (
          <div className="form-redirect">
            <p>Hesabın var mı?</p>
            <Link to="/signin" className="link-to">
              Giriş Yap
            </Link>
          </div>
        ) : (
          <div className="form-redirect">
            <p>Hesabın yok mu?</p>
            <Link to="/signup" className="link-to">
              Üye Ol
            </Link>
          </div>
        )}
        <img className="logo" src={ProjectLogo} alt="Logo" />
      </div>
    </>
  );
}

FormComponent.propTypes = {
  type: PropTypes.string.isRequired,
};
export default FormComponent;
