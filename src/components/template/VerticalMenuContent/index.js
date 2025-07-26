import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Menu } from "@/components/ui";
import VerticalSingleMenuItem from "./VerticalSingleMenuItem";
import VerticalCollapsedMenuItem from "./VerticalCollapsedMenuItem";
import { themeConfig } from "@/configs/theme.config";
import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from "@/constants/navigation.constant";
import useMenuActive from "@/utils/hooks/useMenuActive";

const { MenuGroup } = Menu;

const VerticalMenuContent = (props) => {
  const {
    navMode,
    collapsed,
    routeKey,
    navigationTree = [],
    userAuthority = [],
    onMenuItemClick,
    pages,
  } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const is_looDiscovery = useSelector((state) => state.theme.loo_discovery);

  const roleId = useSelector((state) => state.auth.user.roleId);

  const [defaulExpandKey, setDefaulExpandKey] = useState([]);

  const { activedRoute } = useMenuActive(navigationTree, routeKey);

  useEffect(() => {
    if (defaulExpandKey.length === 0 && activedRoute?.parentKey) {
      setDefaulExpandKey([activedRoute?.parentKey]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activedRoute?.parentKey]);

  const handleLinkClick = () => {
    onMenuItemClick?.();
  };
  const getNavItem = (nav) => {
    if (nav.subMenu.length === 0 && nav.type === NAV_ITEM_TYPE_ITEM) {
      return (
        <VerticalSingleMenuItem
          key={nav.key}
          nav={nav}
          onLinkClick={handleLinkClick}
          sideCollapsed={collapsed}
          userAuthority={userAuthority}
        />
      );
    }

    if (nav.subMenu.length > 0 && nav.type === NAV_ITEM_TYPE_COLLAPSE) {
      return (
        <VerticalCollapsedMenuItem
          key={nav.key}
          nav={nav}
          onLinkClick={onMenuItemClick}
          sideCollapsed={collapsed}
          userAuthority={userAuthority}
        />
      );
    }
    if (nav.subMenu.length > 0) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <MenuGroup key={nav.key} label={nav.translateKey || nav.title}>
            <div className="flex flex-col items-center justify-center gap-4">
              {nav.subMenu?.map((subNav) => {
                if (pages?.[subNav?.path] || subNav?.path === "") {
                  return (<div className="w-full h-full flex items-center justify-center">
                    <VerticalSingleMenuItem
                      key={subNav.key}
                      nav={subNav}
                      onLinkClick={onMenuItemClick}
                      sideCollapsed={collapsed}
                      userAuthority={userAuthority}
                    />
                  </div>
                  );
                }
              })}
            </div>
          </MenuGroup>
        </div>
      );
    } else {
      <MenuGroup label={nav.title} />;
    }
    // }
  };

  return (
    <Menu
      className="bg-[#FFEB00] h-full overflow-y-auto rounded-custom shadow-custom"
      variant={navMode}
      sideCollapsed={collapsed}
      defaultActiveKeys={activedRoute?.key ? [activedRoute.key] : []}
      defaultExpandedKeys={defaulExpandKey}
    >
      {navigationTree.map((nav) => getNavItem(nav))}
    </Menu>
  );
};

VerticalMenuContent.defaultProps = {
  navMode: themeConfig.navMode,
};

export default VerticalMenuContent;
