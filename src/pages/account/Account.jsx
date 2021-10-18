import './account.scss';

import Header from 'components/Header/Header';
import React, { useState } from 'react';

import avatar from '../../assests/Group6876.svg';

function Account() {
  const email = localStorage.getItem('email');
  const [toggleOffer, setToggleOffer] = useState(true);
  const toggle = () => {
    setToggleOffer(!toggleOffer);
    console.log('toggleOffer :>> ', toggleOffer);
  };
  return (
    <>
      <Header />
      <div className="account-container">
        <div className="account-email-container">
          <img src={avatar} alt="avatar" />
          <p>{email}</p>
        </div>
        <div className="account-main-container">
          <div className="account-detail-title">
            <h2
              className={!toggleOffer ? 'default-title' : 'active-title'}
              onClick={toggle}
              aria-hidden="true"
            >
              Teklif Aldıklarım
            </h2>
            <h2
              onClick={toggle}
              className={toggleOffer ? 'default-title' : 'active-title'}
              aria-hidden="true"
            >
              Teklif Verdiklerim
            </h2>
          </div>
          <hr />
          <div className="account-detail-container">
            <div className="account-detail-card">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fcyber-security-line-filled-blue%2F154%2FBug_cyber_insect_security-512.png&f=1&nofb=1"
                alt="product"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
