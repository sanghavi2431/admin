import React from "react";
import { Menu, Dropdown } from "@/components/ui";
import { Link } from "react-router-dom";
import VerticalMenuIcon from "./VerticalMenuIcon";
import { Trans } from "react-i18next";
import { AuthorityCheck } from "@/components/shared";
import { useSelector } from "react-redux";

const { MenuItem } = Menu;

const DefaultItem = ({ nav, onLinkClick, userAuthority }) => {
  const roleAccess = useSelector((state) => state.auth.user?.rolesAccess);
  const pages = roleAccess;
  const menuItem = (
    <MenuItem
      key={nav.key}
      eventKey={nav.key}
      className="bg-white rounded-[11px] shadow mb-2"
    >
      <div className="flex items-center">
        <VerticalMenuIcon icon={nav.icon} />
        <span>
          <Trans i18nKey={nav.translateKey} defaults={nav.title} />
        </span>
      </div>
    </MenuItem>
  );

  return (
    <AuthorityCheck
      userAuthority={userAuthority}
      authority={nav.authority}
      className="w-full"
    >
      {/* <MenuCollapse
				label={
					<>
						<VerticalMenuIcon icon={nav.icon} />
						<span>
							<Trans i18nKey={nav.translateKey} defaults={nav.title} />
						</span>
					</>
				}
				key={nav.key} 
				eventKey={nav.key} 
				expanded={false}  
				className="flex items-center bg-white rounded-[11px] shadow mb-2"
			>
				{
					nav.subMenu.map(subNav => {

					return(roleAccess[subNav?.path]&&
							<AuthorityCheck 
							userAuthority={userAuthority} 
							authority={subNav.authority}
							key={subNav.key}
						>
							<MenuItem eventKey={subNav.key}> 
								{subNav.path 
									? 
									<Link 
										className="h-full w-full flex items-center" 
										onClick={() => onLinkClick?.(
											{
												key: subNav.key,
												title: subNav.title,
												path: subNav.path,
											}
										)} 
										to={subNav.path}
									>
										<span>
											<Trans i18nKey={subNav.translateKey} defaults={subNav.title} />
										</span>
									</Link>
									: 
									<span>
										<Trans i18nKey={subNav.translateKey} defaults={subNav.title} />	
									</span>
								}
							</MenuItem>
						</AuthorityCheck>)
					}
					)
				}
			</MenuCollapse> */}

      <Dropdown
        trigger="hover"
        renderTitle={menuItem}
        placement="middle-start-top"
        className="w-full"
      >
        {nav.subMenu.map((subNav) => {
          if (pages?.[subNav?.path]) {
            return (
              <AuthorityCheck
                userAuthority={userAuthority}
                authority={subNav.authority}
                key={subNav.key}
              >
                <Dropdown.Item eventKey={subNav.key}>
                  {subNav.path ? (
                    <Link
                      className="h-full w-full flex items-center"
                      onClick={() =>
                        onLinkClick?.({
                          key: subNav.key,
                          title: subNav.title,
                          path: subNav.path,
                        })
                      }
                      to={subNav.path}
                    >
                      <span>
                        <Trans
                          i18nKey={subNav.translateKey}
                          defaults={subNav.title}
                        />
                      </span>
                    </Link>
                  ) : (
                    <span>
                      <Trans
                        i18nKey={subNav.translateKey}
                        defaults={subNav.title}
                      />
                    </span>
                  )}
                </Dropdown.Item>
              </AuthorityCheck>
            );
          }
        })}
      </Dropdown>
    </AuthorityCheck>
  );
};

const CollapsedItem = ({ nav, onLinkClick, userAuthority }) => {
  const roleAccess = useSelector((state) => state.auth.user?.rolesAccess);
  const pages = roleAccess;
  const menuItem = (
    <MenuItem
      key={nav.key}
      eventKey={nav.key}
      className="bg-white rounded-[11px] shadow mb-2 p-0"
    >
      <VerticalMenuIcon icon={nav.icon} />
    </MenuItem>
  );

  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
      <Dropdown
        trigger="hover"
        renderTitle={menuItem}
        placement="middle-start-top"
        toggleClassName="px-3"
      >
        {nav.subMenu.map((subNav) => {
          if (pages?.[subNav?.path]) {
            return (
              <AuthorityCheck
                userAuthority={userAuthority}
                authority={subNav.authority}
                key={subNav.key}
              >
                <Dropdown.Item eventKey={subNav.key}>
                  {subNav.path ? (
                    <Link
                      className="h-full w-full flex items-center"
                      onClick={() =>
                        onLinkClick?.({
                          key: subNav.key,
                          title: subNav.title,
                          path: subNav.path,
                        })
                      }
                      to={subNav.path}
                    >
                      <span>
                        <Trans
                          i18nKey={subNav.translateKey}
                          defaults={subNav.title}
                        />
                      </span>
                    </Link>
                  ) : (
                    <span>
                      <Trans
                        i18nKey={subNav.translateKey}
                        defaults={subNav.title}
                      />
                    </span>
                  )}
                </Dropdown.Item>
              </AuthorityCheck>
            );
          }
        })}
      </Dropdown>
    </AuthorityCheck>
  );
};

const VerticalCollapsedMenuItem = ({ sideCollapsed, ...rest }) => {
  return sideCollapsed ? (
    <CollapsedItem {...rest} />
  ) : (
    <DefaultItem {...rest} />
  );
};

export default VerticalCollapsedMenuItem;
