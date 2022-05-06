import { push } from 'connected-react-router';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Navigator, Toastify, TokenService, UserService } from 'src/services';
import { Apis } from 'src/services/api';
import navigator from 'src/services/navigator';
import { isEmpty } from 'src/validations';
import { SOMETHING_WENT_WRONG } from '../commonSagas/toastifyFailureSaga';
import { PATHS } from './../../appConfig/paths';
import { changePasswordAsync, exchangeTokenAsync, signInAsync, signOutAsync, signUpAsync } from './actions';
import { User } from './types';
// import { callApi } from '../commonSagas/callApi';

// function* getDataWithoutParams(api, asyncActionCreator) {
//   yield call(callApi, api, {
//     asyncAction: asyncActionCreator,
//     onFailure: toastifyErrorSaga,
//   });
// }

// function* searchFilters(api, asyncActionCreator, { payload: params }: any) {
//   yield call(
//     callApi,
//     api,
//     {
//       asyncAction: asyncActionCreator,
//       onFailure: toastifyErrorSaga,
//     },
//     params,
//   );
// }

function* signIn(apiInstance, { payload: params }: ReturnType<typeof signInAsync.request>) {
  try {
    const response = yield call(apiInstance, params);
    const authData: User = response.user;
    if (!isEmpty(authData)) {
      const token = authData.refreshToken;
      UserService.setLocalUser(authData);
      TokenService.setToken(token);
      yield put(signInAsync.success(authData));
      Toastify.success('Đăng nhập thành công');
      Navigator.navigate(PATHS.home);
    } else {
      yield put(signInAsync.failure(new Error(SOMETHING_WENT_WRONG)));
    }
  } catch (err) {
    console.error('err: ', err);
    yield put(signInAsync.failure(err));
  }
}

function* signUp(apiInstance, { payload: params }: ReturnType<typeof signUpAsync.request>) {
  try {
    const response = yield call(apiInstance, params);
    const authData: User = response.user;
    if (!isEmpty(authData)) {
      const token = authData.refreshToken;
      UserService.setLocalUser(authData);
      TokenService.setToken(token);
      yield put(signUpAsync.success(authData));
      Toastify.success('Đăng ký thành công');

      Navigator.navigate(PATHS.home);
    } else {
      yield put(signUpAsync.failure(new Error(SOMETHING_WENT_WRONG)));
    }
  } catch (err) {
    console.error('err: ', err);
    yield put(signUpAsync.failure(err));
  }
}

function* checkValidToken(api, { payload: params }: ReturnType<typeof exchangeTokenAsync.request>) {
  try {
    const user = UserService.getLocalUser();
    if (user) {
      yield put(exchangeTokenAsync.success(user));

      return;
    } else {
      yield put(exchangeTokenAsync.failure(new Error(SOMETHING_WENT_WRONG)));
      yield put(push(PATHS.signIn));
    }
  } catch (err) {
    console.error('err: ', err);
    yield put(exchangeTokenAsync.failure(new Error(err || SOMETHING_WENT_WRONG)));
    yield put(push(PATHS.signIn));
  }
}

function* signOut() {
  TokenService.clearToken();
  navigator.navigate(PATHS.signIn);
  UserService.clearLocalUser();
  yield all([yield put(signOutAsync.success())]);
}

function* changePassword(apiInstance, { payload: params }: ReturnType<typeof changePasswordAsync.request>) {
  try {
    yield call(apiInstance, params);
    yield put(changePasswordAsync.success());
    Toastify.success('Thay đổi mật khẩu thành công');
  } catch (error) {
    console.error('err: ', error);
    yield put(changePasswordAsync.failure(new Error(error || SOMETHING_WENT_WRONG)));
  }
}

export default function authSaga(apiInstance: Apis) {
  return [
    takeLatest(signInAsync.request, signIn, apiInstance.signIn),
    takeLatest(signUpAsync.request, signUp, apiInstance.signUp),
    takeLatest(changePasswordAsync.request, changePassword, apiInstance.changePassword),
    // getDataWithoutParams
    takeLatest(exchangeTokenAsync.request, checkValidToken, apiInstance.exchangeToken),
    takeLatest(signOutAsync.request, signOut),
  ];
}
