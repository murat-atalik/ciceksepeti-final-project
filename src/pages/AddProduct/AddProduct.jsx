/* eslint-disable jsx-a11y/label-has-associated-control */
import './addProduct.scss';

import { fetchAllBrandsInfo } from 'actions/brand/getAllBrands';
import { fetchAllCategoriesInfo } from 'actions/category/getAllCategories';
import { fetchAllColorsInfo } from 'actions/color/allColors';
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
  const allCategories = useSelector((state) => state.allCategories);
  const allColors = useSelector((state) => state.allColors);
  const allBrands = useSelector((state) => state.allBrands);
  const allStatus = useSelector((state) => state.allStatus);
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

  const closeAllList = () => setToggleList(defaultToggle);
  const closeOtherList = (list) => setToggleList({ ...defaultToggle, ...list });
  const setForm = (value) => setProductAdd({ ...productAdd, ...value });
  const callback = (value) => {
    console.log('asdasd :>> ', value);
  };
  const { handleSubmit, errors } = useValidation(
    callback,
    validation,
    productAdd
  );
  return (
    <>
      <Header />
      <pre>{JSON.stringify(errors, undefined, 2)}</pre>
      <div className="add-product">
        <div className="add-product-container">
          <div className="add-product-container-left">
            <h2>Ürün Detayları</h2>

            <div className="product-title-container">
              <label className="product-name-label" htmlFor="product-input">
                Ürün Adı
              </label>
              <Input
                theme={errors.titleErr ? 'warning' : 'primary'}
                className="product-name-input"
                type="text"
                name="title"
                placeholder="Örnek: Iphone 12 Pro Max"
                id="product-input"
                onClick={closeAllList}
                value={productAdd.title}
                onChange={(e) => {
                  setForm({
                    title: e.target.value,
                  });
                }}
              />
            </div>

            <TextArea
              id="description"
              title="Açıklama"
              value={productAdd.description}
              placeholder="Ürün açıklaması girin"
              setValue={(value) => setForm({ description: value })}
              onClick={closeAllList}
              onChange={(e) => {
                setForm({
                  description: e.target.value,
                });
              }}
              theme={errors.descriptionErr}
            />
            <div className="list-box-conatiner">
              <ListBox
                list={allColors.allColors}
                title="Renk"
                body="Renk seç"
                selected={productAdd.color}
                setSelected={(value) => setForm({ color: value })}
                toggle={toggleList.colors}
                setToggle={(value) => closeOtherList({ colors: value })}
                theme={errors.colorErr ? 'warning' : 'primary'}
              />
              <ListBox
                list={allStatus.allStatus}
                title="Kullanım durumu"
                body="Kullanım durumu seç"
                selected={productAdd.status}
                setSelected={(value) => setForm({ status: value })}
                toggle={toggleList.status}
                setToggle={(value) => closeOtherList({ status: value })}
                theme={errors.statusErr ? 'warning' : 'primary'}
              />
              <ListBox
                list={allCategories.allCategories}
                title="Kategori"
                body="Kategori seç"
                selected={productAdd.category}
                setSelected={(value) => setForm({ category: value })}
                toggle={toggleList.categories}
                setToggle={(value) => closeOtherList({ categories: value })}
                theme={errors.categoryErr ? 'warning' : 'primary'}
              />
              <ListBox
                list={allBrands.allBrands}
                title="Marka"
                body="Marka seç"
                selected={productAdd.brand}
                setSelected={(value) => setForm({ brand: value })}
                toggle={toggleList.brands}
                setToggle={(value) => closeOtherList({ brands: value })}
                theme={errors.brandErr ? 'warning' : 'primary'}
              />
            </div>
            <div className="product-price-container">
              <label className="product-price-label" htmlFor="product-price">
                Fiyat
              </label>
              <Input
                theme={errors.priceErr ? 'warning' : 'primary'}
                className="product-price-input"
                type="text"
                name="price"
                placeholder="Bir fiyat girin"
                id="product-price"
                onClick={closeAllList}
                value={productAdd.price === 0 ? '' : productAdd.price}
                onChange={(e) => {
                  setForm({
                    price: e.target.value,
                  });
                }}
              />
            </div>
            <div className="product-offerable-container">
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
            <h2>Ürün Görseli</h2>
            <UploadImage warn={errors.imageUrlErr ? 'true' : 'false'} />
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
