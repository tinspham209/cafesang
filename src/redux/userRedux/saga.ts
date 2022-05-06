import { call, put, takeLatest } from 'redux-saga/effects';
import { Apis } from 'src/services/api';
import { toastifyErrorSaga } from '../commonSagas/toastifyFailureSaga';
import { getUserInfoAsync } from './actions';

// function* getDataWithoutParams(api, asyncActionCreator) {
//   yield call(callApi, api, {
//     asyncAction: asyncActionCreator,
//     onFailure: toastifyErrorSaga,
//   });
// }

function* getUserInfo(api, { payload: params }: any) {
  const response = yield call(api, params);
  try {
    yield put(getUserInfoAsync.success(response));
  } catch (error) {
    yield toastifyErrorSaga(error);
  }
}

export default function authSaga(apiInstance: Apis) {
  return [takeLatest(getUserInfoAsync.request, getUserInfo, apiInstance.getUserInfo)];
}
