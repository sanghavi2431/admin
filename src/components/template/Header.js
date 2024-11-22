import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { HEADER_HEIGHT_CLASS } from "constants/theme.constant";
import { MdOutlineDateRange } from "react-icons/md";

const Header = (props) => {
  const { headerStart, headerEnd, headerMiddle, className, container } = props;

  return (
    <header
      style={{ backgroundColor: "#FFEB00" }}
      className={classNames("header z-30", className)}
    >
      <div
        className={classNames(
          "header-wrapper",
          "bg-red",
          HEADER_HEIGHT_CLASS,
          container && "container mx-auto"
        )}
      >
        <div className="header-action header-action-start">
          {headerStart}
          <div className="mx-2 flex items-center gap-2">
            <MdOutlineDateRange size={20} />
            {new Date().toISOString().split("T")[0]}
          </div>
        </div>
        {headerMiddle && (
          <div className="header-action header-action-middle">
            {headerMiddle}
          </div>
        )}
        <div className="header-action header-action-end">{headerEnd}</div>
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
