import React from 'react';
import './styles.scss';

const ButtonSwitch: React.FC<Props> = ({ value = null, onChange, name, ...props }) => {
  const handleClick = () => {
    onChange(name, !value);
  };

  return (
    <label className="cmp-button-switch">
      <input type="checkbox" checked={value} onClick={handleClick} onChange={() => {}} {...props} />
      <span className="cmp-button-switch__slider" />
    </label>
  );
};

type Props = {
  value: boolean | null;
  onChange: (name: string, value: boolean) => void;
  name?: string;
};

export default ButtonSwitch;
