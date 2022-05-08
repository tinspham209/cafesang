import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu } from 'react-pro-sidebar';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { isActive, MenuType, SidebarMenu } from 'src/appConfig/sidebar';
import { setCollapseSidebar } from 'src/redux/commonRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { Image, ViewClickable } from '../common';
import './styles.scss';

// More info: https://www.npmjs.com/package/react-pro-sidebar
const Sidebar: React.FC<Props> = ({ showSidebar, collapseSidebar, onCollapSidebar }) => {
  if (!showSidebar) return null;
  const showMiniLogo = collapseSidebar;

  const filterSidebar = (menu: MenuType[]) => menu;

  const createMenuItem = (x: MenuType) => (
    <MenuItem key={x.title} icon={x.icon} active={(x.href && isActive(x.href)) || false}>
      {x.title}
      {x.href && <Link to={x.href} />}
    </MenuItem>
  );

  const createMenu = (menu: MenuType[]) =>
    menu.map(m => {
      if (m.subMenu?.length) {
        return (
          <SubMenu
            key={m.title}
            //@ts-ignore title is ReactNode
            title={m.href ? <Link to={m.href}>{m.title}</Link> : m.title}
            icon={m.icon}
            className={['cmp-sidebar__subMenu', isActive(m.href, true) && 'active'].join(' ')}>
            {createMenu(filterSidebar(m.subMenu))}
          </SubMenu>
        );
      } else {
        return createMenuItem(m);
      }
    });

  return (
    <ProSidebar className="cmp-sidebar" collapsed={collapseSidebar}>
      <SidebarHeader className="cmp-sidebar__header">
        <Link to={PATHS.home}>
          <Image src={showMiniLogo ? IMAGES.logoOnly : IMAGES.logoFullWhite} className="cmp-sidebar__image--header" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <Menu>{createMenu(filterSidebar(SidebarMenu))}</Menu>
      </SidebarContent>

      {/* <View
        className="cmp-sidebar__footer__image"
        align="center"
        justify="flex-end"
        flexGrow={1}
        renderIf={!collapseSidebar}>
        <Image src={IMAGES.lumisightVersion} style={{ maxWidth: 54 }} />
        <Text className="mt-8 text-is-14">{`Version ${VERSION_NUMBER}`}</Text>
      </View> */}

      <SidebarFooter className="cmp-sidebar__footer">
        <ViewClickable align="center" onClick={() => onCollapSidebar(!collapseSidebar)}>
          {collapseSidebar ? (
            <i className="cmp-sidebar__footer-icon">
              <IoIosArrowForward size={20} />
            </i>
          ) : (
            <i className="cmp-sidebar__footer-icon">
              <IoIosArrowBack size={20} />
            </i>
          )}
        </ViewClickable>
      </SidebarFooter>
    </ProSidebar>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  showSidebar: state.common.showSidebar,
  collapseSidebar: state.common.collapseSidebar,
});

const mapDispatchToProps = {
  onCollapSidebar: setCollapseSidebar,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
