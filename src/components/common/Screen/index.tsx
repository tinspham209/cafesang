import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import View from '../View';
import './styles.scss';
// import Footer from 'src/components/Footer';

const Screen: React.FC<Props> = ({ showSidebar, collapseSidebar, children }) => {
  return (
    <View className={cn('cmp-screen', { 'cmp-screen__sidebar': showSidebar, 'is-collapse': collapseSidebar })}>
      <View className={cn('c-container')} flexGrow={1}>
        {children}
        {/* <Footer /> */}
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & HTMLProps<HTMLDivElement>;

const mapStateToProps = (state: IRootState) => ({
  showSidebar: state.common.showSidebar,
  collapseSidebar: state.common.collapseSidebar,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
