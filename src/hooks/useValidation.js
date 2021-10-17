import { useEffect, useState } from 'react';

const useValidation = (callback, validate, values) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = () => {
    setIsSubmitting(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [callback, errors, isSubmitting, values]);

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
  };
};

export default useValidation;
