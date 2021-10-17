import './offerModal.scss';

import CustomButton from 'components/Button/CustomButton';
import Input from 'components/Input/Input';
import React, { useState } from 'react';

import Close from '../../assests/Group6618.svg';
import CheckBox from './CheckBox';

function OfferModal({ callback, toggleModdal, product }) {
  const [percent20, setPercent20] = useState(false);
  const [percent30, setPercent30] = useState(false);
  const [percent40, setPercent40] = useState(false);

  const checked20 = () => {
    setPercent20(true);
    setPercent30(false);
    setPercent40(false);
  };
  const checked30 = () => {
    setPercent30(true);
    setPercent20(false);
    setPercent40(false);
  };
  const checked40 = () => {
    setPercent40(true);
    setPercent20(false);
    setPercent30(false);
  };
  const checkedNone = () => {
    setPercent40(false);
    setPercent20(false);
    setPercent30(false);
  };
  return (
    <div>
      <div className="offer-modal-wrapper">
        <div className="offer-modal-wrapper-inner">
          <div className="offer-modal-wrapper-inner-title">
            <h2>Teklif Ver</h2>
            <button
              className="close-button"
              onClick={toggleModdal}
              type="button"
            >
              <img src={Close} alt="close" />
            </button>
          </div>
          <div className="offer-modal-info">
            <img src={product.imageUrl} alt={product.title} />
            <div className="modal-details">
              <p>{product.title}</p>
              <div className="product-price">
                <p>
                  {product.price
                    ?.toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    })
                    .slice(1)}
                </p>
                <span> TL</span>
              </div>
            </div>
          </div>
          <div className="offer-modal-wrapper-inner-offer">
            <CheckBox
              label="%20’si Kadar Teklif Ver"
              value={percent20}
              className={percent20 ? 'checked-active' : 'checked-default'}
              callback={checked20}
            />
            <CheckBox
              label="%30’u Kadar Teklif Ver"
              value={percent30}
              className={percent30 ? 'checked-active' : 'checked-default'}
              callback={checked30}
            />
            <CheckBox
              label="%40’ı Kadar Teklif Ver"
              value={percent40}
              callback={checked40}
              className={percent40 ? 'checked-active' : 'checked-default'}
            />
          </div>
          <div className="offer-input">
            <Input
              theme="primary"
              onClick={checkedNone}
              placeholder="Teklif Belirle"
            />
            <span className="offer-input-price">TL</span>
          </div>
          <div className="offer-modal-wrapper-buttons">
            <CustomButton theme="primary" onClick={callback}>
              Onayla
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
