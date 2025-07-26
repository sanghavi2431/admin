import React from "react";
import navigationIcon from "@/configs/navigation-icon.config";

export const Icon = ({ component: Component }) => {
  return (
    <>
      <Component />
    </>
  );
};

const VerticalMenuIcon = ({ icon, gutter }) => {
  if (typeof icon !== "string" && !icon) {
    return <></>;
  }

  return (
    <div className={`text-2xl`}>
      <div className="flex items-center justify-center w-11 h-11">
        {typeof navigationIcon[icon] === "string" ? (
          <img src={navigationIcon[icon]} alt={icon} className="p-2" />
        ) : (
          navigationIcon[icon]
        )}
      </div>
    </div>
  );
};

VerticalMenuIcon.defaultProps = {
  gutter: true,
};

export default VerticalMenuIcon;
