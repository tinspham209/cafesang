import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { IAuthState } from './authRedux/reducer';
import commonReducer, { ICommonState } from './commonRedux/reducer';
import ordersReducer, { IOrdersState } from './ordersRedux/reducer';
import userReducer, { IUserInfoState } from './userRedux/reducer';

export interface IRootState {
  router: RouterState;
  common: ICommonState;
  auth: IAuthState;
  users: IUserInfoState;
  orders: IOrdersState;
}

/* ------------- Assemble The Reducers ------------- */
const createRootReducer = (history: History) =>
  combineReducers<IRootState>({
    router: connectRouter(history),
    common: commonReducer,
    auth: authReducer,
    users: userReducer,
    orders: ordersReducer,
  });

export default createRootReducer;
