import { all } from 'redux-saga/effects';
import { API } from './../services';
/* ------------- Sagas ------------- */
import authSaga from './authRedux/saga';
import ordersSaga from './ordersRedux/saga';
import userSaga from './userRedux/saga';

/* ------------- API ------------- */
const withMockApis = process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_API;
const apiInstance = API.create();

const api = withMockApis
  ? {
      ...apiInstance,
      // OVERWRITE
      ...require('../services/__mocks__/mocks').default,
    }
  : apiInstance;

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([...authSaga(api), ...userSaga(api), ...ordersSaga(api)]);
}
