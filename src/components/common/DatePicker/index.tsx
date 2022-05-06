import cn from 'classnames';
import React, { useRef } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import Element from '../Element';
import './styles.scss';

const DateSelector: React.FC<Props> = ({
  label,
  onChange,
  errorMessage,
  containerClassName,
  classNames,
  placeholder = 'mm/dd/yyyy',
  dateFormat = 'MM/dd/yyyy',
  mask = '99/99/9999',
  name,
  onBlur = () => {},
  ...props
}) => {
  const id = useRef<string>(`datepicker-${getRandomId()}`);

  // For more information:
  // https://reactdatepicker.com/
  const handleChange = (value: Date) => {
    onChange(name, value);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  const hasError = !isEmpty(errorMessage);
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-datepicker', containerClassName)}>
      <DatePicker
        id={id.current}
        onChange={handleChange}
        placeholderText={placeholder}
        className={cn('cmp-datepicker__input', { 'cmp-datepicker__input--error': hasError }, classNames)}
        showPopperArrow={false}
        dateFormat={dateFormat}
        onBlur={handleBlur}
        customInput={<InputMask mask={mask} />}
        {...props}
      />
    </Element>
  );
};

type BaseDatePickerProps = Pick<ReactDatePickerProps, Exclude<keyof ReactDatePickerProps, 'onChange' | 'onBlur'>>;

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  BaseDatePickerProps & {
    errorMessage?: string;
    containerClassName?: string;
    classNames?: string;
    placeholder?: string;
    mask?: string;
    label?: string | React.ReactNode;
    onChange: Callback;
    onBlur?: Callback;
    dateFormat?: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);
