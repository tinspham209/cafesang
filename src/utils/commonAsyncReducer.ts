import { AnyAction } from 'redux';
import { AsyncActionCreatorBuilder, getType } from 'typesafe-actions';

export type AsyncState<TData extends any> = {
  loading: boolean;
  error?: Error;
  data?: TData;
  [key: string]: any;
};

export const commonAsyncReducer =
  <TData extends unknown = any, TState extends AsyncState<TData> = AsyncState<TData>>(
    actionBuilder: AsyncActionCreatorBuilder<any, any, any>,
    dataPath: keyof TState = 'data',
    updateStateOptions: {
      patch: boolean;
    } = {
      patch: false,
    },
  ) =>
  (state: TState, action: AnyAction) => {
    switch (action.type) {
      case getType(actionBuilder.request):
        return {
          ...state,
          loading: true,
          error: null,
        };

      case getType(actionBuilder.success): {
        return {
          ...state,
          [dataPath]: updateStateOptions.patch
            ? {
                ...state[dataPath],
                ...action.payload,
              }
            : action.payload,
          error: null,
          loading: false,
        };
      }

      case getType(actionBuilder.failure):
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
