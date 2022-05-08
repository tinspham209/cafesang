import { Breadcrumbs } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { BsFillPlayBtnFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { Image, Link, Text, View } from 'src/components/common';
import { getCourseDetailAsync } from 'src/redux/coursesRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import navigator from 'src/services/navigator';
import { getTitleCase } from 'src/utils';
import { DateFormatApi, DateFormatDisplayShort, TimeFormat, TimeFormat12 } from 'src/utils/momentUtils';
import { isEmpty } from 'src/validations';
import { SpinnerBook } from '../CommonContainers';
import './styles.scss';

const clsPrefix = 'ctn-course';

const Course: React.FC<Props> = ({ course, loading, onGetCourseDetail }) => {
  const { id } = useParams<{ id: string }>();

  const [loadingBook, setLoadingBook] = React.useState(true);

  React.useEffect(() => {
    if (isEmpty(id)) {
      navigator.navigate(PATHS.root);
    } else {
      onGetCourseDetail({
        payload: {
          uid: id,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setLoadingBook(false);
    }, 2500);
  }, []);

  React.useEffect(() => {
    if (!isEmpty(course)) {
      document.title = `${getTitleCase(course.title)} - cafesang`;
    }
  }, [course]);

  // if (true) {
  if (isEmpty(course) || loading || loadingBook) {
    return (
      <View className={`${clsPrefix} mt-36 full-width`}>
        <SpinnerBook />
      </View>
    );
  }

  return (
    <View className={`${clsPrefix} mt-36`} justify="center">
      <View className={`${clsPrefix}-container`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link onClick={() => navigator.navigate(PATHS.root)} className={`fw-medium text-is-16 has-text-primary`}>
            Home
          </Link>
          <Link onClick={() => navigator.navigate(PATHS.root)} className={`fw-medium text-is-16 has-text-primary`}>
            Courses
          </Link>

          <Text>{getTitleCase(course.title)}</Text>
        </Breadcrumbs>

        <View className={`${clsPrefix}-body mt-24`}>
          <View className={`${clsPrefix}-body__title mb-24`}>
            <Text size={40} className={`fw-bold`}>
              {getTitleCase(course.title)}
            </Text>
            <Text size={16} className={`fw-normal`}>
              {getTitleCase(course.subTitle)}
            </Text>
            <Text size={16} className={`fw-normal text-align-right`}>
              {moment(course.eventTime, TimeFormat).format(TimeFormat12)} -{' '}
              {moment(course.eventDate, DateFormatApi).format(DateFormatDisplayShort)}
            </Text>
          </View>
          <View className={`${clsPrefix}-body__img mb-24`}>
            <Image alt="course-thumbnail" src={course.thumbNail} />
          </View>

          <View className={`${clsPrefix}-body__content`}>
            {course.content.split('|||').map((item, index) => {
              const itemHasLink = item.includes('http');
              const link = itemHasLink ? `http${item.split('http')[1]}` : null;
              return (
                <Text key={index} size={16} className={`fw-normal mb-16`}>
                  {itemHasLink && item.split('http')[0]} {link && <Link href={link}>Download</Link>}
                  {!itemHasLink && item.trim()}
                </Text>
              );
            })}
            <View renderIf={!isEmpty(course.recordLink)}>
              <Text size={24} className="fw-medium mt-24">
                Watch video:{' '}
              </Text>
              <Link href={course.recordLink} target="_blank" rel="noopener noreferrer">
                <View className={`${clsPrefix}-body__img record-thumbnail my-24 cursor-pointer`}>
                  <Image alt="course-thumbnail" src={course.recordThumbnail} />
                  <i>
                    <BsFillPlayBtnFill size={56} color="#fff" />
                  </i>
                </View>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  course: state.courses.detail.data,
  loading: state.courses.detail.loading,
});

const mapDispatchToProps = {
  onGetCourseDetail: getCourseDetailAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
