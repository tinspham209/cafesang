export interface IActionHandler<K, T> {
  (state: K, payload: UnsafeReturnType<T>): K;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type UnsafeReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
/* eslint-enable @typescript-eslint/no-explicit-any */

export type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];

export type TableParams = {
  skip: number;
  take: number;
  sort?: string;
  order?: string;
  search?: string;
  [key: string]: number | boolean | string | string[];
};

export type Callback = (...args: any[]) => void;
