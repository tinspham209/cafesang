import React, { useRef } from 'react';
import cn from 'classnames';
import CreatableSelect from 'react-select/creatable';
import './styles.scss';
import Element from '../Element';
import View from '../View';
import { isEmpty } from 'src/validations';
import { getRandomId } from 'src/utils';

const SelectCreatable = ({
  options,
  onChange,
  label = '',
  className = '',
  value,
  errorMessage = '',
  placeholder = 'Select',
  containerClassName = '',
  onBlur,
  name = '',
  isClearable = true,
  multi = false,
  disabled = false,
  forwardRef = null,
  ...props
}) => {
  const id = useRef(`select-${getRandomId()}`);

  const handleChange = selectedOption => {
    const value = selectedOption?.value;
    onChange(name, value);
  };

  const handleSelectBlur = event => {
    onBlur && onBlur(name, true);
  };
  const hasError = !isEmpty(errorMessage);

  const selectedOption = multi ? value : options?.find(option => option.value === value) || null;
  // For custom select, follow this link:
  // https://react-select.com/styles#using-classnames
  return (
    <Element id={id.current} errorMessage={errorMessage} label={label} className={containerClassName}>
      <View>
        <CreatableSelect
          ref={forwardRef}
          id={id.current}
          isClearable={isClearable}
          value={selectedOption}
          placeholder={placeholder}
          onChange={handleChange}
          options={options}
          className={cn('cmp-select', className, { 'cmp-select--error': hasError })}
          classNamePrefix="cmp-select"
          menuPlacement="auto"
          onBlur={handleSelectBlur}
          name={name}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#217ea6',
              neutral20: hasError ? '#c60000' : 'hsl(0, 0%, 80%)',
            },
          })}
          {...props}
          isDisabled={disabled}
          isMulti={multi}
        />
      </View>
    </Element>
  );
};

export default SelectCreatable;
