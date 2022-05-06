import { IRootState } from '../rootReducer';

export const selectCurrentPathname = (state: IRootState): string => {
  return state.router.location.pathname || '';
};
