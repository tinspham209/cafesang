import { createAction } from 'typesafe-actions';

export const setShowSidebar = createAction('common/SET_SHOW_SIDEBAR')<boolean>();

export const setCollapseSidebar = createAction('common/SET_COLLAPSE_SIDEBAR')<boolean>();

export const setShowSecondBurger = createAction('common/SET_SHOW_SECOND_BURGER')<boolean>();

export const toggleSideMenu = createAction('common/TOGGLE_SIDE_MENU')();

export const setShowNavbar = createAction('common/SET_SHOW_NAVBAR')<boolean>();
