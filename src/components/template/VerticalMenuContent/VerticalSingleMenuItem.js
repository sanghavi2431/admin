import React, { useState } from "react";
import { Menu, Tooltip } from "@/components/ui";
import VerticalMenuIcon from "./VerticalMenuIcon";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { AuthorityCheck } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import NavigationPopup from "@/components/custom/NavigationPopup";
import { setSideNavCollapse } from "@/store/theme/themeSlice";

const { MenuItem } = Menu;

const CollapsedItem = ({ title, translateKey, children }) => {
  const { t } = useTranslation();
  return (
    <Tooltip
      title={t(translateKey) || title}
      placement="right"
      wrapperClass="w-full px-4"
    >
      {children}
    </Tooltip>
  );
};

const DefaultItem = (props) => {
  const dispatch = useDispatch();
  const { nav, onLinkClick, sideCollapsed, userAuthority } = props;
  const sideBarDisabled = useSelector(
    (state) => state.auth.user.sideBarDisabled
  );
  const progressState = useSelector((state) => state.auth.user.progressState);
  const allTrue = Object.values(progressState).every((value) => value === true);

  const shouldDisableSidebar =
    sideBarDisabled ||
    // (!allTrue && nav.title === "Dashboard") ||
    (!allTrue && nav.title === "Task Dashboard");

  // Check if the current nav.key is the last key in progressState
  const isLastProgress = nav.key == "templateMap";
  const hasSubMenu = nav.subMenu && nav.subMenu.length > 0; // Check if the item has a submenu

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSubMenuClick = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    dispatch(setSideNavCollapse(true));
    setIsPopupOpen(false);
  };

  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
      {shouldDisableSidebar ? (
        <MenuItem
          key={nav.key}
          eventKey={nav.key}
          className={`bg-white rounded-[11px] shadow mb-2 cursor-not-allowed ${sideCollapsed ? "p-0" : ""
            }`}
        >
          <div className="flex items-center h-full w-full">
            <VerticalMenuIcon icon={nav.icon} />
            {!sideCollapsed && (
              <span>
                <Trans i18nKey={nav.translateKey} defaults={nav.title} />
              </span>
            )}
          </div>
          {/* {progressState[nav.key] === true && (
            <div className="relative">
              {!isLastProgress && (
                <span className="border-l border-dashed border-gray-400 h-8 absolute right-[45%] top-8 transform -translate-y-1/2"></span>
              )}

              <FaCircleCheck className="text-green-500 w-4 h-4" />
            </div>
          )}
          {progressState[nav.key] === false && (
            <div className="relative">
              {!isLastProgress && (
                <span className="border-l border-dashed border-gray-400 h-8 absolute right-[45%] top-8 transform -translate-y-1/2"></span>
              )}
              <FaRegCircle className="text-gray-400 w-4 h-4" />
            </div>
          )} */}
        </MenuItem>
      ) : (
        <MenuItem
          key={nav.key}
          eventKey={nav.key}
          className={`bg-white rounded-[11px] shadow ${sideCollapsed ? "p-0" : ""
            }`}
        >
          {hasSubMenu ? (
            <div
              onClick={handleSubMenuClick}
              className="flex items-center justify-between h-full w-full cursor-pointer"
            >
              <div className="flex items-center">
                <VerticalMenuIcon icon={nav.icon} />
                {!sideCollapsed && (
                  <span>
                    <Trans i18nKey={nav.translateKey} defaults={nav.title} />
                  </span>
                )}
              </div>
            </div>
          ) : (
            <Link
              to={nav.path}
              onClick={() =>
                onLinkClick?.({
                  key: nav.key,
                  title: nav.title,
                  path: nav.path,
                })
              }
              className="flex items-center justify-between h-full w-full"
            >
              <div className="flex items-center">
                <VerticalMenuIcon icon={nav.icon} />
                {!sideCollapsed && (
                  <span>
                    <Trans i18nKey={nav.translateKey} defaults={nav.title} />
                  </span>
                )}
              </div>
              {/* {progressState[nav.key] === true && (
              <div className="relative">
                {!isLastProgress && (
                  <span className="border-l border-dashed border-gray-400 h-8 absolute right-[45%] top-8 transform -translate-y-1/2"></span>
                )}

                <FaCircleCheck className="text-green-500 w-4 h-4" />
              </div>
            )} */}
              {/* {progressState[nav.key] === false && (
              <div className="relative">
                {!isLastProgress && (
                  <span className="border-l border-dashed border-gray-400 h-8 absolute right-[45%] top-8 transform -translate-y-1/2"></span>
                )}
                <FaRegCircle className="text-gray-400 w-4 h-4" />
              </div>
            )} */}
            </Link>
          )}
        </MenuItem>
      )}

      {hasSubMenu && (
        <NavigationPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          nav={nav}
          onLinkClick={onLinkClick}
        />
      )}
    </AuthorityCheck>
  );
};

const VerticalSingleMenuItem = ({
  nav,
  onLinkClick,
  sideCollapsed,
  userAuthority,
}) => {
  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
      {sideCollapsed ? (
        <CollapsedItem title={nav.title} translateKey={nav.translateKey}>
          <DefaultItem
            nav={nav}
            sideCollapsed={sideCollapsed}
            onLinkClick={onLinkClick}
            userAuthority={userAuthority}
          />
        </CollapsedItem>
      ) : (
        <DefaultItem
          nav={nav}
          sideCollapsed={sideCollapsed}
          onLinkClick={onLinkClick}
          userAuthority={userAuthority}
        />
      )}
    </AuthorityCheck>
  );
};

export default VerticalSingleMenuItem;
