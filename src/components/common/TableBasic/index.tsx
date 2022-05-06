import MUIDataTable, {
  debounceSearchRender,
  MUIDataTableOptions,
  MUIDataTableProps,
  MUIDataTableState,
} from 'mui-datatables';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import { IRootState } from 'src/redux/rootReducer';
import { LoadingCommon, View } from 'src/components/common';
import './styles.scss';

const TableBasic: React.FC<Props> = ({
  isLoading,
  containerClassName,
  onTableChange,
  currentPage,
  options,
  total,
  emptyComponent = 'No data',
  ...props
}) => {
  const tableOptions: MUIDataTableOptions = {
    serverSide: true,
    searchOpen: false,
    search: true,
    download: false,
    filter: true,
    print: false,
    viewColumns: false,
    selectableRowsHeader: false,
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: isLoading ? <LoadingCommon /> : emptyComponent,
      },
    },
    jumpToPage: false,
    rowHover: true,
    onTableChange,
    customSearchRender: debounceSearchRender(500),
    ...options,
  };

  const hasRowClickAction = !!options?.onRowClick;
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiPaper: {
          elevation4: {
            boxShadow: 'none',
          },
        },
        MuiTableRow: {
          hover: {
            cursor: hasRowClickAction ? 'pointer' : 'default',
          },
        },
        MuiTableBody: {
          root: {
            opacity: isLoading ? 0.3 : 1,
          },
        },
        MuiPopover: {
          paper: {
            minWidth: 300,
          },
        },
      },
    });

  // More info: https://github.com/gregnb/mui-datatables
  return (
    <View className={cn('cmp-table-basic', containerClassName)} flexGrow={1}>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable options={tableOptions} {...props} />
      </MuiThemeProvider>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MUIDataTableProps & {
    containerClassName?: string;
    currentPage?: number;
    total?: number;
    onTableChange: (action: string, tableState: MUIDataTableState) => void;
    isLoading?: boolean;
    emptyComponent?: React.ReactNode;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(memo(TableBasic));
