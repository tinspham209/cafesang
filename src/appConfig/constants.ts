export const MAJOR_VERSION_NUMBER = 1;
export const MINOR_VERSION_NUMBER = 0;
export const VERSION_NUMBER = `${MAJOR_VERSION_NUMBER}.${MINOR_VERSION_NUMBER}.${
  process.env.REACT_APP_BUILD_NUMBER || 0
}`;

export const MODAL_WIDTH = 560;

export const ROW_HIGHLIGHT_IN_MS = 3000;

export const SYMPTOMS = [
  'Cough',
  'Muscle or body aches',
  'Sore throat',
  'Fever or chills',
  'Fatigue',
  'New loss of taste or smell',
  'Shortness of breath or difficulty breathing',
  'Headache',
  'Congestion or runny nose',
  'Nausea or vomiting',
  'Diarrhea',
];

export const AS_ADDRESS = 1;
export const US_ID = 233;
export const SAMOA_STATE_ID = 4;
export const SAMOA_ZIP = '96799';
export const SAMOA_CITY = 'Pago Pago';
export const ADDRESS_TYPE_US_ID = 2;
export const ADDRESS_TYPE_INTERNATIONAL_ID = 3;
export const URL_SPLITTER = '|';

export const TAB_FILTER = 'tabFilter';

export const MFA_TYPE = {
  NOMFA: 'NOMFA',
  TOTP: 'TOTP',
  SMS: 'SMS',
};

export const MFA_CONSTANT = {
  SOFTWARE_TOKEN_MFA: 'SOFTWARE_TOKEN_MFA',
};

export const COLOR_CODE = {
  PRIMARY: '#f05122',
  SECONDARY: '#337ab7',
  SUCCESS: '#3dbc59',
  WARNING: '#f4762f',
  DANGER: '#ee2d2d',
};
