import './product.scss';

import Header from 'components/Header/Header';
import React from 'react';
import { useParams } from 'react-router-dom';

function Product() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <div className="product-container">Product id:{id}</div>
    </>
  );
}

export default Product;
