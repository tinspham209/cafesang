import React, { HTMLProps, MouseEventHandler, RefObject, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import './styles.scss';
import Element from '../Element';
import View from '../View';
import { Icon } from '..';

const Input: React.FC<InputProps> = ({
  children,
  errorMessage,
  label,
  className,
  containerClassName,
  inputRef = null,
  iconName = '',
  onIconClick,
  ...props
}) => {
  const id = useRef<string>(`input-${getRandomId()}`);

  return (
    <Element id={id.current} errorMessage={errorMessage} label={label} className={containerClassName}>
      <View>
        <input
          id={id.current}
          className={cn(className, 'cmp-input', {
            'cmp-input--error': !isEmpty(errorMessage),
            'cmp-input--icon': !isEmpty(iconName),
          })}
          ref={inputRef}
          {...props}
        />
        {iconName && <Icon name={iconName} className="cmp-input__icon" onClick={onIconClick} />}
      </View>
    </Element>
  );
};

type BaseInputProps = Pick<HTMLProps<HTMLInputElement>, Exclude<keyof HTMLProps<HTMLInputElement>, 'label'>>;
export type InputProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  BaseInputProps & {
    errorMessage?: string;
    containerClassName?: string;
    inputRef?: RefObject<HTMLInputElement>;
    iconName?: string;
    onIconClick?: MouseEventHandler<HTMLElement>;
    label?: string | React.ReactNode;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
