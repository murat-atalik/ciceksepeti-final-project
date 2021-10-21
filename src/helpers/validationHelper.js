/* eslint-disable prefer-const */
export default function validationHelper(values) {
  let errors = {};
  if (!values.email && values.email.length === 0) {
    errors.emailErr = true;
    errors.emailMsg = 'Email adresi gerekli!';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.emailErr = true;
    errors.emailMsg = 'Geçersiz email adresi!';
  }
  if (!values.password && values.password.length === 0) {
    errors.passwordErr = true;
    errors.passwordMsg = 'Şifre gerekli!';
  } else if (values.password.length < 8) {
    errors.passwordErr = true;
    errors.passwordMsg = 'Şifre en az 8  karakter uzunluğunda olmalı!!';
  } else if (values.password.length > 20) {
    errors.passwordErr = true;
    errors.passwordMsg = 'Şifre en fazla 20 karakter uzunluğunda olmalı!';
  }

  return errors;
}
