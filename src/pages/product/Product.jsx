import './product.scss';

import { fetchCancelOfferInfo } from 'actions/account/cancelOffer';
import { fetchGivenOffersInfo } from 'actions/account/givenOffers';
import { fetchGetProductInfo } from 'actions/product/getProduct';
import { fetchOfferProductInfo } from 'actions/product/offerProduct';
import { fetchPurchaseProductInfo } from 'actions/product/purchaseProduct';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import ConfirmationModal from 'components/Modal/ConfirmationModal';
import OfferModal from 'components/Modal/OfferModal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getProduct = useSelector((state) => state.getProduct);
  const givenOffers = useSelector((state) => state.givenOffers);
  const [offer, setOffer] = useState({});
  const [buyModal, setBuyModal] = useState(false);
  const [withdrawOffer, setWithdrawOffer] = useState(false);
  const [offerModalVisibility, setOfferModalVisibilty] = useState(false);
  const [offerPrice, setOfferPrice] = useState({ offeredPrice: 0 });
  const authenticated = localStorage.getItem('isSignedin') === 'true';
  const history = useHistory();

  const toggleBuyModal = () => {
    if (authenticated) {
      setBuyModal((prev) => !prev);
    } else {
      history.push('/signin');
    }
  };
  const toggleWithDrawOffer = () => {
    if (authenticated) {
      setWithdrawOffer((prev) => !prev);
    } else {
      history.push('/signin');
    }
  };
  const togggleOfferModal = () => {
    if (authenticated) {
      setOfferModalVisibilty((prev) => !prev);
    } else {
      history.push('/signin');
    }
  };
  const giveOffer = () => {
    dispatch(fetchOfferProductInfo(id, offerPrice));
    setOfferModalVisibilty(false);
  };
  const buyOffer = () => {
    dispatch(
      fetchPurchaseProductInfo(id, localStorage.getItem('access-token'))
    );
    setBuyModal(false);
  };
  const cancelOffer = () => {
    dispatch(fetchCancelOfferInfo(offer.id));
    setWithdrawOffer(false);
  };

  useEffect(() => {
    setOffer(givenOffers.data.filter((item) => item.product.id === id)[0]);
  }, [givenOffers, givenOffers.isFetching, id]);

  useEffect(() => {
    dispatch(fetchGetProductInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      !givenOffers.isFetching &&
      !givenOffers.isDataReceived &&
      localStorage.getItem('access-token') !== null
    ) {
      dispatch(fetchGivenOffersInfo());
    }
  }, [dispatch, getProduct, givenOffers, id]);

  return (
    <>
      <Header />
      <div className="product-main-container">
        {Object.keys(getProduct.product).length > 0 && (
          <div className="product-detail-container">
            <div className="product-detail-img">
              <img src={getProduct.product.imageUrl} alt="" />
            </div>
            <div className="product-detail-info">
              <h2 className="product-detail-info-title">
                {getProduct.product.title}
              </h2>
              <div className="info-wrapper">
                <div className="info-wrapper-detail">
                  <div>
                    <div className="brand-info">
                      <p>Marka:</p>
                      <span>{getProduct.product?.brand?.title}</span>
                    </div>
                    <div className="color-info">
                      <p>Renk:</p>
                      <span>{getProduct.product?.color?.title}</span>
                    </div>
                    <div className="status-info">
                      <p>Kullanım Durumu:</p>{' '}
                      <span>{getProduct.product?.status?.title}</span>
                    </div>
                  </div>
                  <div className="product-price">
                    <p>
                      {getProduct.product?.price
                        ?.toLocaleString('tr-TR', {
                          style: 'currency',
                          currency: 'TRY',
                        })
                        .slice(1)}
                    </p>
                    <span> TL</span>
                  </div>
                </div>
                {!getProduct.product.isSold &&
                  (offer?.status === 'offered' ||
                    offer?.status === 'accepted' ||
                    offer?.status === 'rejected') && (
                    <div className="product-offer-container">
                      <p className="product-offer-label">Verilen Teklif:</p>
                      <p className="product-offer-price">
                        {offer?.offeredPrice
                          ?.toLocaleString('tr-TR', {
                            style: 'currency',
                            currency: 'TRY',
                          })
                          .slice(1)}
                        <span> TL</span>
                      </p>
                    </div>
                  )}
                <div className="product-btn-contaier">
                  {!getProduct.product.isSold && (
                    <Button theme="primary" onClick={toggleBuyModal}>
                      Satın Al
                    </Button>
                  )}
                  {!getProduct.product.isSold &&
                    getProduct.product.isOfferable &&
                    !offer?.status && (
                      <Button theme="secondary" onClick={togggleOfferModal}>
                        Teklif Ver
                      </Button>
                    )}
                  {!getProduct.product.isSold &&
                    getProduct.product.isOfferable &&
                    (offer?.status === 'offered' ||
                      offer?.status === 'accepted' ||
                      offer?.status === 'rejected') && (
                      <Button theme="secondary" onClick={toggleWithDrawOffer}>
                        Teklifi Geri Çek
                      </Button>
                    )}
                  {getProduct.product.isSold && (
                    <Button
                      theme="disabled"
                      disabled
                      className="product-info-disabled-btn"
                    >
                      Bu Ürün Satışta Değil
                    </Button>
                  )}
                </div>

                <div className="product-description">
                  <p>Açıklama</p>
                  <p>{getProduct.product.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {buyModal && (
        <ConfirmationModal
          title="Satın Al"
          body="Satın Almak istiyor musunuz?"
          toggleModdal={toggleBuyModal}
          primaryButton="Satın Al"
          secondaryButton="Vazgeç"
          callback={buyOffer}
        />
      )}
      {withdrawOffer && (
        <ConfirmationModal
          title="Teklifi Geri Çek"
          body="Teklifi Geri Çekmek istiyor musunuz?"
          toggleModdal={toggleWithDrawOffer}
          primaryButton="Teklifi Geri Çek"
          secondaryButton="Vazgeç"
          callback={cancelOffer}
        />
      )}
      {offerModalVisibility && (
        <OfferModal
          toggleModdal={togggleOfferModal}
          product={getProduct.product}
          offerPrice={offerPrice}
          setOfferPrice={setOfferPrice}
          callback={giveOffer}
        />
      )}
    </>
  );
}

export default Product;
