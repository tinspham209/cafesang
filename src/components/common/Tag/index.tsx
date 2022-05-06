import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';

const Tag: React.FC<Props> = ({
  children,
  className,
  size = 'is-normal',
  variant = 'is-primary',
  isLight = false,
  ...props
}) => {
  return (
    <span className={cn('tag', variant, size, { 'is-light': isLight })} {...props}>
      {children}
    </span>
  );
};
export type TagVariant =
  | 'is-black'
  | 'is-dark'
  | 'is-light'
  | 'is-white'
  | 'is-primary'
  | 'is-link'
  | 'is-info'
  | 'is-success'
  | 'is-warning'
  | 'is-danger';
export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
    variant?: TagVariant;
    isLight?: boolean;
    size?: 'is-normal' | 'is-medium' | 'is-large';
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
