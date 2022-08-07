import { Grid } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Button, DatePicker, Dialog, Select, TimePicker, View } from 'src/components/common';
import MuiTextField from 'src/components/MuiTextField';
import { addCourseAsync } from 'src/redux/coursesRedux/actions';
import { Course, CoursesParamKey } from 'src/redux/coursesRedux/types';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { isEmpty } from 'src/validations';
import { AddCourseFormSchema, initialAddCourseFormValue, TypeOptions } from './helpers';
import './styles.scss';

const clsPrefix = 'add-course';

const AddCourseDialog: React.FC<Props> = ({ loading, onClose, user, onAddCourse }) => {
  const formRef = React.useRef(null);

  const handleSubmitCourse = (formValues: Course) => {
    const payload: Course = {
      ...formValues,
      eventDate: moment(formValues.eventDate).format('YYYY-MM-DD'),
      eventTime: moment(formValues.eventTime).format('HH:mm'),
      dateCreated: moment().format('YYYY-MM-DD'),
      content: isEmpty(formValues.content) ? '' : formValues.content,
    };
    onAddCourse({
      payload: payload,
      callback: () => {
        onClose();
      },
    });
  };

  const handleSubmitForm = () => {
    formRef?.current?.handleSubmit();
  };

  return (
    <Dialog
      className={`${clsPrefix}-dialog`}
      open={true}
      title="Add new course"
      maxWidth="sm"
      fullWidth
      onClose={onClose}
      overflowVisible={false}
      dialogActions={
        <>
          <Button variant="outline" onClick={onClose} className="mr-16">
            Cancel
          </Button>
          <Button onClick={() => handleSubmitForm()} type="submit" isLoading={loading}>
            Add
          </Button>
        </>
      }>
      <View className={`${clsPrefix}-dialog-container my-16`}>
        <Formik<Course>
          initialValues={initialAddCourseFormValue}
          onSubmit={handleSubmitCourse}
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
                      {...getFieldProps(CoursesParamKey.SUBTITLE)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      name={CoursesParamKey.TYPE}
                      value={values.type}
                      label="Type *"
                      isTextfieldStyle={true}
                      options={TypeOptions}
                      onChange={(name, value) => {
                        setFieldValue(name, value);
                      }}
                      errorMessage={touched.type && errors.type ? (errors.type as string) : ''}
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
                      {...getFieldProps(CoursesParamKey.CONTENT)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Thumbnail link`}
                      errorMessage={touched.thumbNail && errors.thumbNail ? (errors.thumbNail as string) : ''}
                      placeholder="Enter thumbnail link"
                      fullWidth
                      multiline
                      minRows={3}
                      maxRows={5}
                      {...getFieldProps(CoursesParamKey.THUMBNAIL)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DatePicker
                      {...getFieldProps(CoursesParamKey.EVENT_DATE)}
                      label="Event Date *"
                      name={CoursesParamKey.EVENT_DATE}
                      onChange={setFieldValue}
                      selected={values.eventDate ? moment(values.eventDate).toDate() : null}
                      errorMessage={touched.eventDate && errors.eventDate ? (errors.eventDate as string) : ''}
                      isTextfieldStyle
                      popperPlacement="auto"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      {...getFieldProps(CoursesParamKey.EVENT_TIME)}
                      label="Event Time *"
                      name={CoursesParamKey.EVENT_TIME}
                      onChange={setFieldValue}
                      selected={values.eventTime ? moment(values.eventTime).toDate() : null}
                      errorMessage={touched.eventTime && errors.eventTime ? (errors.eventTime as string) : ''}
                      isTextfieldStyle
                      popperPlacement="auto"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Event Location`}
                      errorMessage={touched.eventLocation && errors.eventLocation ? errors.eventLocation : ''}
                      placeholder="Enter event location"
                      fullWidth
                      required
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
                      {...getFieldProps(CoursesParamKey.HOSTS)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Record Link`}
                      errorMessage={touched.recordLink && errors.recordLink ? errors.recordLink : ''}
                      placeholder="Enter record link"
                      fullWidth
                      {...getFieldProps(CoursesParamKey.RECORD_LINK)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Record Thumbnail`}
                      errorMessage={touched.recordThumbnail && errors.recordThumbnail ? errors.recordThumbnail : ''}
                      placeholder="Enter record thumbnail"
                      fullWidth
                      {...getFieldProps(CoursesParamKey.RECORD_THUMBNAIL)}
                    />
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

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { onClose: Callback };

const mapStateToProps = (state: IRootState) => ({
  loading: state.courses.courses.loading,
  user: state.auth.user,
});

const mapDispatchToProps = {
  // onEditOrder: editOrderAsync.request,
  onAddCourse: addCourseAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourseDialog);
