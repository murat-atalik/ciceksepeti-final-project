import './offerModal.scss';

import CustomButton from 'components/Button/CustomButton';
import Input from 'components/Input/Input';
import offerHelper from 'helpers/offerHelper';
import useValidation from 'hooks/useValidation';
import React, { useState } from 'react';

import Close from '../../assests/Group6618.svg';
import CheckBox from './CheckBox';

function OfferModal({
  callback,
  toggleModdal,
  product,
  offerPrice,
  setOfferPrice,
}) {
  const [percent20, setPercent20] = useState(false);
  const [percent30, setPercent30] = useState(false);
  const [percent40, setPercent40] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const { handleSubmit, handleChange, errors } = useValidation(
    callback,
    offerHelper,
    offerPrice
  );
  const checked20 = () => {
    setPercent20(true);
    setPercent30(false);
    setPercent40(false);
    setInputValue(0);
    const price = (product.price * 20) / 100;
    const fixedPrice = price.toFixed(2);
    setOfferPrice((prev) => ({ ...prev, offeredPrice: Number(fixedPrice) }));
    handleChange();
  };
  const checked30 = () => {
    setPercent30(true);
    setPercent20(false);
    setPercent40(false);
    setInputValue(0);
    const price = (product.price * 30) / 100;
    const fixedPrice = price.toFixed(2);
    setOfferPrice((prev) => ({ ...prev, offeredPrice: Number(fixedPrice) }));
    handleChange();
  };
  const checked40 = () => {
    setPercent40(true);
    setPercent20(false);
    setPercent30(false);
    setInputValue(0);
    const price = (product.price * 40) / 100;
    const fixedPrice = price.toFixed(2);
    setOfferPrice((prev) => ({ ...prev, offeredPrice: Number(fixedPrice) }));
    handleChange();
  };

  const changeValue = (e) => {
    setPercent40(false);
    setPercent20(false);
    setPercent30(false);
    setOfferPrice({ offeredPrice: Number(e.target.value) });
    setInputValue(Number(e.target.value));
    handleChange();
  };
  return (
    <div>
      {offerPrice.offeredPrice}
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
              type="number"
              theme={errors.offeredPrice ? 'warning' : 'primary'}
              value={inputValue > 0 ? inputValue : ''}
              onClick={(e) => {
                changeValue(e);
              }}
              onChange={(e) => {
                changeValue(e);
              }}
              placeholder="Teklif Belirle"
            />
            <span
              className={
                errors.offeredPrice
                  ? 'offer-input-price-error'
                  : 'offer-input-price'
              }
            >
              TL
            </span>
            <span className="error-span">{errors.offeredPrice}</span>
          </div>
          <div className="offer-modal-wrapper-buttons">
            <CustomButton theme="primary" onClick={handleSubmit}>
              Onayla
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
