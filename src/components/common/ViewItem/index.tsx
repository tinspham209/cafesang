import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import { Grid, View } from '..';
import { isEmpty } from 'src/validations';

const ViewItem: React.FC<Props> = ({ label, value, variant = 'is-half' }) => {
  const isEmptyLine = isEmpty(label) && isEmpty(value);

  if (isEmptyLine) return <Grid.Item variant={variant} className={cn('cmp-view-item__empty', variant)} />;

  return (
    <Grid.Item variant={variant} className={cn('cmp-view-item column')}>
      <View className="cmp-view-item__label">{label}</View>
      <View className="cmp-view-item__value">{value || '--'}</View>
    </Grid.Item>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    label?: string | React.ReactElement;
    value?: string | boolean | number | React.ReactElement;
    variant?: 'is-three-quarters' | 'is-two-thirds' | 'is-half' | 'is-one-third' | 'is-one-quarter' | 'is-full';
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem);
