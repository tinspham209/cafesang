import React from 'react';
import { connect } from 'react-redux';

import { View } from 'src/components/common';
import { useComponentDidMount } from 'src/hooks';
import { setShowSecondBurger } from 'src/redux/commonRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const LayoutFull: React.FC<Props> = ({ children, onSetSecondBurger }) => {
  useComponentDidMount(() => {
    onSetSecondBurger(false);
  });

  return <View className="container ctn-layout-full">{children}</View>;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onSetSecondBurger: setShowSecondBurger,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutFull);
