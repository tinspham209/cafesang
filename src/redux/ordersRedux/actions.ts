import { createAsyncAction } from 'typesafe-actions';
import { EditOrderPayload, GetOrderPayload, OrderDetail, Orders } from './types';

const prefix = 'orders';

export const getOrdersAsync = createAsyncAction(
  `${prefix}/GET_ORDERS_REQUEST`,
  `${prefix}/GET_ORDERS_SUCCESS`,
  `${prefix}/GET_ORDERS_FAILURE`,
)<void, Orders, Error>();

export const getOrderAsync = createAsyncAction(
  `${prefix}/GET_ORDER_REQUEST`,
  `${prefix}/GET_ORDER_SUCCESS`,
  `${prefix}/GET_ORDER_FAILURE`,
)<GetOrderPayload, OrderDetail, Error>();

export const editOrderAsync = createAsyncAction(
  `${prefix}/EDIT_ORDER_REQUEST`,
  `${prefix}/EDIT_ORDER_SUCCESS`,
  `${prefix}/EDIT_ORDER_FAILURE`,
)<EditOrderPayload, void, Error>();

// export const setToken = createAction('auth/SET_TOKEN')<Token>();
