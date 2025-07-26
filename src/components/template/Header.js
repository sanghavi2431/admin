import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HEADER_HEIGHT_CLASS } from "@/constants/theme.constant";
import { constants } from "@/constants/woloo.constant";

const Header = (props) => {
  const { headerStart, headerEnd, headerMiddle, className, container } = props;
  const { roleId, userName, expiryDate, isFreeTrial, clientId } = useSelector((state) => state.auth.user);
  const [currentTime, setCurrentTime] = useState("");
  const [daysRemain, setDaysRemain] = useState(null);

  const formatDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}.${formattedMinutes} ${ampm} ${date.getDate()} ${date.toLocaleString(
      "en",
      { month: "short" }
    )} ${date.getFullYear()}`;
  };

  const getUserRole = () => {
    switch (roleId) {
      case 1:
        return "Super Admin";
      case 3:
        return "Facility Manager";
      case 8:
        return "Corporate Admin";
      case 9:
        return "Woloo Host";
      case 10:
        return "Franchise";
      case 11:
        return "Content Writer";
      case 13:
        return "Client";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    setCurrentTime(formatDate());
    const intervalId = setInterval(() => {
      setCurrentTime(formatDate());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (expiryDate) {
      const currentDate = new Date();
      const normalizedCurrentDate = new Date(Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate()
      ));

      const [year, month, day] = expiryDate.split('-').map(Number);
      const expiry = new Date(Date.UTC(year, month - 1, day));
      const timeDiff = expiry - normalizedCurrentDate;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      setDaysRemain(Math.max(days, 1));
    }
  }, [expiryDate]);

  return (
    <header
      className={classNames("header z-30", className)}
    >
      <div
        className={classNames(
          "header-wrapper pl-2 mt-2",
          HEADER_HEIGHT_CLASS,
          container && "container mx-auto"
        )}
      // style={{paddingLeft: "1px"}}
      >
        <div className="header-action header-action-start">
          {headerStart}
          <div className="mx-2 flex flex-col justify-center">
            <span className="text-base text-[#00261C] font-bold">
              {userName || clientId?.label} ({getUserRole()})
            </span>
            <span className="text-sm">{currentTime}</span>
          </div>
        </div>

        {headerMiddle && (
          <div className="header-action header-action-middle">
            {headerMiddle}
          </div>
        )}
        <div className="header-action header-action-end">
          {(roleId === constants?.role_id?.client || roleId === constants?.role_id?.facility_manager) && isFreeTrial && daysRemain !== null && (
            <div className="font-semibold text-lg">
              Your Trial shall end in {daysRemain} {daysRemain === 1 ? "Day" : "Days"}.{" "}
              <Link to={"/subscriptionPlans"} className="underline">
                Renew it Now
              </Link>
            </div>
          )}
          {headerEnd}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  headerStart: PropTypes.node,
  headerEnd: PropTypes.node,
  container: PropTypes.bool,
};

export default Header;
