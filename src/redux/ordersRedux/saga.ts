import { call, put, takeLatest } from 'redux-saga/effects';
import { Toastify } from 'src/services';
import { Apis } from 'src/services/api';
import { toastifyErrorSaga } from '../commonSagas/toastifyFailureSaga';
import { isEmpty } from './../../validations';
import { editOrderAsync, getOrderAsync, getOrdersAsync } from './actions';

function* getOrders(api) {
  const response = yield call(api);
  try {
    if (!isEmpty(response)) {
      const sortResponse = response.sort((a, b) => {
        return b.dateCreated.toDate() - a.dateCreated.toDate();
      });
      yield put(getOrdersAsync.success(sortResponse));
    }
  } catch (error) {
    yield toastifyErrorSaga(error);
  }
}

function* getOrder(api, { payload: params }: any) {
  const response = yield call(api, params);
  try {
    yield put(getOrderAsync.success(response));
  } catch (error) {
    yield toastifyErrorSaga(error);
  }
}

function* editOrder(api, { payload: params }: any) {
  const response = yield call(api, params);
  try {
    yield put(editOrderAsync.success(response));
    Toastify.success('Order edited successfully');
    yield put(getOrderAsync.request(response));
  } catch (error) {
    yield toastifyErrorSaga(error);
  }
}

export default function authSaga(apiInstance: Apis) {
  return [
    takeLatest(getOrdersAsync.request, getOrders, apiInstance.getOrders),
    takeLatest(getOrderAsync.request, getOrder, apiInstance.getOrder),
    takeLatest(editOrderAsync.request, editOrder, apiInstance.editOrder),
  ];
}
