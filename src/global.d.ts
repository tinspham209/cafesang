type AuthErrorCode =
  | 'UserNotConfirmedException'
  | 'NotAuthorizedException'
  | 'UserNotFoundException'
  | 'CodeMismatchException'
  | 'ExpiredCodeException'
  | 'LimitExceededException'
  | 'InvalidPasswordException'
  | 'UsernameExistsException';

declare type AuthError = {
  code: AuthErrorCode;
  name: string;
  message: string;
};

declare interface Error {
  name: string;
  message: string;
  details?: string;
  stack?: string;
}
