import './header.scss';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signinLogout } from '../../actions/authorization/signin';
import { signupLogout } from '../../actions/authorization/signup';
import user from '../../assests/Group3045.svg';
import logo from '../../assests/Group6607.svg';
import add from '../../assests/Group6861.svg';
import Button from '../Button/Button';

function Header() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const goAccount = () => history.push('/account');
  const goSignin = () => history.push('/signin');
  const goAddProduct = () => history.push('/add-product');

  const logout = () => {
    localStorage.clear();
    dispatch(signinLogout());
    dispatch(signupLogout());
    history.push('/');
    toast.success('Çıkış başarılı.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      closeButton: false,
    });
  };
  return (
    <>
      <div className="header">
        <Link to="/" className="header-logo-redirect">
          <img className="header-logo" src={logo} alt="logo" />
        </Link>
        <div className="header-buttons">
          {localStorage.getItem('email') && (
            <Button
              className="header-add-button"
              theme="secondary"
              onClick={goAddProduct}
            >
              <img src={add} alt="Ürün Ekle" className="header-add-img" />
              <span>Ürün Ekle</span>
            </Button>
          )}
          {localStorage.getItem('email') && location.pathname !== '/account' && (
            <Button
              className="header-account-button"
              theme="secondary"
              onClick={goAccount}
            >
              <img src={user} alt="Hesabım" className="header-account-img" />
              <span>Hesabım</span>
            </Button>
          )}
          {localStorage.getItem('email') && location.pathname === '/account' && (
            <Button
              className="header-account-button"
              theme="secondary"
              onClick={logout}
            >
              <img src={user} alt="Hesabım" className="header-account-img" />
              <span>Çıkış Yap</span>
            </Button>
          )}

          {!localStorage.getItem('email') && (
            <Button
              className="header-account-button"
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
