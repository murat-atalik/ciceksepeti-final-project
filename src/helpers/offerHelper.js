/* eslint-disable prefer-const */
export default function offerHelper(values) {
  let errors = {};
  if (typeof values.offeredPrice !== 'number') {
    errors.offeredPriceErr = true;
    errors.offeredPriceMsg = 'Geçersiz teklif sadece rakam giriniz!';
  } else if (!values.offeredPrice) {
    errors.offeredPriceErr = true;
    errors.offeredPriceMsg = 'Geçerli bir teklif giriniz!';
  }
  return errors;
}
