import { Grid } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Button, DatePicker, Dialog, Image, TimePicker, View } from 'src/components/common';
import MuiTextField from 'src/components/MuiTextField';
import { deleteCourseAsync, editCourseAsync } from 'src/redux/coursesRedux/actions';
import { Course, CoursesParamKey } from 'src/redux/coursesRedux/types';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { isEmpty } from 'src/validations';
import { AddCourseFormSchema, initialAddCourseFormValue } from '../AddCourseDialog/helpers';
import './styles.scss';

const clsPrefix = 'course-detail';

const CourseDetailDialog: React.FC<Props> = ({ loading, onClose, user, course, onEditCourse, onDeleteCourse }) => {
  const formRef = React.useRef(null);
  const [selectedCourse, setSelectedCourse] = React.useState(initialAddCourseFormValue);
  const [isEdit, setIsEdit] = React.useState(false);

  React.useEffect(() => {
    if (!isEmpty(course)) {
      setSelectedCourse({
        ...course,
        eventDate: moment(course.eventDate, 'YYYY-MM-DD').toDate(),
        eventTime: moment(course.eventTime, 'HH:mm').toDate(),
      });
    }
  }, [course]);

  const handleSubmit = (formValues: Course) => {
    const payload = {
      ...formValues,
      eventDate: moment(formValues.eventDate).format('YYYY-MM-DD'),
      eventTime: moment(formValues.eventTime).format('HH:mm'),
      updatedTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    onEditCourse({
      payload: payload,
      callback: () => {
        onClose();
      },
    });
  };

  const handleSubmitForm = () => {
    formRef?.current?.handleSubmit();
  };

  const handleDeleteCourse = () => {
    onDeleteCourse({
      payload: {
        courseUrl: selectedCourse.courseUrl,
      },
      callback: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog
      className={`${clsPrefix}-dialog`}
      open={true}
      title="View Course Detail"
      maxWidth="sm"
      fullWidth
      onClose={onClose}
      overflowVisible={false}
      dialogActions={
        <>
          <Button variant="outline" onClick={handleDeleteCourse} className="mr-16" isLoading={loading}>
            Delete
          </Button>
          {isEdit ? (
            <Button
              variant="outline"
              onClick={() => {
                setIsEdit(false);
                formRef?.current?.resetForm(selectedCourse);
              }}
              className="mr-16">
              Turn off Edit mode
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setIsEdit(true)} className="mr-16">
              Turn on Edit mode
            </Button>
          )}
          <Button variant="outline" onClick={onClose} className="mr-16">
            Cancel
          </Button>
          {isEdit && (
            <Button
              onClick={() => {
                handleSubmitForm();
              }}
              type="submit"
              isLoading={loading}>
              Submit
            </Button>
          )}
        </>
      }>
      <View className={`${clsPrefix}-dialog-container my-16`}>
        <Formik<Course>
          initialValues={selectedCourse}
          onSubmit={handleSubmit}
          validationSchema={AddCourseFormSchema}
          enableReinitialize
          innerRef={formRef}>
          {({ values, errors, touched, getFieldProps, handleSubmit, setFieldValue }: FormikProps<Course>) => {
            // console.log('values: ', values);
            // console.log('errors: ', errors);
            return (
              <Form autoComplete="off" className={`${clsPrefix}-form`}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Course URL`}
                      errorMessage={touched.courseUrl && errors.courseUrl ? errors.courseUrl : ''}
                      placeholder="Enter course URL"
                      fullWidth
                      required
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      {...getFieldProps(CoursesParamKey.COURSE_URL)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Title`}
                      errorMessage={touched.title && errors.title ? errors.title : ''}
                      placeholder="Enter course title"
                      fullWidth
                      required
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      {...getFieldProps(CoursesParamKey.TITLE)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Subtitle`}
                      errorMessage={touched.subTitle && errors.subTitle ? errors.subTitle : ''}
                      placeholder="Enter course subTitle"
                      fullWidth
                      required
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      {...getFieldProps(CoursesParamKey.SUBTITLE)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Type`}
                      errorMessage={touched.type && errors.type ? errors.type : ''}
                      placeholder="Enter course type"
                      fullWidth
                      required
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      {...getFieldProps(CoursesParamKey.TYPE)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Content`}
                      errorMessage={touched.content && errors.content ? (errors.content as string) : ''}
                      placeholder="Enter course content"
                      fullWidth
                      multiline
                      minRows={3}
                      maxRows={5}
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      {...getFieldProps(CoursesParamKey.CONTENT)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Thumbnail link`}
                      errorMessage={touched.thumbNail && errors.thumbNail ? (errors.thumbNail as string) : ''}
                      placeholder="Enter thumbnail link"
                      fullWidth
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      className="mb-16"
                      {...getFieldProps(CoursesParamKey.THUMBNAIL)}
                    />
                    <Image src={values.thumbNail} alt="thumbnail link" />
                  </Grid>
                  <Grid item xs={6}>
                    <DatePicker
                      {...getFieldProps(CoursesParamKey.EVENT_DATE)}
                      label="Event Date *"
                      name={CoursesParamKey.EVENT_DATE}
                      onChange={setFieldValue}
                      selected={values.eventDate ? moment(values.eventDate, 'YYYY-MM-DD').toDate() : null}
                      errorMessage={touched.eventDate && errors.eventDate ? (errors.eventDate as string) : ''}
                      isTextfieldStyle
                      popperPlacement="auto"
                      readOnly={!isEdit}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      {...getFieldProps(CoursesParamKey.EVENT_TIME)}
                      label="Event Time *"
                      name={CoursesParamKey.EVENT_TIME}
                      onChange={setFieldValue}
                      selected={values.eventTime ? moment(values.eventTime, 'HH:mm').toDate() : null}
                      errorMessage={touched.eventTime && errors.eventTime ? (errors.eventTime as string) : ''}
                      isTextfieldStyle
                      popperPlacement="auto"
                      readOnly={!isEdit}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Event Location`}
                      errorMessage={touched.eventLocation && errors.eventLocation ? errors.eventLocation : ''}
                      placeholder="Enter event location"
                      fullWidth
                      required
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      {...getFieldProps(CoursesParamKey.EVENT_LOCATION)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Hosts`}
                      errorMessage={touched.hosts && errors.hosts ? errors.hosts : ''}
                      placeholder="Enter hosts name"
                      fullWidth
                      required
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      {...getFieldProps(CoursesParamKey.HOSTS)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Record Link`}
                      errorMessage={touched.recordLink && errors.recordLink ? errors.recordLink : ''}
                      placeholder="Enter record link"
                      fullWidth
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      {...getFieldProps(CoursesParamKey.RECORD_LINK)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Record Thumbnail`}
                      errorMessage={touched.recordThumbnail && errors.recordThumbnail ? errors.recordThumbnail : ''}
                      placeholder="Enter record thumbnail"
                      fullWidth
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                      className="mb-16"
                      {...getFieldProps(CoursesParamKey.RECORD_THUMBNAIL)}
                    />
                    {values.recordThumbnail && <Image src={values.recordThumbnail} alt="record-thumbnail link" />}
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </View>
    </Dialog>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { course: Course; onClose: Callback };

const mapStateToProps = (state: IRootState) => ({
  loading: state.courses.detail.loading,
  user: state.auth.user,
});

const mapDispatchToProps = {
  onEditCourse: editCourseAsync.request,
  onDeleteCourse: deleteCourseAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailDialog);
