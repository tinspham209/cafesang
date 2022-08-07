import cn from 'classnames';
import { useRef } from 'react';
import Select from 'react-select';
import { COLOR_CODE } from 'src/appConfig/constants';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import Element from '../Element';
import View from '../View';
import './styles.scss';

const SelectCmp = ({
  options,
  onChange,
  label = '',
  className = '',
  value,
  errorMessage = '',
  placeholder = 'Select',
  containerClassName = '',
  onBlur = (...args) => {},
  name = '',
  isClearable = true,
  multi = false,
  disabled = false,
  isTextfieldStyle = false,
  readOnly = false,
  isLoading = false,
  ...props
}) => {
  const id = useRef(`select-${getRandomId()}`);
  const handleChange = selectedOption => {
    const value = selectedOption?.value === false ? false : selectedOption?.value || null;
    onChange(name, multi ? selectedOption : value);
  };

  const handleSelectBlur = event => {
    onBlur && onBlur(name, true);
  };
  const hasError = !isEmpty(errorMessage);

  const selectedOption = multi ? value : options?.find(option => option.value === value) || null;
  // For custom select, follow this link:
  // https://react-select.com/styles#using-classnames
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
      isTextfieldStyle={isTextfieldStyle}>
      <View>
        <Select
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
          isSearchable={!readOnly}
          name={name}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#217ea6',
              neutral20: hasError ? '#c60000' : 'hsl(0, 0%, 80%)',
            },
          })}
          styles={{
            option: (styles, { isFocused, isSelected }) => ({
              ...styles,
              color: isFocused ? COLOR_CODE.WHITE : isSelected ? COLOR_CODE.WHITE : '#000',
              backgroundColor: isFocused
                ? `rgba(240,81,34, 0.5)`
                : isSelected
                ? `rgba(240,81,34, 0.7)`
                : COLOR_CODE.WHITE,
            }),
          }}
          {...props}
          isDisabled={disabled}
          isMulti={multi}
          isLoading={isLoading}
        />
      </View>
    </Element>
  );
};

export default SelectCmp;
