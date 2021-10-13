/* eslint-disable no-unused-vars */
import './products.scss';

import { fetchAllCategoriesInfo } from 'actions/category/getAllCategories';
import Header from 'components/Header/Header';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import banner from '../../assests/Banner1.png';

function Products() {
  const location = useLocation();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.allCategories);
  console.log('location :>> ', location.pathname);
  useEffect(() => {
    if (categories.postData.length === 0 && !categories.isFetching) {
      dispatch(fetchAllCategoriesInfo());
    }
  }, [categories, dispatch]);
  return (
    <>
      <Header />
      <div className="body">
        <div className="products-body">
          <img className="banner-img" src={banner} alt="banner" />
          <div className="wrapper">
            <div className="categori-links">
              <Link
                to="/"
                className={
                  location.pathname === '/' ||
                  location.pathname === '/products' ||
                  location.pathname === '/products/'
                    ? 'categori-link-active'
                    : 'categori-link-redirect'
                }
              >
                Hepsi
              </Link>
              {categories.postData.map((category) => (
                <Link
                  to={`/products/${category.title.trim()}`}
                  key={category.id}
                  className={
                    `/products/${category.title.trim()}` ===
                    location.pathname.trim()
                      ? 'categori-link-active'
                      : 'categori-link-redirect'
                  }
                >
                  <span>{category.title.trim()}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
