import './card.scss';

import React from 'react';

function Card({ product, callback }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="card-container"
        onClick={() => callback(product.id)}
      >
        <div className="card-img-container">
          <img src={product.imageUrl} alt={product.brand.title} />
        </div>
        <div className="card-product-info-wrapper">
          <div className="card-product-info">
            <p className="card-brand">{product.brand.title}</p>
            <p className="card-color">
              Renk: <span>{product.color.title}</span>
            </p>
          </div>
          <p className="card-price">
            {product.price
              .toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              })
              .slice(1)}
            <span> TL</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
