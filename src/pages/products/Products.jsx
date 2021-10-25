/* eslint-disable no-unused-vars */
import './products.scss';

import { fetchAllCategoriesInfo } from 'actions/category/getAllCategories';
import { fetchAllProductsInfo } from 'actions/product/getAllProducts';
import Card from 'components/Card/Card';
import Header from 'components/Header/Header';
import Loading from 'components/Loading/Loading';
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
    if (categories.allCategories.length === 0 && !categories.isFetching) {
      dispatch(fetchAllCategoriesInfo());
    }
    if (products.products.length === 0 && !products.isFetching) {
      dispatch(fetchAllProductsInfo());
    }
  }, [products, categories, dispatch]);

  useEffect(() => {
    if (categoryQuery) {
      setFilteredData(
        products.products.filter(
          (item) => item.category.title === categoryQuery
        )
      );
    } else {
      setFilteredData(products.products);
    }
  }, [categoryQuery, products]);

  const goProduct = (value) => {
    history.push(`/product/${value}`);
  };

  if (products.isFetching) {
    return <Loading />;
  }
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

              {categories.allCategories.length > 0 &&
                categories.allCategories.map((category) => (
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
