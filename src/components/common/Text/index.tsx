import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const Text: React.FC<Props> = ({ children, className, variant, size, color, style = {}, ...props }) => {
  const textStyle: React.CSSProperties = { ...style };
  if (size) textStyle.fontSize = size;
  if (color) textStyle.color = color;

  return (
    <p
      style={textStyle}
      className={cn('cmp-text', className, {
        [`cmp-text__${variant}`]: !!variant,
      })}
      {...props}>
      {children}
    </p>
  );
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
    variant?: 'sidebar-title' | 'title' | 'titleUnderline';
    size?: number;
    color?: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Text);
