/* eslint-disable jsx-a11y/label-has-associated-control */
import './addProduct.scss';

import { fetchAllBrandsInfo } from 'actions/brand/getAllBrands';
import { fetchAllCategoriesInfo } from 'actions/category/getAllCategories';
import { fetchAllColorsInfo } from 'actions/color/allColors';
import { fetchAllStatusesInfo } from 'actions/status/allStatus';
import Header from 'components/Header/Header';
import Input from 'components/Input/Input';
import ListBox from 'components/ListBox/ListBox';
import TextArea from 'components/Textarea/TextArea';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddProduct() {
  const [toggle, setToggle] = useState(false);
  const allCategories = useSelector((state) => state.allCategories);
  const allColors = useSelector((state) => state.allColors);
  const allBrands = useSelector((state) => state.allBrands);
  const allStatus = useSelector((state) => state.allStatus);

  const dispatch = useDispatch();
  const switchToggle = () => {
    setToggle(!toggle);
  };

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

  const [myColor, setmyColor] = useState({
    id: '',
    title: '',
  });
  const [toggleColors, setToggleColors] = useState(false);
  const [toggleCategories, setToggleCategories] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [toggleBrands, setToggleBrands] = useState(false);
  const [teaxtArea, setteaxtArea] = useState('');
  const log = (item) => {
    setmyColor(item);
  };
  const closeAllList = () => {
    setToggleColors(false);
    setToggleCategories(false);
    setToggleStatus(false);
    setToggleBrands(false);
  };

  const closeOtherList = (list) => {
    setToggleColors(false);
    setToggleCategories(false);
    setToggleStatus(false);
    setToggleBrands(false);
    if (list === 'categories') {
      setToggleCategories(true);
    }
    if (list === 'colors') {
      setToggleColors(true);
    }
    if (list === 'status') {
      setToggleStatus(true);
    }
    if (list === 'brands') {
      setToggleBrands(true);
    }
  };

  return (
    <>
      <Header />
      <div className="add-product">
        <div className="add-product-container">
          <div className="add-product-container-left">
            <h2>Ürün Detayları</h2>

            <div className="product-title-container">
              <label className="product-name-label" htmlFor="product-input">
                Ürün Adı
              </label>
              <Input
                className="product-name-input"
                type="text"
                name="title"
                placeholder="Örnek: Iphone 12 Pro Max"
                id="product-input"
                onClick={closeAllList}
              />
            </div>

            <TextArea
              id="description"
              title="Açıklama"
              value={teaxtArea}
              placeholder="Ürün açıklaması girin"
              setValue={setteaxtArea}
              onClick={closeAllList}
            />
            <div className="list-box-conatiner">
              <ListBox
                list={allColors.allColors}
                title="Renk"
                body="Renk seç"
                selected={myColor}
                setSelected={log}
                toggle={toggleColors}
                setToggle={setToggleColors}
                name="colors"
                closeOtherList={closeOtherList}
                theme="warning"
              />
              <ListBox
                list={allStatus.allStatus}
                title="Kullanım durumu"
                body="Kullanım durumu seç"
                selected={myColor}
                setSelected={log}
                toggle={toggleStatus}
                setToggle={setToggleStatus}
                name="status"
                closeOtherList={closeOtherList}
                theme="primary"
              />
              <ListBox
                list={allCategories.allCategories}
                title="Kategori"
                body="Kategori seç"
                selected={myColor}
                setSelected={log}
                toggle={toggleCategories}
                setToggle={setToggleCategories}
                name="categories"
                closeOtherList={closeOtherList}
                theme="primary"
              />
              <ListBox
                list={allBrands.allBrands}
                title="Marka"
                body="Marka seç"
                selected={myColor}
                setSelected={log}
                toggle={toggleBrands}
                setToggle={setToggleBrands}
                name="brands"
                closeOtherList={closeOtherList}
                theme="primary"
              />
            </div>
            <div className="product-price-container">
              <label className="product-price-label" htmlFor="product-price">
                Fiyat
              </label>
              <Input
                className="product-price-input"
                type="text"
                name="price"
                placeholder="Bir fiyat girin"
                id="product-price"
                onClick={closeAllList}
              />
            </div>
            <div className="product-offerable-container">
              <ToggleSwitch toggle={toggle} switchToggle={switchToggle} />
            </div>
          </div>
          <hr className="container-brace" />
          <div className="add-product-container-right">
            <h2>Ürün Görseli</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
