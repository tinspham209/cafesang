import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import { Input } from '..';
import { InputProps } from '../Input';
import { formatMoneyInput } from 'src/utils';

const InputCurrency: React.FC<Props> = ({ onChange, name = '', value, ...props }) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(formatMoneyInput(+value));
  }, [value]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/,/g, '');

    onChange(name, parseInt(value) || 0);
  };
  return <Input {...props} type="text" iconName="ic_dollar" onChange={handleChange} value={inputValue} />;
};
type BaseInputCurrencyProps = Pick<InputProps, Exclude<keyof InputProps, 'onChange'>>;

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  BaseInputCurrencyProps & {
    name?: string;
    onChange: (name: string, value: number) => void;
    value?: string | number;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InputCurrency);
