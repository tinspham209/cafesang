import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import View from '../View';
import './styles.scss';
import { isEmpty } from 'src/validations';
import { ViewProps } from 'src/components/common/View';

const Element: React.FC<Props> = ({
  isInlineLabel = false,
  id,
  children,
  errorMessage,
  label,
  className,
  ...props
}) => {
  const hasError = !isEmpty(errorMessage);
  const hasLabel = !isEmpty(label);

  return (
    <View isRowWrap={isInlineLabel} className={cn(className, 'form-element')} {...props}>
      {hasLabel && (
        <label className={isInlineLabel ? 'mt-8 mr-16' : ''} htmlFor={id}>
          {label}
        </label>
      )}
      <View>
        {children}
        {hasError && <p className="form-element__error">{errorMessage}</p>}
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ViewProps & {
    children: React.ReactNode;
    id?: string;
    label?: string | React.ReactNode;
    errorMessage?: string;
    className?: string;
    isInlineLabel?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Element);
