import { IconButton, Tooltip } from '@material-ui/core';
import { Add, Refresh } from '@material-ui/icons';
import { MUIDataTableOptions } from 'mui-datatables';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Table, View } from 'src/components/common';
import { getCoursesAsync } from 'src/redux/coursesRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import AddCourseDialog from './AddCourseDialog';
import { allColumns } from './allColumns';
import CourseDetailDialog from './CourseDetailDialog';
import { CoursesQueryParams } from './helpers';

const clsPrefix = 'courses';

const CoursesContainer: React.FC<Props> = ({ loading, records, onGetCourses }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const history = useHistory();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const query = new URLSearchParams(location.search);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = React.useState<CoursesQueryParams>(null);

  const [showAddCourseDialog, setShowAddCourseDialog] = React.useState(false);

  const [showCourseDetailDialog, setShowCourseDetailDialog] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);

  const handleGetCourses = () => {
    onGetCourses();
  };

  const handleRowClick = (_value: any, meta: { rowIndex: number }) => {
    const index = meta.rowIndex;
    const _selectedRecord = records[index];
    setSelectedCourse(_selectedRecord);
    setShowCourseDetailDialog(true);
  };

  const tableOptions: MUIDataTableOptions = React.useMemo(
    () => ({
      count: records?.length,
      onRowClick: handleRowClick,
      searchPlaceholder: 'Search by course name, ID',
      customToolbar: () => (
        <>
          <Tooltip title="Refresh">
            <IconButton onClick={() => handleGetCourses()}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Add new course'}>
            <IconButton onClick={() => setShowAddCourseDialog(true)}>
              <Add />
            </IconButton>
          </Tooltip>
        </>
      ),
    }),
    // eslint-disable-next-line
    [records],
  );

  const columns = React.useMemo(() => allColumns(records), [records]);
  return (
    <View className={`${clsPrefix} mt-32`}>
      <Table
        title=""
        data={records}
        tableOptions={tableOptions}
        columns={columns}
        onAction={handleGetCourses}
        isLoading={loading}
      />

      {showAddCourseDialog && (
        <AddCourseDialog
          onClose={() => {
            setShowAddCourseDialog(false);
          }}
        />
      )}
      {showCourseDetailDialog && (
        <CourseDetailDialog
          course={selectedCourse}
          onClose={() => {
            setSelectedCourse(null);
            setShowCourseDetailDialog(false);
          }}
        />
      )}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  records: state.courses.courses.data,
  loading: state.courses.courses.loading,
});

const mapDispatchToProps = {
  onGetCourses: getCoursesAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);
