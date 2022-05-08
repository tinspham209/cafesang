import React from 'react';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { Image, Text, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const Home: React.FC<Props> = () => {
  React.useEffect(() => {
    document.title = `Home - webadmin - cafesang`;
  }, []);
  return (
    <View flexGrow={1} justify="center" align="center">
      <Image src={IMAGES.background} className="ctn-home__background" />
      <Text className="has-text-centered">Welcome to cafesang Admin</Text>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
