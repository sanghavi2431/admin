import React, { useEffect } from "react";
import { Menu, Tooltip } from "components/ui";
import VerticalMenuIcon from "./VerticalMenuIcon";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { AuthorityCheck } from "components/shared";
import { useSelector } from "react-redux";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const { MenuItem } = Menu;

const CollapsedItem = ({ title, translateKey, children }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t(translateKey) || title} placement="right">
      {children}
    </Tooltip>
  );
};

const DefaultItem = (props) => {
  const { nav, onLinkClick, sideCollapsed, userAuthority } = props;
  const sideBarDisabled = useSelector(state => state.auth.user.sideBarDisabled);
  const progressState = useSelector((state) => state.auth.user.progressState);
  const allTrue = Object.values(progressState).every(value => value === true);
  
  const shouldDisableSidebar = sideBarDisabled || (!allTrue && nav.title === "Dashboard") || (!allTrue && nav.title === "Task Dashboard");

  // Check if the current nav.key is the last key in progressState
  const isLastProgress = nav.key == "templateMap" ;

  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
      {shouldDisableSidebar ? (
        <MenuItem
          key={nav.key}
          eventKey={nav.key}
          className="mb-2 cursor-not-allowed gap-0 justify-between"
        >
          <div className="flex items-center">
          <VerticalMenuIcon icon={nav.icon} />
          {!sideCollapsed && (
            <span>
              <Trans i18nKey={nav.translateKey} defaults={nav.title} />
            </span>
          )}
          </div>
            {progressState[nav.key] === true && (
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
            )}
        </MenuItem>
      ) : (
        <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
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
            {progressState[nav.key] === true && (
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
            )}
          </Link>
        </MenuItem>
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
