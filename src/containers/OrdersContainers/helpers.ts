import { TableParams } from 'src/redux/types';
import { FireStoreTimeType } from './../../redux/ordersRedux/types';

export type OrderQueryParams = TableParams;

export const formatFireStoreTime = (value: FireStoreTimeType) => {
  if (!value) return '--';
  const dateInMillis = value.seconds * 1000;

  const date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString();
  return date;
};
