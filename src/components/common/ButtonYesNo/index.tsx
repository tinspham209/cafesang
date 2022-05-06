import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import Element from '../Element';

const ButtonYesNo: React.FC<Props> = ({
  value = null,
  onChange,
  label,
  errorMessage,
  containerClassName,
  disabled,
  name,
  yesLabel = 'YES',
  noLabel = 'NO',
  isChangeOnValue = false,
  ...props
}) => {
  const [state, setState] = useState<boolean | null>(value);

  React.useEffect(() => {
    if (isChangeOnValue) setState(value);
  }, [isChangeOnValue, value]);

  const handleClickYes = () => {
    setState(true);
    if (state !== true) onChange(name, true);
  };

  const handleClickNo = () => {
    setState(false);
    if (state !== false) onChange(name, false);
  };

  return (
    <Element errorMessage={errorMessage} label={label} className={containerClassName}>
      <div className={cn('cmp-btn-yes-no', { 'cmp-btn-yes-no--disabled': disabled })}>
        <button
          className={cn('cmp-btn-yes-no__button', { 'is-active': state === true })}
          onClick={handleClickYes}
          type="button"
          {...props}>
          <span className="cmp-btn-yes-no__label">{yesLabel}</span>
        </button>
        <button
          className={cn('cmp-btn-yes-no__button', { 'is-active': state === false })}
          onClick={handleClickNo}
          type="button"
          {...props}>
          <span className="cmp-btn-yes-no__label">{noLabel}</span>
        </button>
      </div>
    </Element>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    value: boolean | null;
    onChange?: (name: string, value: boolean) => void;
    onBlue?: (...args: any[]) => void;
    label?: string;
    disabled?: boolean;
    containerClassName?: string;
    errorMessage?: string;
    name?: string;
    yesLabel?: string;
    noLabel?: string;
    isChangeOnValue?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonYesNo);
