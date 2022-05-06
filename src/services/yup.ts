import { isValidPhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup';
import { ErrorService } from '.';

yup.setLocale({
  mixed: {
    required: ErrorService.MESSAGES.required,
  },
  string: {
    email: ErrorService.MESSAGES.invalidEmail,
  },
});

declare module 'yup' {
  interface StringSchema {
    phone(): StringSchema;
  }
}

yup.addMethod<yup.StringSchema>(yup.string, 'phone', function (message) {
  return this.test('isValidPhone', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    if (!isValidPhoneNumber(value)) {
      return createError({
        path,
        message: message ?? ErrorService.MESSAGES.invalidPhone,
      });
    }

    return true;
  });
});

export default yup;
