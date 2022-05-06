import { Toastify } from '.';

export const TYPES = {
  NotAuthorizedException: 'NotAuthorizedException',
  UserNotFoundException: 'UserNotFoundException',
  UserNotConfirmedException: 'UserNotConfirmedException',
  CodeMismatchException: 'CodeMismatchException',
  ExpiredCodeException: 'ExpiredCodeException',
  LimitExceededException: 'LimitExceededException',
  InvalidPasswordException: 'InvalidPasswordException',
};

const MESSAGES = {
  invalidEmail: 'Email is invalid.',
  invalidPhone: 'Phone number is invalid.',
  unknown: 'An error has occurred.',
  required: 'Field cannot be blank.',
  accountNotExist: 'Username does not exist.',
  incorrectAccount: 'Incorrect username or password.',
  notAuthorizedUser: 'You are not authorized to perform this action.',
  yesNoRequired: 'Please select.',
};

const handler = (error: AuthError | Error) => {
  console.error(error);
  Toastify.error(error?.message || MESSAGES.unknown);
};

export default {
  handler,
  MESSAGES,
  TYPES,
};
