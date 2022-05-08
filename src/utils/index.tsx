import { CancelToken } from 'apisauce';
import cn from 'classnames';
import Compressor from 'compressorjs';
import _ from 'lodash';
import moment from 'moment';
import { parse } from 'qs';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import shortid from 'shortid';
import appConfig from 'src/appConfig';
import { ErrorService } from 'src/services';
import { isEmpty } from 'src/validations';

export function newCancelToken(timeout = appConfig.CONNECTION_TIMEOUT) {
  const source = CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, timeout);

  return { cancelToken: source.token };
}

export const getRandomId = (): string => shortid.generate();

export const generateArray = (length: number, initial = '') => Array(length).fill(initial);

export const stringify = (params: { [key: string]: number | boolean | string | string[] }) => {
  let result = '';

  Object.keys(params).forEach(key => {
    if (!isEmpty(params[key])) {
      if (Array.isArray(params[key])) {
        let array = params[key] as string[];
        array.forEach((param: string) => {
          result += `&${key}=${encodeURIComponent(param)}`;
        });
      } else {
        result += `&${key}=${encodeURIComponent(params[key].toString())}`;
      }
    }
  });

  result = result.replace(/^&/, '');

  return result;
};

export const formatPhoneNumber = (mobile: string) => {
  if (!mobile) return '';
  try {
    return formatPhoneNumberIntl(mobile);
  } catch (error) {
    return '';
  }
};

export const formatDate = (value: string | Date, format: string = 'MM/DD/YYYY') => {
  if (!value) return '';

  return moment(value).format(format);
};

export const convertIsoDateToDateFormat = (value: string, format: string = 'MM/DD/YYYY') => {
  if (!value) return '';
  const date = value.substring(0, 10); //2022-01-07T10:00:00.000Z >> 2022-01-07
  return moment(date, 'YYYY-MM-DD').format(format);
};

export const formatTime = (value: string | Date, format: string = 'h:mm A') => {
  if (!value) return '';

  return moment(value).format(format);
};

export const getDateFromTime = (value: string) => {
  if (!value) return null;

  return moment(value, 'HH:mm').toDate();
};

export const getDaysBetween = (from: string | Date, to: string | Date) => {
  return moment(to).startOf('day').diff(moment(from).startOf('day'), 'days');
};

export const getYesNo = (value: boolean, highLightValue = 'YES') => {
  if (isEmpty(value)) return '';
  const result = value ? 'YES' : 'NO';
  const isHighLight = highLightValue === result;
  return <span className={cn({ 'has-text-danger': isHighLight })}>{result}</span>;
};

export const getYesNoText = (value: boolean) => {
  switch (value) {
    case true:
      return 'Yes';
    case false:
      return 'No';
    default:
      return '';
  }
};

export const getYesNoOrNullText = (value: boolean) => {
  switch (value) {
    case true:
      return 'Yes';
    case false:
      return 'No';
    case null:
      return 'Unknown';
    default:
      return '';
  }
};

export const formatMoney = (value: number) =>
  value
    .toLocaleString('de-DE', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })
    .replace(/\./g, ',');

export const formatMoneyInput = (value: number) => {
  if (!value) return '';
  return value.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });
};
export const hourDateFormat = 'h:mm:ss a, MMMM DD, YYYY';
export const monthFormat = 'MMMM DD, YYYY';

export const emptyFunction = () => {};
export const lockupValueByLabel = (label: string, options: Array<{ value: number | string; label: string }>) => {
  return options.find(item => item.label === label)?.value || null;
};

export const getOrdinalNumber = num => {
  var array = ('' + num).split('').reverse(); // E.g. 123 = array("3","2","1")

  if (array[1] !== '1') {
    // Number is in the teens
    switch (array[0]) {
      case '1':
        return '1st';
      case '2':
        return '2nd';
      case '3':
        return '3rd';
    }
  }

  return num + 'th';
};
export const isURLImage = (url: string) => {
  const hasExtensionImage = ['.png', '.jpeg', '.jpg'].some(ext => url?.includes(ext));

  if (hasExtensionImage) {
    return true;
  }

  const state = parse(url?.split('?')[1], { ignoreQueryPrefix: false });
  const contentType = state?.['Content-Type'];
  const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(contentType as string);

  return isImage;
};

export const compressFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(file?.type);

    if (isImage) {
      new Compressor(file, {
        quality: 0.7,
        maxWidth: 900,
        maxHeight: 900,
        convertSize: 0,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    } else {
      resolve(file);
    }
  });
};

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime });
};

export const deepKeys = (t, path = []) => {
  const res =
    Object(t) === t
      ? Object.entries(t) // 1
          .flatMap(([k, v]) => deepKeys(v, [...path, k]))
      : [path.join('.')]; // 2
  return res?.filter(x => !/\d$/.test(x));
};

export const scrollToTopError = (error: string[]) => {
  if (!isEmpty(error)) {
    const input = document?.querySelector(`[name='${error[0]}']`);
    input?.parentElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    });
  }
};

export const downloadBlob = (buffer: Buffer, fileName: string = 'directive_form.pdf') => {
  const blob = new Blob([buffer]);
  const url = window.URL.createObjectURL(new Blob([blob]));
  var element = document.createElement('a');
  element.href = url;
  element.setAttribute('download', fileName);
  document.body.appendChild(element);
  element.click();
  element.parentNode.removeChild(element);
};

export const setQueryParam = (name, value, query, history) => {
  if (value) {
    query.set(name, value);
  } else {
    query.delete(name);
  }
  history.push({ search: query.toString() });
};

export const getNameDisplay = (firstName: string, lastName: string): string => {
  return [firstName, lastName].join(' ').trim();
};

export const getErrorMessageSignin = (msg: string) => {
  switch (msg) {
    case 'There is no user record corresponding to this identifier. The user may have been deleted.':
      return ErrorService.MESSAGES.accountNotExist;
    case 'The email address is already in use by another account.':
      return 'Email đã được đăng ký. Vui lòng thay đổi email khác.';
    case 'The password is invalid or the user does not have a password.':
      return ErrorService.MESSAGES.incorrectAccount;
    default:
      return msg;
  }
};

export const getTitleCase = (str: string): string => {
  return _.startCase(_.toLower(str));
};
