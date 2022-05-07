import { combineReducers } from 'redux';
import { AsyncState } from 'src/utils/commonAsyncReducer';
import { createReducer } from 'typesafe-actions';
import { addCourseAsync, editCourseAsync, getCourseDetailAsync, getCoursesAsync } from './actions';
import { Course, Courses } from './types';

export type ICoursesState = Readonly<{
  courses: AsyncState<Courses>;
  detail: AsyncState<Course>;
}>;

const defaultAsyncState = {
  loading: false,
  error: null,
};

const defaultAsyncStateWithDataEmpty = {
  data: null,
  loading: false,
  error: null,
};

/* ------------- Initial State ------------- */
const initialState: ICoursesState = {
  courses: {
    ...defaultAsyncState,
    data: [],
  },
  detail: {
    ...defaultAsyncStateWithDataEmpty,
  },
};
export const coursesReducer = createReducer<AsyncState<Courses>>(initialState.courses)
  .handleAction([getCoursesAsync.request], (state, action) => ({
    ...state,
    loading: true,
  }))
  .handleAction([getCoursesAsync.success], (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }))
  .handleAction([getCoursesAsync.failure], (state, action) => ({
    ...state,
    loading: false,
    data: [],
    error: action.payload,
  }))
  .handleAction([addCourseAsync.request], (state, action) => ({
    ...state,
    loading: true,
  }))
  .handleAction([addCourseAsync.success], (state, action) => ({
    ...state,
    loading: false,
  }))
  .handleAction([addCourseAsync.failure], (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }));

export const courseReducer = createReducer<AsyncState<Course>>(initialState.detail)
  .handleAction([getCourseDetailAsync.request], (state, action) => ({
    ...state,
    loading: true,
  }))
  .handleAction([getCourseDetailAsync.success], (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }))
  .handleAction([getCourseDetailAsync.failure], (state, action) => ({
    ...state,
    loading: false,
    data: null,
    error: action.payload,
  }))
  .handleAction([editCourseAsync.request], (state, action) => ({
    ...state,
    loading: true,
  }))
  .handleAction([editCourseAsync.success], (state, action) => ({
    ...state,
    loading: false,
  }))
  .handleAction([editCourseAsync.failure], (state, action) => ({
    ...state,
    loading: false,
    data: null,
    error: action.payload,
  }));

export default combineReducers<ICoursesState>({
  courses: coursesReducer,
  detail: courseReducer,
});
