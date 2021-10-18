/* eslint-disable prefer-const */
export default function offerHelper(values) {
  let errors = {};
  if (typeof values.offeredPrice !== 'number') {
    errors.offeredPrice = 'Geçersiz teklif sadece rakam giriniz!';
  } else if (!values.offeredPrice) {
    errors.offeredPrice = 'Geçerli bir teklif giriniz!';
  }
  return errors;
}
