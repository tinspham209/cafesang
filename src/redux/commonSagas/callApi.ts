import { Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { AsyncActionCreatorBuilder, getType } from 'typesafe-actions';

export function* callAuth<TResponse extends unknown = any, TError extends Error = Error>(
  api,
  action: {
    asyncAction: AsyncActionCreatorBuilder<any, [string, [TResponse, any]], [string, [TError, any]]>;
    responseExtractor?: (res) => TResponse;
    errorBuilder?: (err) => any;
  },
  ...args: any[]
) {
  const { asyncAction, responseExtractor = undefined, errorBuilder = err => err } = action;
  try {
    const response = yield call(api, ...args);
    yield put(asyncAction.success(responseExtractor?.(response), undefined));
  } catch (err) {
    yield put(asyncAction.failure(errorBuilder(err), undefined));
  }
}

const sanitizeActionType = actionType => actionType.split('/').pop().replace('_REQUEST', '').replaceAll('_', ' ');

export function* callApi<TResponse extends unknown = any, TError extends Error = Error>(
  api,
  action: {
    asyncAction:
      | AsyncActionCreatorBuilder<any, [string, [TResponse, any]], [string, [TError, any]]>
      | AsyncActionCreatorBuilder<any, [string, [TResponse, any]], [string, [TError, any]], any>;
    responseExtractor?: (res) => TResponse;
    errorBuilder?: (err) => any;
    onSuccess?: Saga;
    onFailure?: Saga;
  },
  ...args: any[]
) {
  const { asyncAction, responseExtractor = res => res, errorBuilder = err => err, onSuccess, onFailure } = action;

  const response = yield call(api, ...args);
  if (response.ok) {
    yield put(asyncAction.success(responseExtractor(response.data), undefined));
    if (onSuccess) {
      yield call(action.onSuccess, response);
    }
  } else {
    yield put(asyncAction.failure(errorBuilder(response.data), undefined));
    if (onFailure) {
      yield call(onFailure, response, sanitizeActionType(getType(asyncAction.request)));
    }
  }
}
