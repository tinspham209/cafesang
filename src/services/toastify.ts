import { toast, ToastOptions } from 'react-toastify';

const error = (error?: string, options?: ToastOptions) => {
  console.log('errorHandler', error);
  toast.error(error ? error : 'An error has occured. Please check your data and try again.', options);
};

const success = (message: string) => {
  toast.success(message);
};

const warning = (message: string) => {
  console.log('warningHandler', message);
  toast.warning(message);
};

export default {
  error,
  success,
  warning,
};
