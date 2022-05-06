import React, { useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import Element from '../Element';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import { Callback } from 'src/redux/types';

const TimePicker: React.FC<Props> = ({
  label,
  onChange,
  errorMessage,
  containerClassName,
  classNames,
  placeholder = 'HH : mm',
  dateFormat = 'HH : mm',
  timeFormat = 'HH : mm',
  timeIntervals = 30,
  name,
  isInlineLabel = false,
  ...props
}) => {
  const id = useRef<string>(`datepicker-${getRandomId()}`);

  const handleChange = (value: Date) => {
    onChange(name, value);
  };

  // For more information:
  // https://reactdatepicker.com/
  const hasError = !isEmpty(errorMessage);
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-datepicker cmp-datepicker__time', containerClassName)}
      isInlineLabel={isInlineLabel}>
      <DatePicker
        id={id.current}
        onChange={handleChange}
        placeholderText={placeholder}
        className={cn('cmp-datepicker__input', { 'cmp-datepicker__input--error': hasError }, classNames)}
        showPopperArrow={false}
        timeFormat={timeFormat}
        dateFormat={dateFormat}
        {...props}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={timeIntervals}
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
    label?: string;
    isInlineLabel?: boolean;
    onChange: Callback;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
