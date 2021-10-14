/* eslint-disable no-unused-vars */
import './products.scss';

import { fetchAllCategoriesInfo } from 'actions/category/getAllCategories';
import { fetchAllProductsInfo } from 'actions/product/getAllProducts';
import Card from 'components/Card/Card';
import Header from 'components/Header/Header';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import banner from '../../assests/Banner1.png';

function Products() {
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.allCategories);
  const products = useSelector((state) => state.allProducts);
  const params = new URLSearchParams(window.location.search);
  const categoryQuery = params.get('category');
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (categories.postData.length === 0 && !categories.isFetching) {
      dispatch(fetchAllCategoriesInfo());
    }
    if (products.postData.length === 0 && !products.isFetching) {
      dispatch(fetchAllProductsInfo());
      console.log('products :>> ', products);
    }
  }, [products, categories, dispatch]);

  useEffect(() => {
    if (categoryQuery) {
      setFilteredData(
        products.postData.filter(
          (item) => item.category.title === categoryQuery
        )
      );
      console.log('categoryQuery 1:>> ', categoryQuery);
    } else {
      setFilteredData(products.postData);
      console.log('categoryQuery 2:>> ', categoryQuery);
    }
  }, [categoryQuery, products]);

  const goProduct = (value) => {
    history.push(`/product/${value}`);
  };

  return (
    <>
      <Header />
      <div className="body">
        <div className="products-body">
          <img className="banner-img" src={banner} alt="banner" />
          <div className="wrapper-categories">
            <div className="category-links">
              <Link
                to="/"
                className={
                  !categoryQuery
                    ? 'category-link-active'
                    : 'category-link-redirect'
                }
              >
                Hepsi
              </Link>

              {categories.postData.length > 0 &&
                categories.postData.map((category) => (
                  <Link
                    to={`/?category=${category.title.trim()}`}
                    key={category.id}
                    className={
                      category.title.trim() === categoryQuery
                        ? 'category-link-active'
                        : 'category-link-redirect'
                    }
                  >
                    {category.title.trim()}
                  </Link>
                ))}
            </div>
          </div>

          <div className="product-grid-container">
            {filteredData.length > 0 &&
              filteredData.map((product) => (
                <Card key={product.id} product={product} callback={goProduct} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
