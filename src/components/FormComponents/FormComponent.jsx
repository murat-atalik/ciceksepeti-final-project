import useValidation from 'hooks/useValidation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import ProjectLogo from '../../assests/Group6607.svg';
import validate from '../../helpers/validationHelper';
import Button from '../Button/Button';
import Input from '../Input/Input';

function FormComponent({ type, fetch, isSignedIn }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const log = (value) => {
    if (!isSignedIn) {
      dispatch(fetch(value));
    }
  };
  const { handleSubmit, handleChange, errors } = useValidation(
    log,
    validate,
    values
  );

  useEffect(() => {
    if (isSignedIn) {
      history.push('/');
    }
  }, [history, isSignedIn]);

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
            theme={errors.email && 'warning'}
            className="email-input"
            type="email"
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
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        <div className="input-div">
          <p className="form-label">Şifre</p>
          <Input
            theme={errors.password && 'warning'}
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
          {errors.password && <p className="form-error">{errors.password}</p>}
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
