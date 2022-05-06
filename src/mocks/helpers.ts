const WAITING_TIME = 2000;

export const wrapIntoResponse = (data: any) => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ ok: true, data }), WAITING_TIME);
  });
};

export const wrapIntoError = (data: any) => {
  return new Promise(reject => {
    setTimeout(() => reject({ ok: false, data }), WAITING_TIME);
  });
};
