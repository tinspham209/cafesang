import React, { useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import './styles.scss';
import View from '../View';
import LazyLoad from 'react-lazyload';

const ImageLazy: React.FC<Props> = ({ children, className, style, containerClassName, alt = 'unset', ...props }) => {
  const refPlaceholder = useRef<HTMLDivElement>(null);

  const removePlaceholder = () => {
    refPlaceholder.current?.remove();
  };

  return (
    <View className={cn('image-lazy__container', className)} style={style}>
      <div className="image-lazy__placeholder" ref={refPlaceholder} />
      <LazyLoad>
        <img
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          className={cn('image-lazy__img', className)}
          alt={alt}
          style={style}
          {...props}
        />
      </LazyLoad>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    containerClassName?: string;
  };

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImageLazy);
