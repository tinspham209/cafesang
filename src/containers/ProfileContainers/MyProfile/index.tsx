import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { Image, Text, View } from 'src/components/common';
import { signOutAsync } from 'src/redux/authRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
// import MFASwitch from './MFASwitch';
import './styles.scss';

const MyProfile: React.FC<Props> = ({ user, onSignOut }) => {
  const handleLogout = () => {
    onSignOut();
  };

  const getUserName = () => {
    if (user.email) return `${user.displayName}`;

    return 'My Profile';
  };

  return (
    <View className="ctn-my-profile">
      <View className="ctn-my-profile__info ctn-my-profile__content mb-4">
        <Image src={IMAGES.defaultUser} />
        <View>
          <Text size={24}>
            <b>{getUserName()}</b>
          </Text>
          <Text>{user.email}</Text>
        </View>
      </View>

      {/* <MFASwitch /> */}

      <View className="ctn-my-profile__content ctn-my-profile__action" onClick={handleLogout}>
        <View isRow align="center">
          <FaSignOutAlt size={20} />
          <Text className="ml-5">Logout</Text>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  onSignOut: signOutAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
