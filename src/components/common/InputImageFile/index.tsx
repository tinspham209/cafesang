import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import { Button, View } from '..';
import Element from '../Element';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import { FiUpload } from 'react-icons/fi';
import Image from '../Image';
import Text from '../Text';
import { IoCloseOutline } from 'react-icons/io5';

const InputImageFile: React.FC<Props> = ({
  label,
  description,
  errorMessage,
  containerClassName,
  classNames,
  name,
  initialValue,
  labelButton = 'UPLOAD FILE',
  onChange,
  onBlur,
  onClear,
}) => {
  const [fileName, setFileName] = useState<string>();
  const id = useRef<string>(`input-file-${getRandomId()}`);
  const file = useRef<HTMLInputElement>();

  const handleClickFile = () => {
    if (file && file.current) return file.current.click();
  };

  const handleChange = () => {
    const data = file?.current;
    setFileName(data.files[0].name);
    onChange(name, data.files[0]);
  };

  const handleClear = () => {
    file?.current?.form?.reset();
    setFileName(null);
    onClear && onClear(name, null);
  };

  const hasError = !isEmpty(errorMessage);

  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-input-image-file', containerClassName)}>
      {description && (
        <Text size={14} className="cmp-input-image-file__description">
          {description}
        </Text>
      )}
      <input
        className={cn('cmp-input-image-file__input')}
        type="file"
        ref={file}
        accept="image/*"
        name={name}
        onChange={handleChange}
      />
      {!fileName && !initialValue ? (
        <Button
          label={labelButton}
          onClick={handleClickFile}
          className={cn('cmp-input-image-file__button', classNames, { hasError })}
          variant="outline-secondary"
          type="button"
          icon={<FiUpload />}
          onBlur={() => onBlur && onBlur(name, true)}
        />
      ) : (
        <View flexGrow={1}>
          <Image
            className="cmp-input-image-file__image"
            src={initialValue ? initialValue : URL.createObjectURL(file?.current.files[0])}
          />
          <IoCloseOutline className={cn('cmp-input-image-file__icon--trash')} onClick={handleClear} />
        </View>
      )}
    </Element>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    errorMessage?: string;
    containerClassName?: string;
    classNames?: string;
    name?: string;
    description?: string;
    initialValue?: string;
    label?: string | React.ReactNode;
    labelButton?: string;
    onChange: (name: string, value: any) => void;
    onBlur?: (name: string, value: boolean) => void;
    onClear?: (name: string, value: any) => void;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InputImageFile);
