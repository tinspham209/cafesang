import { TableParams } from '../types';

export type FireStoreTimeType = {
  seconds: number;
  nanoseconds: number;
};

export type Orders = OrderDetail[];

export type OrderDetail = {
  address: string;
  cardType: string;
  dateCreated: FireStoreTimeType;
  fbLink: string;
  name: string;
  phoneNumber: string;
  status: OrderStatus;
  id?: string;
  editBy?: string;
  updatedTime?: string;
};

export type GetOrdersParams = TableParams;

export enum OrdersParamKey {
  ADDRESS = 'address',
  CARD_TYPE = 'cardType',
  DATE_CREATED = 'dateCreated',
  FB_LINK = 'fbLink',
  NAME = 'name',
  PHONE_NUMBER = 'phoneNumber',
  ID = 'id',
  STATUS = 'status',
  EDIT_BY = 'editBy',
  UPDATED_TIME = 'updatedTime',
}

export type GetOrderPayload = {
  uid: string;
};

export enum OrderStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
  INVALID = 'INVALID',
  CANCEL = 'CANCEL',
}

export type EditOrderPayload = {
  uid: string;
  order: OrderDetail;
  editInfo: {
    editBy: string;
    updatedTime: string;
  };
};
