import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import View, { ViewProps } from '../View';
import './styles.scss';

const ViewClickable: React.FC<Props> = ({ children, className, onClick, ...props }) => {
  const handleClick = (event: any) => {
    onClick && onClick(event);
  };
  return (
    <View
      className={cn('cmp-view__clickable', className)}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
      {...props}>
      {children}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.HTMLProps<HTMLDivElement> &
  ViewProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewClickable);
