/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { KeyboardEvent } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';

const Form: React.FC<Props> = ({ children, preventDefault = false, ...props }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (preventDefault && event.key === 'Enter') event.preventDefault();
  };

  return (
    <form onKeyDown={handleKeyDown} {...props}>
      {children}
    </form>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    preventDefault?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
