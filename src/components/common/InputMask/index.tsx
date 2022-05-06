/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { HTMLProps, MouseEventHandler, RefObject, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { IRootState } from 'src/redux/rootReducer';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import '../Input/styles.scss';
import Element from '../Element';
import View from '../View';
import InputMask from 'react-input-mask';

const Input: React.FC<InputProps> = ({
  children,
  errorMessage,
  label,
  className,
  containerClassName,
  inputRef = null,
  onIconClick,
  icon = null,
  mask = '***',
  ...props
}) => {
  //   9: 0-9
  //   a: A-Z, a-z
  //   *: A-Z, a-z, 0-9
  const id = useRef<string>(`input-${getRandomId()}`);

  return (
    <Element id={id.current} errorMessage={errorMessage} label={label} className={containerClassName}>
      <View>
        <InputMask
          id={id.current}
          className={cn(className, 'cmp-input', {
            'cmp-input--error': !isEmpty(errorMessage),
            'cmp-input--icon': !!icon,
          })}
          mask={mask}
          maskChar={null}
          ref={inputRef}
          {...props}
        />
        <span className="cmp-input__icon" onClick={onIconClick}>
          {icon}
        </span>
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
    onIconClick?: MouseEventHandler<HTMLElement>;
    label?: string | React.ReactNode;
    icon?: React.ReactNode;
    mask: string | RegExp | RegExp[];
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
