import React from 'react';
import Collapsible, { CollapsibleProps } from 'react-collapsible';
import { connect } from 'react-redux';
import appConfig from 'src/appConfig';

import { IRootState } from 'src/redux/rootReducer';

const Collapse: React.FC<Props> = ({ children, transitionTime = appConfig.ANIMATION_TIME, ...props }) => {
  return (
    <Collapsible transitionTime={transitionTime} {...props}>
      {children}
    </Collapsible>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & CollapsibleProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Collapse);
