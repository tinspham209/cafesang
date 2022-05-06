import { ReactNode } from 'react';
import { AiOutlinePieChart } from 'react-icons/ai';
import { FaHome, FaUsersCog } from 'react-icons/fa';
import { PATHS } from './paths';

export const isActive = (href: string, exact?: boolean) => {
  if (exact) {
    return window.location.pathname.endsWith(href);
  }
  return window.location.pathname.includes(href);
};

export type MenuType = {
  title: string;
  icon: ReactNode;
  subMenu?: Omit<MenuType, 'subMenu'>[]; //{ title: string; href: string }[];
  href?: string;
};

export const SidebarMenu: MenuType[] = [
  { title: 'Dashboard', icon: <FaHome />, href: PATHS.home },
  {
    title: 'Orders Management',
    icon: <AiOutlinePieChart />,
    href: PATHS.orders,
  },
  { title: 'User Management', icon: <FaUsersCog />, href: PATHS.users },
];
