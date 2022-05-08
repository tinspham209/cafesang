import { Grid } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { Button, Image, LoadingCommon, Text, View } from 'src/components/common';
import { getCoursesAsync } from 'src/redux/coursesRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { isEmpty } from 'src/validations';
import './styles.scss';

const clsPrefix = 'ctn-root';

const Root: React.FC<Props> = ({ courses, loading, onGetCourses }) => {
  React.useEffect(() => {
    onGetCourses();
    document.title = `cafesang`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className={`${clsPrefix} mt-36 full-width`}>
      <Image src={IMAGES.background} className="ctn-home__background" />
      <View className={`${clsPrefix}-courses`}>
        <View className={`${clsPrefix}-courses__title`} isRow align="center" justify="space-between">
          <Text className="text-is-36 fw-bold">Courses</Text>
          {/* <Button
            variant="link-primary"
            className="text-is-24 fw-bold"
            onClick={() => navigator.navigate(PATHS.courses)}>
            View More
          </Button> */}
        </View>
        <View className={`${clsPrefix}-courses__content`} renderIf={loading || isEmpty(courses)}>
          <Grid container spacing={3}>
            {Array.from({ length: 3 }, (item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <View className={`${clsPrefix}-courses__content-item mt-16 loading`}>
                  <View justify="center" align="center" className="full-height">
                    <LoadingCommon />
                  </View>
                </View>
              </Grid>
            ))}
          </Grid>
        </View>
        <View className={`${clsPrefix}-courses__content mt-16`} renderIf={!loading || !isEmpty(courses)}>
          <Grid container spacing={3}>
            {courses.map(course => {
              return (
                <Grid item xs={12} sm={6} md={4} key={course.courseUrl}>
                  <Link to={`${PATHS.courses}/${course.courseUrl}`}>
                    <View className={`${clsPrefix}-courses__content-item`}>
                      <Image
                        src={course.thumbNail}
                        alt={course.title}
                        className={`${clsPrefix}-courses__content-item-image`}
                      />
                      <View className={`${clsPrefix}-courses__content-item-title`}>
                        <Text className="text-is-20 fw-medium">{course.title}</Text>
                        <Text className="text-is-14 fw-normal text-is-black-600 mt-8">{course.subTitle}</Text>

                        <View isRow justify="space-between" align="center" className={`mt-8`}>
                          <Text className="text-is-14 fw-medium text-is-black-600 ">
                            Type: {_.upperFirst(course.type)}
                          </Text>
                          <Button variant="link-primary" className="text-is-14">
                            View more
                          </Button>
                        </View>
                      </View>
                    </View>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  courses: state.courses.courses.data,
  loading: state.courses.courses.loading,
});

const mapDispatchToProps = {
  onGetCourses: getCoursesAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
