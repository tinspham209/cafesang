import { Dialog } from '@material-ui/core';
import cn from 'classnames';
import React, { useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { IRootState } from 'src/redux/rootReducer';
import { emptyFunction, getRandomId } from 'src/utils';
import { Input } from '..';
import Button from '../Button';
import Element from '../Element';
import Image from '../Image';
import { InputProps } from '../Input';
import Text from '../Text';
import View from '../View';
import './styles.scss';

const InputColor: React.FC<Props> = ({
  label,
  errorMessage,
  containerClassName,
  classNames,
  onChange,
  description = 'Please type HEX code or you can choose in the picker.',
  name = '',
  value,
  ...props
}) => {
  const id = useRef<string>(`input-color-${getRandomId()}`);
  const [color, setColor] = useState<string>(value ?? '');
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleColorChange = color => {
    setColor(color.hex);
  };

  const handleConfirmColor = () => {
    onChange(name, color);

    onCloseColorPicker();
  };

  const handleCancelColor = () => {
    setColor(value);
    onCloseColorPicker();
  };

  const onShowColorPicker = () => {
    setDisplayColorPicker(true);
  };

  const onCloseColorPicker = () => {
    setDisplayColorPicker(false);
  };
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-input-color', containerClassName)}>
      {description && (
        <Text size={14} className="cmp-input-color__description">
          {description}
        </Text>
      )}
      <View isRow>
        <Input
          containerClassName="cmp-input-color__input"
          type="text"
          value={value}
          onClick={onShowColorPicker}
          onChange={emptyFunction}
          {...props}
        />
        <View
          className={cn(
            'cmp-input-color__picker-button ml-16',
            !value && 'cmp-input-color__picker-button--placeholder',
          )}
          style={{ backgroundColor: value }}
          onClick={onShowColorPicker}>
          {!value && <Image src={IMAGES.defaultUser} />}
        </View>
      </View>
      {displayColorPicker && (
        <Dialog open={false} onClose={onCloseColorPicker} className="cmp-input-color__modal">
          <SketchPicker color={color} onChange={handleColorChange} width={320} />
          <View isRow justify="center" className="mt-32">
            <Button type="button" onClick={handleCancelColor} variant="link-primary" className="mr-24">
              {'CANCEL'}
            </Button>
            <Button type="button" onClick={handleConfirmColor}>
              {'SELECT'}
            </Button>
          </View>
        </Dialog>
      )}
    </Element>
  );
};
type BaseInputColorProps = Pick<InputProps, Exclude<keyof InputProps, 'onChange'>>;

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  BaseInputColorProps & {
    errorMessage?: string;
    containerClassName?: string;
    classNames?: string;
    name?: string;
    label?: string | React.ReactNode;
    description?: string;
    onChange: (name: string, value: string) => void;
    value?: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InputColor);
