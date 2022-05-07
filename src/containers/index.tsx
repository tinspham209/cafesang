import { Location } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps, Switch, useHistory } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { Screen } from 'src/components/common';
import Navbar from 'src/components/Navbar';
import Sidebar from 'src/components/Sidebar';
import { exchangeTokenAsync, setToken } from 'src/redux/authRedux/actions';
import { setShowSidebar } from 'src/redux/commonRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { Navigator } from 'src/services';
import CoursesContainer from './CoursesContainers';
import Home from './Home';
import MyProfile from './ProfileContainers/MyProfile';
import LoadingContainer from './StartupContainers/LoadingContainer';
import NotFound from './StartupContainers/NotFound';
import SplashScreen from './StartupContainers/SplashScreen';
import ToastContainer from './StartupContainers/ToastContainer';
import Signin from './UAMContainer/Signin';

const Routing: React.FC<{ location: Location }> = props => {
  Navigator.setTopHistory(useHistory());

  return (
    <Screen>
      <Navbar />
      <Sidebar />
      <Switch location={props.location}>
        <Route path={PATHS.root} render={() => <Redirect to={PATHS.signIn} />} exact />
        <Route path={PATHS.signIn} component={Signin} />

        <CustomRoute pageRequiredAuth exact path={PATHS.home} component={Home} />
        <CustomRoute pageRequiredAuth exact path={PATHS.myProfile} component={MyProfile} />
        <CustomRoute pageRequiredAuth exact path={PATHS.courses} component={CoursesContainer} />

        <Route component={NotFound} />
      </Switch>
      <LoadingContainer />
      <ToastContainer />
    </Screen>
  );
};

export default Routing;

const CRouting: React.FC<Props> = ({
  user,
  token,
  checkValidToken,
  setShowSidebar,
  isAuthenticated,
  pageRequiredAuth,
  pathname,
  component,
  ...rest
}) => {
  const renderRoute = (Component: any) => (props: RouteProps) => {
    if (pathname !== PATHS.signIn) {
      if (user === null) {
        // const token = TokenService.getExchangedToken();
        checkValidToken();
      }
    }

    if (isAuthenticated === null) return <SplashScreen />;

    if ((isAuthenticated && pageRequiredAuth) || (!isAuthenticated && !pageRequiredAuth)) {
      // Before render component, check permission first
      return <Component {...props} />;
    }

    const redirectPath = isAuthenticated ? PATHS.home : PATHS.signIn;
    const redirectProps = {
      to: {
        pathname: redirectPath,
        state: { from: props.location },
      },
    };
    if (isAuthenticated) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
    return <Redirect {...redirectProps} />;
  };

  return <Route {...rest} render={renderRoute(component)} />;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteProps & { pageRequiredAuth?: boolean };

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token,
  pathname: state.router.location.pathname,
});

const mapDispatchToProps = {
  setToken: setToken,
  checkValidToken: exchangeTokenAsync.request,
  setShowSidebar: setShowSidebar,
};

const CustomRoute = connect(mapStateToProps, mapDispatchToProps)(CRouting);
