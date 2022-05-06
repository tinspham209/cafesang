export const LOCAL_STORAGE_TOKEN = 'token';

const clearToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
};

const getExchangedToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  return token;
};

const setToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
};

const getToken = () => {
  return new Promise((resolve, reject) => {
    const token = getExchangedToken();
    if (token) {
      resolve(token);
    } else {
      reject();
    }
  });
};

export default {
  clearToken,
  getToken,
  setToken,
  getExchangedToken,
};
