import { ApiOkResponse } from 'apisauce';
import { Apis } from '../api';

function response<T = unknown>(code: number, data: T) {
  return new Promise<ApiOkResponse<any>>(resolve =>
    resolve({
      ok: true,
      problem: null,
      originalError: null,
      data: data,
      status: code,
    }),
  );
}

export default {
  example: () => response(200, { example: 'ok' }),
} as Partial<Apis>;
