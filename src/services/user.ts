import { User } from 'src/redux/authRedux/types';

const LOCAL_STORAGE_USER = 'user';

const setLocalUser = (user: User) => {
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
};

const getLocalUser = () => {
  const user = localStorage.getItem(LOCAL_STORAGE_USER);
  return JSON.parse(user);
};

const clearLocalUser = () => {
  localStorage.removeItem(LOCAL_STORAGE_USER);
};

export default {
  setLocalUser,
  getLocalUser,
  clearLocalUser,
};
