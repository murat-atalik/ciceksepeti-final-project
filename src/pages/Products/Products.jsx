/* eslint-disable no-unused-vars */
import './products.scss';

import { fetchAllCategoriesInfo } from 'actions/category/getAllCategories';
import { fetchAllProductsInfo } from 'actions/product/getAllProducts';
import banner from 'assests/Banner1.png';
import Card from 'components/Card/Card';
import Header from 'components/Header/Header';
import Loading from 'components/Loading/Loading';
import Paginate from 'components/Paginate/Paginate';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function Products() {
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.allCategories);
  const products = useSelector((state) => state.allProducts);
  const params = new URLSearchParams(window.location.search);
  const categoryQuery = params.get('category');
  const pageQuerry = params.get('page');

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 20;
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    if (categories.allCategories.length === 0 && !categories.isFetching) {
      dispatch(fetchAllCategoriesInfo());
    }
    if (products.products.length === 0 && !products.isFetching) {
      dispatch(fetchAllProductsInfo());
    }
  }, [products, categories, dispatch]);

  useEffect(() => {
    const maxPageCount = Math.ceil(
      products.products.filter((item) => item.category.title === categoryQuery)
        .length / postPerPage
    );
    if (categoryQuery) {
      setFilteredData(
        products.products.filter(
          (item) => item.category.title === categoryQuery
        )
      );
      setMaxPage(maxPageCount);
      setCurrentPage(
        Number(pageQuerry) <= maxPageCount && Number(pageQuerry) !== 0
          ? Number(pageQuerry)
          : 1
      );
    } else {
      setFilteredData(products.products);
      setMaxPage(Math.ceil(products.products.length / postPerPage));
    }
  }, [categoryQuery, filteredData.length, maxPage, pageQuerry, products]);

  useEffect(() => {
    setCurrentPage(Number(pageQuerry) !== 0 ? Number(pageQuerry) : 1);
  }, [pageQuerry]);

  const goProduct = (value) => {
    history.push(`/product/${value}`);
  };
  if (products.isFetching) {
    return <Loading />;
  }
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const currentPost = filteredData.slice(indexOfFirst, indexOfLast);
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
              currentPost.map((product) => (
                <Card key={product.id} product={product} callback={goProduct} />
              ))}
          </div>
        </div>
        {filteredData.length > 0 && (
          <Paginate
            pages={maxPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            params={params}
          />
        )}
      </div>
    </>
  );
}

export default Products;
