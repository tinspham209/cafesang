import _ from 'lodash';
import moment from 'moment';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Toastify } from 'src/services';
import { Apis } from 'src/services/api';
import { toastifyErrorSaga } from '../commonSagas/toastifyFailureSaga';
import { isEmpty } from './../../validations';
import { addCourseAsync, editCourseAsync, getCourseDetailAsync, getCoursesAsync } from './actions';
import { Course } from './types';
function* getCourses(api) {
  const response = yield call(api);
  try {
    if (!isEmpty(response)) {
      const sortResponse = _.orderBy(
        response,
        (o: Course) => {
          return moment(o.eventDate, 'YYYY/MM/DD').format('YYYYMMDD');
        },
        ['desc'],
      );

      yield put(getCoursesAsync.success(sortResponse));
    }
  } catch (error) {
    yield all([getCoursesAsync.failure(error), toastifyErrorSaga(error)]);
  }
}

function* getCourse(api, { payload: params }: any) {
  const response = yield call(api, params);
  try {
    yield put(getCourseDetailAsync.success(response));
  } catch (error) {
    yield all([getCourseDetailAsync.failure(error), toastifyErrorSaga(error)]);
  }
}

function* addCourse(api, { payload: params }: any) {
  const response = yield call(api, params?.payload);
  try {
    yield put(addCourseAsync.success(response));
    Toastify.success('Course added successfully');
    if (params?.callback) {
      params.callback();
    }
    yield put(getCoursesAsync.request());
  } catch (error) {
    yield all([addCourseAsync.failure(error), toastifyErrorSaga(error)]);
  }
}

function* editCourse(api, { payload: params }: any) {
  const response = yield call(api, params?.payload);
  try {
    yield put(editCourseAsync.success(response));
    Toastify.success('Course edited successfully');
    if (params?.callback) {
      params.callback();
    }
    yield put(getCoursesAsync.request());
  } catch (error) {
    yield all([editCourseAsync.failure(error), toastifyErrorSaga(error)]);
  }
}

export default function authSaga(apiInstance: Apis) {
  return [
    takeLatest(getCoursesAsync.request, getCourses, apiInstance.getCourses),
    takeLatest(getCourseDetailAsync.request, getCourse, apiInstance.getCourse),
    takeLatest(addCourseAsync.request, addCourse, apiInstance.addCourse),
    takeLatest(editCourseAsync.request, editCourse, apiInstance.editCourse),
  ];
}
