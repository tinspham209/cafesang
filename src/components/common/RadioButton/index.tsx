import React, { useRef } from 'react';
import cn from 'classnames';
import './styles.scss';
import shortid from 'shortid';
import { View } from '..';
import Element from '../Element';
import { isNumeric } from 'src/validations';

export const RadioButton: React.FC<RadioProps> = ({ label, labelClassName, containerClassName, style, ...props }) => {
  const id = useRef(shortid.generate());
  return (
    <View isRow className={cn('cmp-radio', containerClassName)} style={style}>
      <input id={id.current} className={cn('cmp-radio__input')} type="radio" {...props} />
      <label htmlFor={id.current} className={cn('cmp-radio__label', labelClassName)}>
        {label}
      </label>
    </View>
  );
};

type RadioProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
};

const Group: React.FC<RadioGroupProps> = ({
  options,
  value,
  isShowOptionLabel = true,
  containerClassName,
  onChange = () => {},
  label,
  errorMessage,
  name,
  onBlur,
  columns = 3,
  disabled = false,
}) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = isNumeric(target.value) ? parseInt(target.value) : target.value;
    onChange(name, value);
  };

  const handleRadioBlur = () => {
    onBlur && onBlur(name, true);
  };

  return (
    <Element errorMessage={errorMessage} label={label} className={containerClassName}>
      <View isRow>
        {options?.map((option, index) => (
          <RadioButton
            key={`radio-${name}-${index}`}
            name={name}
            disabled={disabled}
            value={option.value}
            checked={value === option.value}
            label={isShowOptionLabel ? option.label : null}
            onChange={handleValueChange}
            containerClassName={cn(columns && 'cmp-radio-groups__column')}
            style={{ width: `${100 / columns}%` }}
            onBlur={handleRadioBlur}
          />
        ))}
      </View>
    </Element>
  );
};

type RadioGroupProps = {
  label?: string;
  isShowOptionLabel?: boolean;
  options?: { value: any; label: string }[];
  value?: any;
  name?: string;
  onChange?: (name: string, value: any) => void;
  errorMessage?: string;
  containerClassName?: string;
  labelClassName?: string;
  description?: string;
  columns?: number;
  disabled?: boolean;
  onBlur?: (name: string, touched: boolean) => void;
};

export default Group;
