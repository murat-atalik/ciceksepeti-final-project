/* eslint-disable jsx-a11y/label-has-associated-control */
import './addProduct.scss';

import { fetchAllBrandsInfo } from 'actions/brand/getAllBrands';
import { fetchAllCategoriesInfo } from 'actions/category/getAllCategories';
import { fetchAllColorsInfo } from 'actions/color/allColors';
import {
  fetchCreateProductInfo,
  redirectProduct,
} from 'actions/product/createProduct';
import { fetchAllStatusesInfo } from 'actions/status/allStatus';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import Input from 'components/Input/Input';
import ListBox from 'components/ListBox/ListBox';
import TextArea from 'components/Textarea/TextArea';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import UploadImage from 'components/UploadImage/UploadImage';
import validation from 'helpers/addProductValidation';
import useValidation from 'hooks/useValidation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const defaultToggle = {
  colors: false,
  categories: false,
  status: false,
  brands: false,
};
const defaultProduct = {
  price: 0,
  imageUrl: '',
  title: '',
  status: {
    title: '',
    id: '',
  },
  color: {
    title: '',
    id: '',
  },
  brand: {
    title: '',
    id: '',
  },
  category: {
    title: '',
    id: '',
  },
  description: '',
  isOfferable: false,
};
function AddProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allCategories = useSelector((state) => state.allCategories);
  const allColors = useSelector((state) => state.allColors);
  const allBrands = useSelector((state) => state.allBrands);
  const allStatus = useSelector((state) => state.allStatus);
  const product = useSelector((state) => state.createProduct);
  const [toggleList, setToggleList] = useState(defaultToggle);
  const [productAdd, setProductAdd] = useState(defaultProduct);
  useEffect(() => {
    if (allCategories.allCategories.length === 0 && !allCategories.isFetching) {
      dispatch(fetchAllCategoriesInfo());
    }
    if (allColors.allColors.length === 0 && !allColors.isFetching) {
      dispatch(fetchAllColorsInfo());
    }
    if (allBrands.allBrands.length === 0 && !allBrands.isFetching) {
      dispatch(fetchAllBrandsInfo());
    }
    if (allStatus.allStatus.length === 0 && !allStatus.isFetching) {
      dispatch(fetchAllStatusesInfo());
    }
  }, [allBrands, allCategories, allColors, allStatus, dispatch]);

  useEffect(() => {
    if (product.isProductCreated) {
      history.push(`/product/${product.product.id}`);
      dispatch(redirectProduct());
    }
  }, [dispatch, history, product.isProductCreated, product.product.id]);

  const closeAllList = () => setToggleList(defaultToggle);
  const closeOtherList = (list) => setToggleList({ ...defaultToggle, ...list });
  const setForm = (value) => setProductAdd({ ...productAdd, ...value });
  const callback = (value) => {
    dispatch(fetchCreateProductInfo(value));
  };
  const { handleSubmit, errors } = useValidation(
    callback,
    validation,
    productAdd
  );
  return (
    <>
      <Header />
      <div className="add-product">
        <div className="add-product-container">
          <div className="add-product-container-left">
            <h2>??r??n Detaylar??</h2>

            <div className="product-title-container">
              <label className="product-name-label" htmlFor="product-input">
                ??r??n Ad??
              </label>
              <Input
                theme={errors.titleErr ? 'warning' : 'primary'}
                className="product-name-input"
                type="text"
                name="title"
                placeholder="??rnek: Iphone 12 Pro Max"
                id="product-input"
                onClick={closeAllList}
                value={productAdd.title}
                onChange={(e) => {
                  setForm({
                    title: e.target.value,
                  });
                }}
              />
              <span>{errors.titleMsg}</span>
            </div>

            <div className="product-description-container">
              <TextArea
                id="description"
                title="A????klama"
                value={productAdd.description}
                placeholder="??r??n a????klamas?? girin"
                setValue={(value) => setForm({ description: value })}
                onClick={closeAllList}
                onChange={(e) => {
                  setForm({
                    description: e.target.value,
                  });
                }}
                theme={errors.descriptionErr}
              />
              <span>{errors.descriptionMsg}</span>
            </div>
            <div className="list-box-container">
              <div className="list-box-container-category">
                <ListBox
                  list={allCategories.allCategories}
                  title="Kategori"
                  body="Kategori se??"
                  selected={productAdd.category}
                  setSelected={(value) => setForm({ category: value })}
                  toggle={toggleList.categories}
                  setToggle={(value) => closeOtherList({ categories: value })}
                  theme={errors.categoryErr ? 'warning' : 'primary'}
                  closeAllList={closeAllList}
                />
                <span>{errors.categoryMsg}</span>
              </div>
              <div className="list-box-container-brand">
                <ListBox
                  list={allBrands.allBrands}
                  title="Marka"
                  body="Marka se??"
                  selected={productAdd.brand}
                  setSelected={(value) => setForm({ brand: value })}
                  toggle={toggleList.brands}
                  setToggle={(value) => closeOtherList({ brands: value })}
                  theme={errors.brandErr ? 'warning' : 'primary'}
                  closeAllList={closeAllList}
                />
                <span>{errors.brandMsg}</span>
              </div>
              <div className="list-box-container-color">
                <ListBox
                  list={allColors.allColors}
                  title="Renk"
                  body="Renk se??"
                  selected={productAdd.color}
                  setSelected={(value) => setForm({ color: value })}
                  toggle={toggleList.colors}
                  setToggle={(value) => closeOtherList({ colors: value })}
                  theme={errors.colorErr ? 'warning' : 'primary'}
                  closeAllList={closeAllList}
                />
                <span>{errors.colorMsg}</span>
              </div>
              <div className="list-box-container-status">
                <ListBox
                  list={allStatus.allStatus}
                  title="Kullan??m durumu"
                  body="Kullan??m durumu se??"
                  selected={productAdd.status}
                  setSelected={(value) => setForm({ status: value })}
                  toggle={toggleList.status}
                  setToggle={(value) => closeOtherList({ status: value })}
                  theme={errors.statusErr ? 'warning' : 'primary'}
                  closeAllList={closeAllList}
                />
                <span>{errors.statusMsg}</span>
              </div>
            </div>
            <div className="product-price-container">
              <label className="product-price-label" htmlFor="product-price">
                Fiyat
              </label>
              <Input
                theme={errors.priceErr ? 'warning' : 'primary'}
                className="product-price-input"
                type="number"
                name="price"
                placeholder="Bir fiyat girin"
                id="product-price"
                onClick={closeAllList}
                value={productAdd.price === 0 ? '' : productAdd.price}
                onChange={(e) => {
                  setForm({
                    price: Number(e.target.value),
                  });
                }}
              />
              <p className="add-product-price">TL</p>
              <span>{errors.priceMsg}</span>
            </div>
            <div
              className="product-offerable-container"
              onClick={closeAllList}
              aria-hidden
            >
              <ToggleSwitch
                toggle={productAdd.isOfferable}
                switchToggle={(value) => setForm({ isOfferable: value })}
              />
            </div>
          </div>
          <hr className="container-brace" />
          <div
            className="add-product-container-right"
            onClick={closeAllList}
            aria-hidden
          >
            <h2>??r??n G??rseli</h2>
            <UploadImage
              imageUrlErr={errors.imageUrlErr}
              imageUrlMsg={errors.imageUrlMsg}
              setSelected={(value) => setForm({ imageUrl: value })}
              value={productAdd.imageUrl}
            />
          </div>
          <div className="add-product-container-bottom">
            <Button onClick={handleSubmit}>Kaydet</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
