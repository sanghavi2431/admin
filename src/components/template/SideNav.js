import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_MODE_DARK,
  NAV_MODE_THEMED,
  NAV_MODE_TRANSPARENT,
} from "@/constants/theme.constant";
import navigationConfigWolooTaskManagement from "@/configs/navigation.config/navigationConfigWolooTaskManagement";
import navigationConfigWolooDiscovery from "@/configs/navigation.config/navigationdiscovery";
import VerticalMenuContent from "@/components/template/VerticalMenuContent";
import useResponsive from "@/utils/hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { setSideNavCollapse } from "@/store/theme/themeSlice";

const SideNav = () => {
  const dispatch = useDispatch();
  // const [isHovered, setIsHovered] = useState(false);
  const isSideNavCollapsed = useSelector(
    (state) => state.theme.layout.sideNavCollapse
  );
  const themeColor = useSelector((state) => state.theme.themeColor);
  const primaryColorLevel = useSelector((state) => state.theme.primaryColorLevel);
  const navMode = useSelector((state) => state.theme.navMode);
  const mode = useSelector((state) => state.theme.mode);
  const currentRouteKey = useSelector((state) => state.base.common.currentRouteKey);
  const userAuthority = useSelector((state) => state.auth.user.authority);
  const roleAccess = useSelector((state) => state.auth.user?.rolesAccess);
  const loo_discovery = useSelector((state) => state.auth.user?.loo_discovery);
  const selectedModule = useSelector((state) => state.auth.user?.selectedModule);
  const { larger } = useResponsive();

  let pages = roleAccess;
  let navigationConfig = selectedModule?.value !== 2 
    ? (loo_discovery ? navigationConfigWolooDiscovery : navigationConfigWolooTaskManagement) 
    : [];

  const sideNavColor = () => {
    return navMode === NAV_MODE_THEMED 
      ? `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}` 
      : `side-nav-DEFAULT`;
  };

  const logoMode = () => {
    return navMode === NAV_MODE_THEMED ? NAV_MODE_DARK 
      : navMode === NAV_MODE_TRANSPARENT ? mode 
      : navMode;
  };

  const menuContent = (
    <VerticalMenuContent
      navMode={navMode}
      collapsed={isSideNavCollapsed}
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
          style={{ width: isSideNavCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH }}
          className={`h-full transition-all duration-300 ${sideNavColor()}`}
          onMouseEnter={() => dispatch(setSideNavCollapse(false))}
          onMouseLeave={() => dispatch(setSideNavCollapse(true))}
        >
          {menuContent}
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
