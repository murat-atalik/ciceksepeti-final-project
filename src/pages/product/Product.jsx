import './product.scss';

import { fetchGivenOffersInfo } from 'actions/account/givenOffers';
import { fetchGetProductInfo } from 'actions/product/getProduct';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getProduct = useSelector((state) => state.getProduct);
  const givenOffers = useSelector((state) => state.givenOffers);
  const [offer, setOffer] = useState({});

  useEffect(() => {
    if (givenOffers.data.length > 0) {
      setOffer(givenOffers.data.filter((item) => item.product.id === id)[0]);
    }
  }, [givenOffers, id]);
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
  console.log('product :>> ', localStorage.getItem('access-token') === null);

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
                {!getProduct.product.isSold && offer && (
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
                    <Button theme="primary">Satın Al</Button>
                  )}
                  {!getProduct.product.isSold &&
                    getProduct.product.isOfferable &&
                    offer === 'undefined' && (
                      <Button theme="secondary">Teklif Ver</Button>
                    )}
                  {!getProduct.product.isSold &&
                    getProduct.product.isOfferable &&
                    offer && (
                      <Button theme="secondary">Teklifi Geri Çek</Button>
                    )}
                  {getProduct.product.isSold && (
                    <Button theme="disabled" disabled>
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
    </>
  );
}

export default Product;
