import './product.scss';

import { fetchGivenOffersInfo } from 'actions/account/givenOffers';
import { fetchGetProductInfo } from 'actions/product/getProduct';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.getProduct.product);
  useEffect(() => {
    dispatch(fetchGetProductInfo(id));
  }, [dispatch, id]);
  console.log('product :>> ', product);
  const log = () => {
    dispatch(fetchGivenOffersInfo());
  };
  return (
    <>
      <Header />
      <div className="product-main-container">
        <div className="product-detail-container">
          <div className="product-detail-img">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="product-detail-info">
            <h2>{product.title}</h2>
            <div className="info-wrapper">
              <div>
                <p>{product?.brand?.title}</p>
              </div>
              <div>
                <p>{product?.color?.title}</p>
              </div>
              <div>
                <p>{product?.status?.title}</p>
              </div>
              <div className="product-btn-contaier">
                {!product.isSold && <Button onClick={log}>Satın Al</Button>}
                {!product.isSold && product.isOfferable && (
                  <Button theme="secondary">Teklif Ver</Button>
                )}
                {product.isSold && (
                  <Button theme="disabled" disabled>
                    Bu Ürün Satışta Değil
                  </Button>
                )}
              </div>
              <p className="product-price">
                {product?.price
                  ?.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  })
                  .slice(1)}
                <span> TL</span>
              </p>
              <div className="product-description">
                <p>Açıklama</p>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
