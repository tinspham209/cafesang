import { combineReducers } from 'redux';
import { AsyncState, commonAsyncReducer } from 'src/utils/commonAsyncReducer';
import { createReducer } from 'typesafe-actions';
import { getUserInfoAsync } from './actions';
import { UserInfo } from './types';

export type IUserInfoState = Readonly<{
  user: AsyncState<UserInfo>;
}>;

// const defaultAsyncState = {
//   loading: false,
//   error: null,
// };

const defaultAsyncStateWithDataEmpty = {
  data: null,
  loading: false,
  error: null,
};

/* ------------- Initial State ------------- */
const initialState: IUserInfoState = {
  user: {
    ...defaultAsyncStateWithDataEmpty,
  },
};
export const userReducer = createReducer<AsyncState<UserInfo>>(initialState.user).handleAction(
  [getUserInfoAsync.request, getUserInfoAsync.success, getUserInfoAsync.failure],
  (state, action) => ({
    ...state,
    ...commonAsyncReducer<any, any>(getUserInfoAsync)(state, action),
  }),
);

export default combineReducers<IUserInfoState>({
  user: userReducer,
});
