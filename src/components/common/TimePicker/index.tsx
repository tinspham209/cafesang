import cn from 'classnames';
import React, { useRef } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { connect } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import Element from '../Element';
import './styles.scss';

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
  isTextfieldStyle = false,
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
      isInlineLabel={isInlineLabel}
      isTextfieldStyle={isTextfieldStyle}>
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
    isTextfieldStyle?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
