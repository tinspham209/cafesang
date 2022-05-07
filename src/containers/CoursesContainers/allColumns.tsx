import { MUIDataTableColumn } from 'mui-datatables';
import { Course, Courses, CoursesParamKey } from 'src/redux/coursesRedux/types';

export type CoursesDataTableRow = Omit<Course, ''> & { '' };

export type CoursesTableColumn = MUIDataTableColumn & {
  name: keyof CoursesDataTableRow;
};

export const allColumns = (records: Courses): CoursesTableColumn[] => [
  {
    name: CoursesParamKey.TITLE,
    label: 'Title',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
  {
    name: CoursesParamKey.TYPE,
    label: 'Type',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
  {
    name: CoursesParamKey.EVENT_DATE,
    label: 'Event Date',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
  {
    name: CoursesParamKey.EVENT_TIME,
    label: 'Event Time',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
  {
    name: CoursesParamKey.EVENT_LOCATION,
    label: 'Event Location',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
  {
    name: CoursesParamKey.HOSTS,
    label: 'Hosts',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
  {
    name: CoursesParamKey.DATE_CREATED,
    label: 'Date Created',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
  {
    name: CoursesParamKey.UPDATED_TIME,
    label: 'Updated Time',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => {
        return value ? value : '--';
      },
    },
  },
];
