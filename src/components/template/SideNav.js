import React, { useEffect } from "react";
import classNames from "classnames";
import { Input, ScrollBar, Select } from "components/ui";
import PropTypes from "prop-types";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_MODE_DARK,
  NAV_MODE_THEMED,
  NAV_MODE_TRANSPARENT,
  SIDE_NAV_CONTENT_GUTTER,
  LOGO_X_GUTTER,
} from "constants/theme.constant";
import Logo from "components/template/Logo";
import navigationConfigWolooTaskManagement from "configs/navigation.config/navigationConfigWolooTaskManagement";
import navigationConfigWolooDiscovery from "configs/navigation.config/navigationdiscovery";
import VerticalMenuContent from "components/template/VerticalMenuContent";
import useResponsive from "utils/hooks/useResponsive";
import { useSelector } from "react-redux";
import { Field } from "formik";
import Dropdown_For_Nav from "./DropdownForNav";
import { useNavigate } from "react-router-dom";

const sideNavStyle = {
  width: SIDE_NAV_WIDTH,
  minWidth: SIDE_NAV_WIDTH,
};

const sideNavCollapseStyle = {
  width: SIDE_NAV_COLLAPSED_WIDTH,
  minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const SideNav = () => {
  const themeColor = useSelector((state) => state.theme.themeColor);
  const primaryColorLevel = useSelector(
    (state) => state.theme.primaryColorLevel
  );
  // const navigate = useNavigate();
  const navMode = useSelector((state) => state.theme.navMode);
  const mode = useSelector((state) => state.theme.mode);
  const direction = useSelector((state) => state.theme.direction);
  const currentRouteKey = useSelector(
    (state) => state.base.common.currentRouteKey
  );
  const sideNavCollapse = useSelector(
    (state) => state.theme.layout.sideNavCollapse
  );
  const userAuthority = useSelector((state) => state.auth.user.authority);
  // const roleId = useSelector((state) => state.auth.user.roleId);
  const roleAccess = useSelector((state) => state.auth.user?.rolesAccess);
  const loo_discovery = useSelector((state) => state.auth.user?.loo_discovery);
  const selectedModule = useSelector(
    (state) => state.auth.user?.selectedModule
  );
  let pages = roleAccess;
  let navigationConfig;

  if (selectedModule?.value !== 2) {
    navigationConfig = loo_discovery
      ? navigationConfigWolooDiscovery
      : navigationConfigWolooTaskManagement;
  } else {
    navigationConfig = [];
  }
  // let navigationConfig = {
  //   "wolooDiscovery":navigationConfigWolooDiscovery,
  //   "taskManagement":navigationConfigWolooTaskManagement
  // }

  const { larger } = useResponsive();

  const sideNavColor = () => {
    if (navMode === NAV_MODE_THEMED) {
      // return `bg-yellow-300 side-nav-DEFAULT`
      return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`;
    }
    return `side-nav-DEFAULT`;
  };

  const logoMode = () => {
    if (navMode === NAV_MODE_THEMED) {
      return NAV_MODE_DARK;
    }

    if (navMode === NAV_MODE_TRANSPARENT) {
      return mode;
    }

    return navMode;
  };

  const menuContent = (
    <VerticalMenuContent
      navMode={navMode}
      collapsed={sideNavCollapse}
      navigationTree={navigationConfig}
      routeKey={currentRouteKey}
      userAuthority={userAuthority}
      pages={pages}
    />
  );

  return (
    <>
      {larger.md && (
        <div
          style={sideNavCollapse ? sideNavCollapseStyle : sideNavStyle}
          className={classNames(
            "side-nav",
            sideNavColor(),
            // !sideNavCollapse && "side-nav-expand"
            "side-nav-expand"
          )}
        >
          <div className={`px-2 bg-white`}>
            <div
              className={classNames(
                "side-nav-header",
                "rounded-lg",
                sideNavCollapse && "sticky top-0 z-[9999999]"
              )}
              style={{
                backgroundColor: "#FFEB00",
                paddingTop: "2px",
                paddingBottom: "6px",
              }}
            >
              <Logo
                mode={logoMode()}
                type={sideNavCollapse ? "streamline" : "full"}
                gutter={
                  sideNavCollapse ? SIDE_NAV_CONTENT_GUTTER : LOGO_X_GUTTER
                }
              />
            </div>
          </div>
          {/* {sideNavCollapse ? (
            menuContent
          ) : (
            <div className="side-nav-content">
              <ScrollBar autoHide direction={direction}>
                {menuContent}
              </ScrollBar>
            </div>
          )} */}
          <div className="side-nav-content bg-white p-2">
            {/* <ScrollBar autoHide direction={direction}> */}
            {menuContent}
            {/* </ScrollBar> */}
          </div>
        </div>
      )}
    </>
  );
};

SideNav.propTypes = {
  themed: PropTypes.bool,
  darkMode: PropTypes.bool,
  themeColor: PropTypes.string,
};

SideNav.defaultProps = {
  themed: false,
  darkMode: false,
  themeColor: "",
};

export default SideNav;
