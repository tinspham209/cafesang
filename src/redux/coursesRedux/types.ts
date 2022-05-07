import { TableParams } from '../types';

export type Host = {
  name: string;
  role: string;
  avatar: string;
  anotherAvatar?: string;
  others: any;
};

export type Courses = Course[];

export type Course = {
  courseUrl: string;
  title: string;
  subTitle: string;
  type: string;
  content: any | null;
  thumbNail: string;
  dateCreated: string;
  updatedTime?: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  // hosts: Host[] | null;
  hosts: string;
  courseLength: string;
  recordLink: string | null;
  recordThumbnail: string | null;
};

export type GetCoursesParams = TableParams;

export enum CoursesParamKey {
  COURSE_URL = 'courseUrl',
  TITLE = 'title',
  SUBTITLE = 'subTitle',
  TYPE = 'type',
  CONTENT = 'content',
  THUMBNAIL = 'thumbNail',
  DATE_CREATED = 'dateCreated',
  UPDATED_TIME = 'updatedTime',
  EVENT_DATE = 'eventDate',
  EVENT_TIME = 'eventTime',
  EVENT_LOCATION = 'eventLocation',
  HOSTS = 'hosts',
  COURSE_LENGTH = 'courseLength',
  RECORD_LINK = 'recordLink',
  RECORD_THUMBNAIL = 'recordThumbnail',
}

export type GetCourseDetailParam = {
  uid: string;
};
