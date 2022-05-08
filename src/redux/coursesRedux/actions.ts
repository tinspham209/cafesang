import { createAsyncAction } from 'typesafe-actions';
import { Callback } from '../types';
import { Course, Courses, GetCourseDetailParam } from './types';

const prefix = 'courses';

export const getCoursesAsync = createAsyncAction(
  `${prefix}/GET_COURSES_REQUEST`,
  `${prefix}/GET_COURSES_SUCCESS`,
  `${prefix}/GET_COURSES_FAILURE`,
)<void, Courses, Error>();

export const getCourseDetailAsync = createAsyncAction(
  `${prefix}/GET_COURSE_DETAIL_REQUEST`,
  `${prefix}/GET_COURSE_DETAIL_SUCCESS`,
  `${prefix}/GET_COURSE_DETAIL_FAILURE`,
)<
  {
    payload: GetCourseDetailParam;
    callback?: Callback;
  },
  Course,
  Error
>();

export const addCourseAsync = createAsyncAction(
  `${prefix}/ADD_COURSE_REQUEST`,
  `${prefix}/ADD_COURSE_SUCCESS`,
  `${prefix}/ADD_COURSE_FAILURE`,
)<
  {
    payload: Course;
    callback?: Callback;
  },
  Courses,
  Error
>();

export const editCourseAsync = createAsyncAction(
  `${prefix}/EDIT_COURSE_REQUEST`,
  `${prefix}/EDIT_COURSE_SUCCESS`,
  `${prefix}/EDIT_COURSE_FAILURE`,
)<
  {
    payload: Course;
    callback?: Callback;
  },
  void,
  Error
>();

export const deleteCourseAsync = createAsyncAction(
  `${prefix}/DELETE_COURSE_REQUEST`,
  `${prefix}/DELETE_COURSE_SUCCESS`,
  `${prefix}/DELETE_COURSE_FAILURE`,
)<
  {
    payload: {
      courseUrl: string;
    };
    callback?: Callback;
  },
  void,
  Error
>();
