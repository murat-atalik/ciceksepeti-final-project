import './header.scss';

import Button from 'components/Button/Button';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import user from '../../assests/Group3045.svg';
import logo from '../../assests/Group6607.svg';
import add from '../../assests/Group6861.svg';

function Header() {
  const history = useHistory();
  const goAccount = () => history.push('/account');
  const goSignin = () => history.push('/signin');
  const goAddProduct = () => history.push('/add-product');

  return (
    <>
      <div className="header">
        <Link to="/" className="header-logo-redirect">
          <img className="header-logo" src={logo} alt="logo" />
        </Link>
        <div className="header-buttons">
          {localStorage.getItem('email') && (
            <Button
              className="header-add-btn"
              theme="secondary"
              onClick={goAddProduct}
            >
              <img src={add} alt="Ürün Ekle" className="header-add-img" />
              Ürün Ekle
            </Button>
          )}
          {localStorage.getItem('email') ? (
            <Button
              className="account-btn"
              theme="secondary"
              onClick={goAccount}
            >
              <img src={user} alt="Hesabım" className="header-account-img" />
              Hesabım
            </Button>
          ) : (
            <Button
              className="account-btn"
              theme="secondary"
              onClick={goSignin}
            >
              <img src={user} alt="Giriş Yap" className="header-account-img" />
              Giriş Yap
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
