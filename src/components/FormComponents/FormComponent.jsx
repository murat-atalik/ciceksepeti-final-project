import ProjectLogo from 'assests/Group6607.svg';
import validate from 'helpers/validationHelper';
import useValidation from 'hooks/useValidation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Button from '../Button/Button';
import Input from '../Input/Input';

function FormComponent({ type, fetch, selector }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const validateForm = (value) => {
    if (!selector.isSignedIn && !selector.isFetching) {
      dispatch(fetch(value));
    }
  };
  const { handleSubmit, handleChange, errors } = useValidation(
    validateForm,
    validate,
    values
  );

  useEffect(() => {
    if (selector.isSignedIn) {
      history.push('/');
    }
  }, [history, selector.isSignedIn]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {type === 'signup' ? (
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
        <div className="input-div">
          <p className="form-label">Email</p>
          <Input
            theme={errors.emailErr && 'warning'}
            className="email-input"
            type="text"
            name="email"
            value={values.email}
            placeholder="example@example.com"
            onChange={(e) => {
              setValues({
                ...values,
                email: e.target.value,
              });
              handleChange();
            }}
          />
          {errors.emailErr && <p className="form-error">{errors.emailMsg}</p>}
        </div>
        <div className="input-div">
          <p className="form-label">Şifre</p>
          <Input
            theme={errors.passwordErr && 'warning'}
            className="password-input"
            type="password"
            name="password"
            value={values.password}
            placeholder="•••••"
            onChange={(e) => {
              setValues({
                ...values,
                password: e.target.value,
              });
              handleChange();
            }}
          />
          {errors.passwordErr && (
            <p className="form-error">{errors.passwordMsg}</p>
          )}
          {type === 'signin' && selector.isError.length !== 0 && (
            <p className="signin-forgot-password">Şifremi Unuttum</p>
          )}
        </div>
        <Button type="submit" theme="primary" className="custom-btn">
          {type === 'signup' ? 'Üye Ol' : 'Giriş Yap'}
        </Button>
        {type === 'signup' ? (
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
      </form>
    </>
  );
}

FormComponent.propTypes = {
  type: PropTypes.string.isRequired,
};
export default FormComponent;
