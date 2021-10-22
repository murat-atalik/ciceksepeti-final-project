/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-const */
export default function validationHelper(values) {
  let errors = {};
  if (!values.title && values.title.length === 0) {
    errors.titleErr = true;
    errors.titleMsg = 'Ürün Adı Alanı Zorunlu!';
  } else if (values.title.length > 100) {
    errors.titleErr = true;
    errors.titleMsg = 'Ürün Adı Alanı Maximum 100 karakter Uzunluğunda Olmalı!';
  }

  if (!values.description && values.description.length === 0) {
    errors.descriptionErr = true;
    errors.descriptionMsg = 'Açıklama Alanı Zorunlu!';
  } else if (values.description.length > 500) {
    errors.descriptionErr = true;
    errors.descriptionMsg =
      'Açıklama Alanı Maximum 500 Karakter Uzunluğunda Olmalı!';
  }
  if (!values.imageUrl && values.imageUrl.length === 0) {
    errors.imageUrlErr = true;
    errors.imageUrlMsg = 'Ürün Görseli Alanı Zorunlu!';
  }
  if (!values.price || isNaN(values.price)) {
    errors.priceErr = true;
    errors.priceMsg = '0-9 Arasında Bir Rakam Girin';
  } else if (values.price <= 0) {
    errors.priceErr = true;
    errors.priceMsg = `Ürün Fiyatı 0'dan Büyük Olmalı`;
  }
  if (!values.brand.title && values.brand.title.length === 0) {
    errors.brandErr = true;
    errors.brandMsg = 'Marka Alanı Zorunlu!';
  }
  if (!values.color.title && values.color.title.length === 0) {
    errors.colorErr = true;
    errors.colorMsg = 'Renk Alanı Zorunlu!';
  }
  if (!values.status.title && values.status.title.length === 0) {
    errors.statusErr = true;
    errors.statusMsg = 'Kullanım Durumu Alanı Zorunlu!';
  }
  if (!values.category.title && values.category.title.length === 0) {
    errors.categoryErr = true;
    errors.categoryMsg = 'Kategori Alanı Zorunlu!';
  }
  return errors;
}
