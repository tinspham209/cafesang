import { createReducer } from 'typesafe-actions';
import { signInAsync, signOutAsync } from '../authRedux/actions';
import { exchangeTokenAsync } from './../authRedux/actions';
import { setCollapseSidebar, setShowNavbar, setShowSecondBurger, setShowSidebar, toggleSideMenu } from './actions';

export type ICommonState = Readonly<{
  showNavbar: boolean;
  showSecondBurger: boolean;
  showSidebar: boolean;
  collapseSidebar: boolean;
}>;

/* ------------- Initial State ------------- */
const initialState: ICommonState = {
  showNavbar: true,
  showSecondBurger: false,
  showSidebar: false,
  collapseSidebar: false,
};

export default createReducer(initialState)
  /* ------------- setCollapseSidebar ------------- */
  .handleAction(setCollapseSidebar, (state, action) => ({
    ...state,
    collapseSidebar: action.payload,
  }))
  /* ------------- setShowSecondBurger ------------- */
  .handleAction(setShowSecondBurger, (state, action) => ({
    ...state,
    showSecondBurger: action.payload,
  }))
  .handleAction(signInAsync.success, (state, action) => ({
    ...state,
    showNavbar: true,
    showSidebar: true,
  }))
  .handleAction(exchangeTokenAsync.success, (state, action) => ({
    ...state,
    showNavbar: true,
    showSidebar: true,
  }))
  .handleAction(signOutAsync.success, (state, action) => ({
    ...state,
    // showNavbar: false,
    showSidebar: false,
  }))
  .handleAction(toggleSideMenu, state => ({
    ...state,
    collapseSidebar: !state.collapseSidebar,
  }))
  .handleAction(setShowNavbar, (state, action) => ({
    ...state,
    showNavbar: action.payload,
  }))
  .handleAction(setShowSidebar, (state, action) => ({
    ...state,
    showSidebar: action.payload,
  }));
