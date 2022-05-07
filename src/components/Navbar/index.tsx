import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import cn from 'classnames';
import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { signOutAsync } from 'src/redux/authRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import navigator from 'src/services/navigator';
import { Button, Image, Text, View } from '../common';
import './styles.scss';

const Navbar: React.FC<Props> = ({ showNavbar, collapseSidebar, onSignOut, user, isAuthenticated }) => {
  const navbarRef = React.useRef<HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorNotiEl, setAnchorNotiEl] = React.useState<null | HTMLElement>(null);

  const isSmallScreen = useMediaQuery('(max-width:750px)');

  if (!showNavbar) return null;

  const getUserName = () => {
    return user?.email || `Anonymous`;
  };

  const getAvatarName = () => {
    const username = user?.email || `Anonymous`;
    return username.match(/\b(\w)/g);
  };

  const handleLogOut = () => {
    onSignOut();
    setAnchorEl(null);
    setAnchorNotiEl(null);
  };

  return (
    <nav
      className={cn('cmp-navbar navbar', {
        'is-collapse-sidebar': collapseSidebar,
        'is-open-menu': Boolean(anchorEl) || Boolean(anchorNotiEl),
      })}
      ref={navbarRef}
      role="navigation"
      aria-label="main navigation">
      <View className="cmp-navbar__container">
        <Link to={PATHS.home} className={`cmp-navbar__start cursor-pointer`}>
          {!isAuthenticated ? (
            <Image src={IMAGES.logoFullWhite} className={`cmp-navbar__img`} />
          ) : (
            <Text size={16}>&nbsp;</Text>
          )}
        </Link>
        <View renderIf={true} id="navigation-menu" className={cn('')}>
          <View isRow className={cn('navbar-end cmp-navbar__end')}>
            <View className={`cmp-navbar__end--item cursor-pointer`} renderIf={!isAuthenticated}>
              <Button onClick={() => navigator.navigate(PATHS.signIn)}>Login</Button>
            </View>
            <View
              className={`cmp-navbar__end--item cursor-pointer`}
              onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
              renderIf={isAuthenticated}>
              <ListItem alignItems="center">
                <ListItemAvatar
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeft: '2px solid #B7B9B8',
                    paddingLeft: '12px',
                  }}>
                  <Avatar className="cmp-navbar__end--item--avatar">{getAvatarName()}</Avatar>
                </ListItemAvatar>
                {!isSmallScreen && (
                  <ListItemText
                    primary={
                      <>
                        <Text size={16} className="fw-bold ml-8 text-color-black-800">
                          {getUserName()}
                        </Text>
                      </>
                    }
                    secondary={
                      <>
                        <Text size={12} className="fw-normal ml-8 text-color-black-800">
                          {`System Admin`}
                        </Text>
                      </>
                    }
                  />
                )}
                <ListItemAvatar style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IoMdArrowDropdown size={28} />
                </ListItemAvatar>
              </ListItem>
            </View>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PopoverClasses={{
                paper: 'cmp-navbar-menu-popover',
              }}
              PaperProps={{
                elevation: 2,
              }}>
              {[
                // {
                //   title: 'Change password',
                //   icon: <MdLockOutline size={20} color="#8D9094" />,
                //   onClick: () => {
                //     setOpenChangePasswordDialog(true);
                //   },
                // },
                {
                  title: 'Log out',
                  icon: <MdLogout size={20} color="#8D9094" />,
                  onClick: handleLogOut,
                },
              ].map(({ title, icon, onClick }, index) => (
                <MenuItem key={index} onClick={onClick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <Text size={16} className="fw-medium">
                    {title}
                  </Text>
                </MenuItem>
              ))}
            </Menu>
          </View>
        </View>
      </View>
    </nav>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IRootState) => ({
  showNavbar: state.common.showNavbar,
  isAuthenticated: state.auth.isAuthenticated,
  collapseSidebar: state.common.collapseSidebar,
  showSecondBurger: state.common.showSecondBurger,
  user: state.auth.user,
});

const mapDispatchToProps = {
  onSignOut: signOutAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
