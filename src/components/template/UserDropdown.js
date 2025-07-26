import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Avatar, Dropdown } from "@/components/ui";
import withHeaderItem from "@/utils/hoc/withHeaderItem";
import useAuth from "@/utils/hooks/useAuth";

const dropdownItemList = [
  // {
  //   label: "Homepage",
  //   path: "/",
  //   iconUrl: "/img/icons/home.png",
  // },
  // {
  //   label: "Help & Support",
  //   path: "/",  
  //   iconUrl: "/img/icons/help.png",
  // },
  // {
  //   label: "About Smart Hygiene",
  //   path: "/",
  //   iconUrl: "/img/icons/about-us.png",
  // },
  // {
  //   label: "Download the App",
  //   path: "/",
  //   iconUrl: "/img/icons/download-circular-button.png",
  // },
  // {
  //   label: "E-Commerce Store",
  //   path: "/",
  //   iconUrl: "/img/icons/shopping-cart.png",
  // },
  // {
  //   label: "Contact Us",
  //   path: "/help",
  //   iconUrl: "/img/icons/send.png",
  // },
];

export const UserDropdown = ({ className }) => {
  // bind this
  const { userName, email, clientId } = useSelector((state) => state.auth.user);

  const { signOut } = useAuth();

  const UserAvatar = (
    <div className={classNames(className, "flex items-center gap-2")}>
      <Avatar
        size={36}
        shape="rounded"
        icon={<HiOutlineUser />}
        className="rounded-lg shadow-custom"
      />
      {/* <div className="hidden md:block"> */}
      {/* <div className="text-xs capitalize">{userName}</div> */}
      {/* <div className="font-bold">User01</div> */}
      {/* </div> */}
    </div>
  );

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 240 }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <Dropdown.Item variant="header">
          <div className="py-2 px-3 flex justify-between items-center gap-2">
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                Welcome {userName || clientId?.label}
              </div>
              {/* <div className="text-xs">{email}</div> */}
            </div>
            <Avatar
              size={36}
              shape="rounded"
              icon={<HiOutlineUser />}
              className="rounded-lg shadow-custom"
            />
          </div>
        </Dropdown.Item>
        {dropdownItemList.length > 0 && <Dropdown.Item variant="divider" />}
        {dropdownItemList.map((item) => (
          <Dropdown.Item
            eventKey={item.label}
            key={item.label}
            className="mb-1"
          >
            <Link className="flex gap-2 items-center" to={item.path}>
              {/* <span className="text-xl opacity-50">{item.icon}</span> */}
              <img src={item.iconUrl} />
              <span>{item.label}</span>
            </Link>
          </Dropdown.Item>
        ))}
        <Dropdown.Item variant="divider" />
        <Dropdown.Item onClick={signOut} eventKey="Sign Out" className="gap-2">
          {/* <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span> */}
          <img src="/img/icons/logout.png" />
          <span className="text-[#FF2D2D]">Log Out</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default withHeaderItem(UserDropdown);
