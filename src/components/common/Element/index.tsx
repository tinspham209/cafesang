import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { ViewProps } from 'src/components/common/View';
import { IRootState } from 'src/redux/rootReducer';
import { isEmpty } from 'src/validations';
import View from '../View';
import './styles.scss';

const Element: React.FC<Props> = ({
  isInlineLabel = false,
  id,
  children,
  errorMessage,
  errorMessageCenter,
  label,
  className,
  classNameLabel,
  isTextfieldStyle,
  ...props
}) => {
  const hasError = !isEmpty(errorMessage);
  const hasLabel = !isEmpty(label);

  const listLabelClassName = classNameLabel?.split(' ');
  const getByClassName = (className: string) => {
    return listLabelClassName.find(item => item.includes(className));
  };
  const isHasClassNameColor = !isEmpty(classNameLabel) ? classNameLabel.includes('text-color') : false;
  const textLabelColor = !isEmpty(classNameLabel) ? getByClassName('text-color') : undefined;

  const isHasClassNameFontSize = !isEmpty(classNameLabel) ? classNameLabel.includes('text-is') : false;
  const textLabelFontSize = !isEmpty(classNameLabel) ? getByClassName('text-is') : undefined;

  const filterClassNameLabel = () => {
    let _classNameLabel = classNameLabel;
    if (isHasClassNameColor) {
      _classNameLabel = _classNameLabel.replace(textLabelColor, '');
    }
    if (isHasClassNameFontSize) {
      _classNameLabel = _classNameLabel.replace(textLabelFontSize, '');
    }
    return _classNameLabel;
  };

  return (
    <View
      isRowWrap={isInlineLabel}
      className={cn(className, 'form-element', isTextfieldStyle && 'text-field-style')}
      {...props}>
      {hasLabel && (
        <label
          className={cn(
            isInlineLabel && 'mt-8 mr-16',
            filterClassNameLabel(),
            isHasClassNameColor ? textLabelColor : 'text-color-black-900',
            isHasClassNameFontSize ? textLabelFontSize : 'text-is-18',
          )}
          htmlFor={id}>
          {label}
        </label>
      )}
      <View>
        {children}
        {hasError && (
          <p className={cn(`form-element__error`, { 'text-align-center': errorMessageCenter })}>{errorMessage}</p>
        )}
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ViewProps & {
    children: React.ReactNode;
    id?: string;
    label?: string | React.ReactNode;
    errorMessage?: string;
    className?: string;
    isInlineLabel?: boolean;
    errorMessageCenter?: boolean;
    classNameLabel?: string;
    isTextfieldStyle?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Element);
