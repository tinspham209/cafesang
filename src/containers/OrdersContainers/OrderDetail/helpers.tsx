import { Tag } from 'src/components/common';
import { OrderStatus } from 'src/redux/ordersRedux/types';

export const capitalizeStatus = (status: string): string => {
  return status?.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()) || status || '--';
};

export const formatTagStatus = (status: React.ReactNode | string) => {
  switch (status) {
    case OrderStatus.TODO:
      return (
        <Tag isLight size="is-medium" variant="is-danger">
          {OrderStatus.TODO}
        </Tag>
      );
    case OrderStatus.DOING:
      return (
        <Tag isLight size="is-medium" variant="is-info">
          {OrderStatus.DOING}
        </Tag>
      );
    case OrderStatus.DONE:
      return (
        <Tag isLight size="is-medium" variant="is-success">
          {OrderStatus.DONE}
        </Tag>
      );
    case OrderStatus.CANCEL:
      return (
        <Tag isLight size="is-medium" variant="is-light">
          {OrderStatus.CANCEL}
        </Tag>
      );
    case OrderStatus.INVALID:
      return (
        <Tag isLight size="is-medium" variant="is-light">
          {OrderStatus.INVALID}
        </Tag>
      );
    default:
      return <>{capitalizeStatus(status as string)}</>;
  }
};
