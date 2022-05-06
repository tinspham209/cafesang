import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';
import { View } from '../common';
import './styles.scss';

const Footer: React.FC<Props> = ({ className }) => {
  return <View className={cn('cmp-footer', className)}>Copyright © 2022</View>;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    className?: string;
  };
const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
