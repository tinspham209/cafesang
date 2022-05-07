import { IconButton, InputAdornment, InputBaseComponentProps, makeStyles, TextField } from '@material-ui/core';
import React, { HTMLProps, MouseEventHandler, RefObject } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { connect } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { isEmpty } from 'src/validations';

const MuiTextField: React.FC<InputProps> = ({
  children,
  errorMessage,
  label,
  className,
  inputRef = null,
  icon,
  onIconClick,
  loading,
  isPassword,
  defaultValue,
  helperText,
  color = 'primary',
  disabled,
  fullWidth,
  multiline,
  onChange,
  id,
  required,
  minRows,
  maxRows,
  inputProps,
  InputProps,
  iconPosition = 'end',
  onKeyDown,
  value,
  placeholder,
  variant = 'outlined',
  ...props
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <TextField
      {...props}
      id={id}
      value={value}
      label={label ? label : ' '}
      placeholder={placeholder}
      variant={variant}
      color={color}
      type={isPassword ? (showPassword ? 'text' : 'password') : 'text'}
      error={errorMessage === ' ' || isEmpty(errorMessage) ? false : true}
      helperText={errorMessage ? errorMessage : !isEmpty(helperText) ? helperText : ''}
      defaultValue={defaultValue}
      ref={inputRef}
      classes={{ root: className ? className : undefined }}
      disabled={disabled}
      fullWidth={fullWidth}
      multiline={multiline}
      onChange={onChange}
      onKeyDown={onKeyDown}
      required={required}
      minRows={minRows}
      maxRows={maxRows}
      inputProps={inputProps}
      InputProps={{
        className: classes.input,
        ...(!isEmpty(InputProps) && {
          ...InputProps,
        }),

        ...(iconPosition === 'end'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  {isPassword && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(prevState => !prevState)}
                      edge="end">
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </IconButton>
                  )}
                  {!isPassword && icon && (
                    <IconButton onClick={onIconClick} edge="end">
                      {icon}
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }
          : {
              startAdornment: (
                <InputAdornment position="start">
                  {!isPassword && icon && (
                    <IconButton onClick={onIconClick} edge="end">
                      {icon}
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }),
      }}
    />
  );
};

const useStyles = makeStyles(theme => ({
  input: {
    background: 'rgb(255, 255, 255)',
  },
}));

type BaseInputProps = Pick<HTMLProps<HTMLInputElement>, Exclude<keyof HTMLProps<HTMLInputElement>, 'label'>>;
export type InputProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  BaseInputProps & {
    errorMessage?: string;
    inputRef?: RefObject<HTMLInputElement>;
    icon?: React.ReactNode;
    onIconClick?: MouseEventHandler<HTMLElement>;
    label?: string | React.ReactNode;
    isPassword?: boolean;
    loading?: boolean;
    defaultValue?: string | React.ReactNode;
    helperText?: string;
    color?: 'primary' | 'secondary';
    disabled?: boolean;
    fullWidth?: boolean;
    multiline?: boolean;
    id?: boolean;
    onChange?: Callback;
    required?: boolean;
    size?: 'small' | 'medium';
    minRows?: number | string;
    maxRows?: number | string;
    inputProps?: InputBaseComponentProps;
    iconPosition?: 'start' | 'end';
    onKeyDown?: Callback;
    value?: unknown;
    placeholder?: string;
    variant?: 'standard' | 'outlined' | 'filled';
    InputProps?: any;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MuiTextField);
