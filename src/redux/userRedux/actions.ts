import { createAsyncAction } from 'typesafe-actions';
import { GetUserInfoPayload, UserInfo } from './types';

export const getUserInfoAsync = createAsyncAction(
  'user/GET_USER_INFO_REQUEST',
  'user/GET_USER_INFO_SUCCESS',
  'user/GET_USER_INFO_FAILURE',
)<GetUserInfoPayload, UserInfo, Error>();

// export const setToken = createAction('auth/SET_TOKEN')<Token>();
