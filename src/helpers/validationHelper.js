/* eslint-disable prefer-const */
export default function validationHelper(values) {
  let errors = {};
  if (!values.email && values.email.length === 0) {
    errors.email = 'Email adresi gerekli!';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Geçersiz email adresi!';
  }
  if (!values.password && values.password.length === 0) {
    errors.password = 'Şifre gerekli!';
  } else if (values.password.length < 8) {
    errors.password = 'Şifre en az 8  karakter uzunluğunda olmalı!!';
  } else if (values.password.length > 20) {
    errors.password = 'Şifre en fazla 20 karakter uzunluğunda olmalı!';
  }

  return errors;
}
