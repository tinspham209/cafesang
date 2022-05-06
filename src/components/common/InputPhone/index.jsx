import { useRef } from 'react';
import cn from 'classnames';
import PhoneInput from 'react-phone-number-input';

import './styles.scss';
import View from '../View';
import Element from '../Element';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';

export default ({ label, errorMessage, containerClassName = '', ...props }) => {
  const id = useRef(`input-${getRandomId()}`);

  // For change style of phone input, follow:
  // https://catamphetamine.gitlab.io/react-phone-number-input/
  return (
    <Element id={id.current} errorMessage={errorMessage} label={label} className={containerClassName}>
      <View>
        <PhoneInput
          international
          defaultCountry="US"
          className={cn('cmp-phoneinput', {
            'cmp-phoneinput__input--error': !isEmpty(errorMessage),
          })}
          {...props}
        />
      </View>
    </Element>
  );
};
