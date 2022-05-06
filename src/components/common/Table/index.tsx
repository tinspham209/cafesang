import React, { memo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { flatten } from 'lodash';
import { MUIDataTableColumn, MUIDataTableOptions, MUIDataTableState, MUISortOptions } from 'mui-datatables';
import { IRootState } from 'src/redux/rootReducer';
import { TableBasic } from 'src/components/common';
import './styles.scss';
import appConfig from 'src/appConfig';

enum TableQueryParams {
  SEARCH = 'search',
  ROWS_PER_PAGE = 'rowsPerPage',
  PAGE = 'page',
  SORT = 'sort',
  FILTER = 'filter',
}

const Table: React.FC<Props> = ({
  isLoading,
  title,
  data,
  tableOptions,
  columns,
  refresh = true,
  defaultSortOrder,
  emptyComponent,
  onAction,
}) => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const tableStateRef = useRef<MUIDataTableState>();

  useEffect(() => {
    if (refresh) {
      handleTriggerAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, location]);

  const getInitialTableState = (queryParams: URLSearchParams): Partial<MUIDataTableOptions> => {
    let sortOrder;
    if (queryParams?.get('sort')?.includes(':')) {
      const sortOrderSplit = queryParams?.get('sort')?.split(':');
      if (sortOrderSplit.length === 2 && ['asc', 'desc'].includes(sortOrderSplit[1])) {
        sortOrder = {
          name: sortOrderSplit[0],
          direction: sortOrderSplit[1],
        };
      }
    }

    return {
      searchText: queryParams?.get('search'),
      sortOrder,
      rowsPerPageOptions: appConfig.ROWS_PER_PAGE_OPTIONS,
      rowsPerPage: queryParams?.has('rowsPerPage') ? Number(queryParams.get('rowsPerPage')) : appConfig.ROWS_PER_PAGE,
      page: queryParams?.has('page') ? Number(queryParams.get('page')) : 0,
    };
  };

  const currentState: Partial<MUIDataTableOptions> = getInitialTableState(query);
  const currentFilterList = query?.getAll('filter')?.map(f => (f ? f.split(',') : []));

  const getFilterParams = (filterList?: string[][]) => {
    if (!filterList) return {};
    const params: any = {};

    filterList.forEach((filter: string[], idx: number) => {
      if (filter.length > 0) {
        const column = columns[idx];
        const name = column?.name;
        params[name] = filter;
      }
    });

    return params;
  };

  const getActionParams = () => {
    const rowsPerPage = currentState?.rowsPerPage;
    const page = currentState?.page;
    const searchText = currentState?.searchText;

    const filterTableParams = getFilterParams(currentFilterList);
    const params = {
      take: rowsPerPage,
      skip: page * rowsPerPage,
      sort: currentState?.sortOrder?.name || defaultSortOrder?.name,
      order: currentState?.sortOrder?.direction || defaultSortOrder?.direction,
      search: searchText,
      ...filterTableParams,
    };

    return params;
  };

  const setQueryParams = () => {
    const tableState = tableStateRef.current;

    if (tableState?.searchText) {
      query.set(TableQueryParams.SEARCH, tableState.searchText);
    } else {
      query.delete(TableQueryParams.SEARCH);
    }

    if (tableState?.rowsPerPage) {
      const rowsPerPage = tableState.rowsPerPage.toString();
      query.set(TableQueryParams.ROWS_PER_PAGE, rowsPerPage);
    } else {
      query.delete(TableQueryParams.ROWS_PER_PAGE);
    }

    if (tableState?.page) {
      const page = tableState.page.toString();
      query.set(TableQueryParams.PAGE, page);
    } else {
      query.delete(TableQueryParams.PAGE);
    }

    if (tableState?.sortOrder.name && tableState?.sortOrder.direction) {
      const sort = `${tableState?.sortOrder.name}:${tableState?.sortOrder.direction}`;
      query.set(TableQueryParams.SORT, sort);
    } else {
      query.delete(TableQueryParams.SORT);
    }

    if (tableState?.filterList && flatten(tableState.filterList).length > 0) {
      query.delete(TableQueryParams.FILTER);
      tableState.filterList.forEach(f => {
        query.append(TableQueryParams.FILTER, f.join(','));
      });
    } else {
      query.delete(TableQueryParams.FILTER);
    }

    history.push({ search: query.toString() });
  };

  const handleTriggerAction = () => {
    const params = getActionParams();
    onAction(params);
  };

  const handleTableChange = async (action: any, tableState: MUIDataTableState) => {
    tableStateRef.current = tableState;
    if (['sort', 'filterChange', 'search'].includes(action)) query.set('isHasChangeState', 'true');
    switch (action) {
      case 'sort':
      case 'filterChange':
      case 'changeRowsPerPage':
      case 'changePage':
      case 'search':
      case 'resetFilters':
        setQueryParams();
        break;
      default:
        break;
    }
  };

  return (
    <TableBasic
      title={title}
      data={data}
      columns={columns?.map((c, index) => ({ ...c, options: { ...c.options, filterList: currentFilterList[index] } }))}
      options={{ ...tableOptions, ...currentState }}
      onTableChange={handleTableChange}
      containerClassName="cmp-table"
      isLoading={isLoading}
      emptyComponent={emptyComponent}
    />
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    title?: React.ReactNode;
    data: any[];
    tableOptions: MUIDataTableOptions;
    columns: MUIDataTableColumn[];
    refresh?: boolean | number | string;
    onAction: (...args: any[]) => void;
    defaultSortOrder?: MUISortOptions;
    isLoading?: boolean;
    emptyComponent?: React.ReactNode;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Table));
