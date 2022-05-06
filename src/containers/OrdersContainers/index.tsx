import { MUIDataTableOptions } from 'mui-datatables';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { Table, View } from 'src/components/common';
import { getOrdersAsync } from 'src/redux/ordersRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { Navigator } from 'src/services';
import { allColumns } from './allColumns';
import { OrderQueryParams } from './helpers';

const clsPrefix = 'orders';

const Orders: React.FC<Props> = ({ loading, records, onGetOrders }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const history = useHistory();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const query = new URLSearchParams(location.search);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = React.useState<OrderQueryParams>(null);

  const handleGetOrders = () => {
    onGetOrders();
  };

  const handleRowClick = (_value: any, meta: { rowIndex: number }) => {
    const index = meta.rowIndex;
    const selectedRecord = records[index];
    Navigator.navigate(`${PATHS.orders}/${selectedRecord.id}`);
  };
  const tableOptions: MUIDataTableOptions = React.useMemo(
    () => ({
      count: records?.length,
      onRowClick: handleRowClick,
      searchPlaceholder: 'Search by member name, ID or location',
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
        onAction={handleGetOrders}
        isLoading={loading}
      />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  records: state.orders.orders.data,
  loading: state.orders.orders.loading,
});

const mapDispatchToProps = {
  onGetOrders: getOrdersAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
