import { combineReducers } from 'redux';
import { AsyncState } from 'src/utils/commonAsyncReducer';
import { createReducer } from 'typesafe-actions';
import { editOrderAsync, getOrderAsync, getOrdersAsync } from './actions';
import { OrderDetail, Orders } from './types';

export type IOrdersState = Readonly<{
  orders: AsyncState<Orders>;
  detail: AsyncState<OrderDetail> & { edited: boolean };
}>;

const defaultAsyncState = {
  loading: false,
  error: null,
};

const defaultAsyncStateWithDataEmpty = {
  data: null,
  loading: false,
  error: null,
};

/* ------------- Initial State ------------- */
const initialState: IOrdersState = {
  orders: {
    ...defaultAsyncState,
    data: [],
  },
  detail: {
    ...defaultAsyncStateWithDataEmpty,
    edited: false,
  },
};
export const ordersReducer = createReducer<AsyncState<Orders>>(initialState.orders)
  .handleAction([getOrdersAsync.request], (state, action) => ({
    ...state,
    loading: true,
  }))
  .handleAction([getOrdersAsync.success], (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }))
  .handleAction([getOrdersAsync.failure], (state, action) => ({
    ...state,
    loading: false,
    data: [],
    error: action.payload,
  }));

export const orderReducer = createReducer<AsyncState<OrderDetail>>(initialState.detail)
  .handleAction([getOrderAsync.request], (state, action) => ({
    ...state,
    loading: true,
    edited: false,
  }))
  .handleAction([getOrderAsync.success], (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }))
  .handleAction([getOrderAsync.failure], (state, action) => ({
    ...state,
    loading: false,
    data: null,
    error: action.payload,
  }))

  // Clear order when goBack
  .handleAction([getOrdersAsync.request], (state, action) => ({
    ...defaultAsyncStateWithDataEmpty,
  }))

  // EDIT Order
  .handleAction([editOrderAsync.request], (state, action) => ({
    ...state,
    loading: true,
  }))
  .handleAction([editOrderAsync.success], (state, action) => ({
    ...state,
    loading: false,
    edited: true,
  }))
  .handleAction([editOrderAsync.failure], (state, action) => ({
    ...state,
    loading: false,
    edited: false,
  }));

export default combineReducers<IOrdersState>({
  orders: ordersReducer,
  detail: orderReducer,
});
