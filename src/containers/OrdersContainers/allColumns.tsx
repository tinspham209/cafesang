import { MUIDataTableColumn } from 'mui-datatables';
import { FireStoreTimeType, OrderDetail, Orders, OrdersParamKey } from 'src/redux/ordersRedux/types';
import { formatFireStoreTime } from './helpers';
import { formatTagStatus } from './OrderDetail/helpers';

export type OrdersDataTableRow = Omit<OrderDetail, ''> & { '' };

export type OrdersTableColumn = MUIDataTableColumn & {
  name: keyof OrdersDataTableRow;
};

export const allColumns = (records: Orders): OrdersTableColumn[] => [
  { name: OrdersParamKey.NAME, label: 'Name', options: { filter: false, sort: false } },
  {
    name: OrdersParamKey.PHONE_NUMBER,
    label: 'Phone Number',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
  {
    name: OrdersParamKey.DATE_CREATED,
    label: 'Date Created',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: FireStoreTimeType) => formatFireStoreTime(value),
    },
  },
  {
    name: OrdersParamKey.FB_LINK,
    label: 'Facebook URL',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? (
          <a href={value} target="_blank" rel={`noopener noreferrer`}>
            {value}
          </a>
        ) : (
          '--'
        );
      },
    },
  },
  { name: OrdersParamKey.CARD_TYPE, label: 'Type', options: { filter: false, sort: false } },
  {
    name: OrdersParamKey.ADDRESS,
    label: 'Address',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
  {
    name: OrdersParamKey.STATUS,
    label: 'Status',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return formatTagStatus(value);
      },
    },
  },
];
