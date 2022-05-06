import { Toastify } from 'src/services';

const defaultApiErrorMessage = 'Something went wrong!';
export const SOMETHING_WENT_WRONG = 'Something went wrong!';

export function toastifyError(response: any, context?: string) {
  const message = response?.data?.details || response?.data?.message || defaultApiErrorMessage;
  Toastify.error(`${context ? `${context}: ` : ''}${message}`);
}

// eslint-disable-next-line require-yield
export function* toastifyErrorSaga(response: any, context?: string) {
  toastifyError(response, context);
}
