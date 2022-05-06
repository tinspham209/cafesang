import React from 'react';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { Image, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const SplashScreen: React.FC<Props> = () => {
  return (
    <View className="cmp-splash-screen">
      <Image src={IMAGES.logoFullBlack} className="cmp-splash-screen__image" />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
