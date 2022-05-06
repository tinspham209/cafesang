import cn from 'classnames';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Loading } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  className,
  disabled,
  icon,
  iconPosition = 'left',
  isFull,
  isLoading,
  type,
  variant = 'primary',
  onClick = event => {},
  labelSize,
  size,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const isRenderIcon = !!icon && !isLoading;
  const isDisabled = disabled || isLoading;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick(event);
    handleAddClickEffect();
  };

  const handleAddClickEffect = () => {
    btnRef.current?.classList.remove('cmp-button--effect');
    setTimeout(() => {
      btnRef.current?.classList.add('cmp-button--effect');
    }, 16);
  };

  const isOutlineButton = variant.includes('outline');

  return (
    <button
      ref={btnRef}
      className={cn('cmp-button', `cmp-button--${variant}`, className, {
        'cmp-button--disabled': isDisabled,
        'cmp-button--full-width': isFull,
        'cmp-button--is-loading': isLoading,
        [`cmp-button__icon--${iconPosition}`]: isRenderIcon,
        'cmp-button--small': size === 'small',
      })}
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}>
      {isRenderIcon ? icon : null}
      <Loading
        size="small"
        variant={isOutlineButton ? 'primary' : 'white'}
        loadingStyle={5}
        className="cmp-button__loading"
      />
      <span className={`cmp-button__label text-is-${labelSize ? labelSize : size === 'small' ? '12' : '16'}`}>
        {label || children}
      </span>
    </button>
  );
};

export type ButtonVariant =
  | 'default'
  | 'outline'
  | 'outline-danger'
  | 'outline-success'
  | 'outline-secondary'
  | 'outline-warning'
  | 'text'
  | 'link'
  | 'link-primary'
  | 'secondary'
  | 'sorting'
  | 'danger'
  | 'warning'
  | 'success';

export type ButtonProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    label?: string;
    icon?: React.ReactElement;
    iconPosition?: 'left' | 'right';
    isFull?: boolean;
    isLoading?: boolean;
    variant?: ButtonVariant;
    labelSize?: number;
    size?: 'small' | 'medium' | 'large';
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
