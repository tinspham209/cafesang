/* eslint-disable no-useless-escape */
export const isValidEmail = (value: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};

/* eslint-disable use-isnan */
export const isEmpty = (value: any): boolean =>
  value === undefined ||
  value === null ||
  value === NaN ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value === '') ||
  (Array.isArray(value) && value.length === 0);

type Field = 'email' | 'password' | 'text';
export const validateField = (field: Field, value: any, allowEmpty = false) => {
  if (isEmpty(value) && allowEmpty) return '';

  if (isEmpty(value) && !allowEmpty) return 'Field cannot be blank.';

  if (field === 'email' && !isValidEmail(value)) return 'Email is invalid.';

  return '';
};
export const isNumeric = (num: any) => {
  return !isNaN(num);
};
