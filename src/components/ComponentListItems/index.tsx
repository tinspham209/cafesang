import React, { HTMLProps, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';
import { View, LoadingCommon } from '../common';
import cn from 'classnames';
import './styles.scss';

const ComponentListItems: React.FC<Props> = ({
  handleAction,
  elementList,
  className,
  isLoading,
  loaderList,
  ...props
}) => {
  useEffect(() => {
    handleAction();
    // eslint-disable-next-line
  }, []);

  const loader = loaderList ? <View>{loaderList}</View> : <LoadingCommon />;

  return (
    <View className={cn('cmp-list-item', className)} {...props} flexGrow={1}>
      {isLoading ? loader : <View>{elementList}</View>}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  HTMLProps<HTMLDivElement> & {
    handleAction: () => void;
    elementList: React.ReactElement | React.ReactElement[];
    loaderList?: React.ReactElement | React.ReactElement[];
    className?: string;
    isLoading?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentListItems);
