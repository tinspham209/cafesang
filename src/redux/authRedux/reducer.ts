import { createReducer } from 'typesafe-actions';
import { changePasswordAsync, exchangeTokenAsync, setToken, signInAsync, signOutAsync, signUpAsync } from './actions';
import { User } from './types';

export type IAuthState = Readonly<{
  user: User | null;
  error?: AuthError;
  isAuthenticated: boolean | null;
  loading: boolean;
  isSigningIn: boolean;
  token: string;
  uid: string;
}>;

/* ------------- Initial State ------------- */
const initialState: IAuthState = {
  user: null,
  error: null,
  isAuthenticated: null,
  loading: false,
  isSigningIn: false,
  token: null,
  uid: null,
};

export default createReducer(initialState)
  /* ------------- signInAsync ------------- */
  .handleAction(signInAsync.request, state => ({
    ...state,
    isSigningIn: true,
    loading: true,
    error: null,
  }))
  .handleAction(signInAsync.success, (state, { payload: params }) => ({
    ...state,
    isSigningIn: false,
    error: null,
    loading: false,
    user: params,
    token: params.refreshToken,
    isAuthenticated: true,
    uid: params.uid,
  }))
  .handleAction(signInAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    isSigningIn: false,
    error: action.payload,
    isAuthenticated: null,
  }))

  /* ------------- signUpAsync ------------- */
  .handleAction(signUpAsync.request, state => ({
    ...state,
    isSigningIn: true,
    loading: true,
    error: null,
  }))
  .handleAction(signUpAsync.success, (state, { payload: params }) => ({
    ...state,
    isSigningIn: false,
    error: null,
    loading: false,
    user: params,
    isAuthenticated: true,
    token: params.refreshToken,
    uid: params.uid,
  }))
  .handleAction(signUpAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    isSigningIn: false,
    error: action.payload,
    isAuthenticated: null,
  }))

  /* ------------- signOutAsync ------------- */
  .handleAction(signOutAsync.request, (state, action) => ({
    ...state,
    loading: true,
  }))
  .handleAction(signOutAsync.success, (state, action) => ({
    user: null,
    permissions: {
      isAdmin: false,
      hasFullRights: false,
    },
    error: null,
    isAuthenticated: null,
    loading: false,
    isSigningIn: false,
    token: null,
    uid: null,
  }))
  .handleAction(signOutAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    error: null,
  }))

  .handleAction(setToken, (state, action) => ({
    ...state,
    token: action.payload.token,
  }))

  /* ------------- exchangeTokenAsync ------------- */
  .handleAction(exchangeTokenAsync.request, state => ({
    ...state,
    isSigningIn: true,
    loading: true,
    error: null,
  }))
  .handleAction(exchangeTokenAsync.success, (state, { payload: params }) => ({
    ...state,
    isSigningIn: false,
    error: null,
    loading: false,
    user: params,
    token: params.refreshToken,
    uid: params.uid,
    isAuthenticated: true,
  }))
  .handleAction(exchangeTokenAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    isSigningIn: false,
    error: action.payload,
    isAuthenticated: null,
  }))
  /* ------------- changePasswordAsync ------------- */
  .handleAction(changePasswordAsync.request, state => ({
    ...state,
    isSigningIn: true,
    loading: true,
    error: null,
  }))
  .handleAction(changePasswordAsync.success, (state, { payload: params }) => ({
    ...state,
    isSigningIn: false,
    error: null,
    loading: false,
  }))
  .handleAction(changePasswordAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    isSigningIn: false,
    error: action.payload,
  }));
