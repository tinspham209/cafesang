import { createAction, createAsyncAction } from 'typesafe-actions';
import { ChangePasswordPayload, SignInPayload, Token, User } from './types';

export const signInAsync = createAsyncAction('auth/SIGN_IN_REQUEST', 'auth/SIGN_IN_SUCCESS', 'auth/SIGN_IN_FAILURE')<
  SignInPayload,
  User,
  Error
>();

export const signUpAsync = createAsyncAction('auth/SIGN_UP_REQUEST', 'auth/SIGN_UP_SUCCESS', 'auth/SIGN_UP_FAILURE')<
  SignInPayload,
  User,
  Error
>();

export const signOutAsync = createAsyncAction(
  'auth/SIGN_OUT_REQUEST',
  'auth/SIGN_OUT_SUCCESS',
  'auth/SIGN_OUT_FAILURE',
)<void, void, AuthError>();

export const exchangeTokenAsync = createAsyncAction(
  'auth/EXCHANGE_TOKEN_REQUEST',
  'auth/EXCHANGE_TOKEN_SUCCESS',
  'auth/EXCHANGE_TOKEN_FAILURE',
)<void, User, Error>();

export const setToken = createAction('auth/SET_TOKEN')<Token>();

export const changePasswordAsync = createAsyncAction(
  'auth/CHANGE_PASSWORD_REQUEST',
  'auth/CHANGE_PASSWORD_SUCCESS',
  'auth/CHANGE_PASSWORD_FAILURE',
)<ChangePasswordPayload, void, Error>();
