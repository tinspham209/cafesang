import { isEmpty } from '.';

export const hasPagePermission = (userPermissions: string[], pagePermissions?: string[]) => {
  if (!pagePermissions) return true;
  if (isEmpty(pagePermissions)) return true;
  return pagePermissions.some(permission => userPermissions.includes(permission));
};
