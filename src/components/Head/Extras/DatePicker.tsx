import { DatePicker as CommonDatePicker } from 'src/components/common';
import '../styles.scss';

export const DatePicker = ({ value, onChange, ...props }) => {
  const handleChange = (_, date) => onChange(date);
  return (
    <CommonDatePicker
      containerClassName="cmp-head-extras-date-picker"
      onChange={handleChange}
      selected={value}
      popperPlacement="bottom-end"
      {...props}
    />
  );
};
