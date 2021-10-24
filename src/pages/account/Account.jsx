import './account.scss';

import { fetchAcceptOfferInfo } from 'actions/account/acceptOffer';
import { fetchGivenOffersInfo } from 'actions/account/givenOffers';
import { fetchRecievedOffersInfo } from 'actions/account/receivedOffers';
import { fetchRejectOfferInfo } from 'actions/account/rejectOffer';
import { fetchPurchaseProductInfo } from 'actions/product/purchaseProduct';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import ConfirmationModal from 'components/Modal/ConfirmationModal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import avatar from '../../assests/Group6876.svg';

function Account() {
  const receivedOffers = useSelector((state) => state.receivedOffers);
  const givenOffers = useSelector((state) => state.givenOffers);
  const dispatch = useDispatch();
  const history = useHistory();
  const email = localStorage.getItem('email');
  const [toggleOffer, setToggleOffer] = useState(true);
  const [acceptOfferModal, setAcceptOfferModal] = useState(false);
  const [purchaseOfferModal, setPurchaseOfferModal] = useState(false);
  const [rejectOfferModal, setRejectOfferModal] = useState(false);
  const [productId, setproductId] = useState('');
  const [offerId, setOfferId] = useState('');

  const toggleAcceptOffer = () => setAcceptOfferModal(!acceptOfferModal);

  const acceptOffer = () => {
    dispatch(fetchAcceptOfferInfo(offerId));
    setAcceptOfferModal(false);
  };
  const togglePurchaseOffer = () => setPurchaseOfferModal(!purchaseOfferModal);

  const purchaseOffer = () => {
    dispatch(
      fetchPurchaseProductInfo(productId, localStorage.getItem('access-token'))
    );
    setPurchaseOfferModal(false);
  };
  const toggleRejectOffer = () => setRejectOfferModal(!rejectOfferModal);

  const rejectOffer = () => {
    dispatch(fetchRejectOfferInfo(offerId));
    setRejectOfferModal(false);
  };
  const toggle = () => setToggleOffer(!toggleOffer);

  useEffect(() => {
    /* Her account sayfasina gidildiginde data cekilmezse
     kullanicinin almis yada vermis oldugu teklifler sayfa yenilenene kadar ayni kalir 
     bu yuzden bu kisim sayfa her acildiginda yenileniyor */
    dispatch(fetchGivenOffersInfo());
    dispatch(fetchRecievedOffersInfo());
  }, [dispatch]);

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
            {toggleOffer &&
              receivedOffers?.data.map((item) => (
                <div key={item.id} className="account-detail-card">
                  <div className="account-detail-card-wrapper">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      onClick={() =>
                        history.push(`/product/${item.product.id}`)
                      }
                      aria-hidden="true"
                    />
                    <div className="account-detail-card-detail">
                      <p>{item.product.title}</p>
                      <p>
                        <span>Alınan Teklif:</span>
                        {item.offeredPrice
                          .toLocaleString('tr-TR', {
                            style: 'currency',
                            currency: 'TRY',
                          })
                          .slice(1)}
                        <span> TL</span>
                      </p>
                    </div>
                  </div>
                  <div className="account-button-container">
                    {item.status === 'offered' && !item.product.isSold && (
                      <Button
                        theme="primary"
                        onClick={() => {
                          setOfferId(item.id);
                          toggleAcceptOffer();
                        }}
                      >
                        Onayla
                      </Button>
                    )}
                    {item.status === 'offered' && !item.product.isSold && (
                      <Button
                        theme="warning"
                        onClick={() => {
                          setOfferId(item.id);
                          toggleRejectOffer();
                        }}
                      >
                        Reddet
                      </Button>
                    )}
                    {(item.status === 'rejected' ||
                      (item.status === 'offered' && item.product.isSold)) && (
                      <p className="account-button-container-rejected">
                        Reddedildi
                      </p>
                    )}
                    {item.status === 'accepted' && !item.product.isSold && (
                      <p className="account-button-container-accepted">
                        Onaylandı
                      </p>
                    )}
                    {item.status === 'accepted' && item.product.isSold && (
                      <p className="account-button-container-sold">
                        Satın Alındı
                      </p>
                    )}
                  </div>
                </div>
              ))}
            {!toggleOffer &&
              givenOffers?.data.map((item) => (
                <div key={item.id} className="account-detail-card">
                  <div className="account-detail-card-wrapper">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      onClick={() =>
                        history.push(`/product/${item.product.id}`)
                      }
                      aria-hidden="true"
                    />
                    <div className="account-detail-card-detail">
                      <p>{item.product.title}</p>
                      <p>
                        <span>Verilen Teklif:</span>
                        {item.offeredPrice
                          .toLocaleString('tr-TR', {
                            style: 'currency',
                            currency: 'TRY',
                          })
                          .slice(1)}
                        <span> TL</span>
                      </p>
                    </div>
                  </div>
                  <div className="account-button-container">
                    {item.status === 'accepted' && !item.product.isSold && (
                      <Button
                        theme="primary"
                        onClick={() => {
                          setproductId(item.product.id);
                          togglePurchaseOffer();
                        }}
                      >
                        Satın Al
                      </Button>
                    )}
                    {item.status === 'rejected' && !item.product.isSold && (
                      <p className="account-button-container-rejected">
                        Reddedildi
                      </p>
                    )}
                    {((item.status === 'offered' && item.product.isSold) ||
                      (item.status === 'rejected' && item.product.isSold)) && (
                      <p className="account-button-container-rejected">
                        Satıldı
                      </p>
                    )}
                    {item.status === 'accepted' && !item.product.isSold && (
                      <p className="account-button-container-accepted">
                        Onaylandı
                      </p>
                    )}
                    {item.status === 'accepted' && item.product.isSold && (
                      <p className="account-button-container-sold">
                        Satın Alındı
                      </p>
                    )}
                    {item.status === 'offered' && !item.product.isSold && (
                      <p className="account-button-container-accepted">
                        Beklemede
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {acceptOfferModal && (
        <ConfirmationModal
          title="Teklifi Onayla"
          body="Teklifi Onaylamak istiyor musunuz?"
          toggleModdal={toggleAcceptOffer}
          primaryButton="Teklifi Onayla"
          secondaryButton="Vazgeç"
          callback={acceptOffer}
        />
      )}
      {rejectOfferModal && (
        <ConfirmationModal
          title="Teklifi Reddet"
          body="Teklifi Reddetmek istiyor musunuz?"
          toggleModdal={toggleRejectOffer}
          primaryButton="Teklifi Reddet"
          secondaryButton="Vazgeç"
          callback={rejectOffer}
        />
      )}
      {purchaseOfferModal && (
        <ConfirmationModal
          title="Satın Al"
          body="Satın Almak istiyor musunuz?"
          toggleModdal={togglePurchaseOffer}
          primaryButton="Satın Al"
          secondaryButton="Vazgeç"
          callback={purchaseOffer}
        />
      )}
    </>
  );
}

export default Account;
