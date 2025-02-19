import React from "react";
import Header from "@/components/template/Header";
import UserDropdown from "@/components/template/UserDropdown";
import View from "@/views";
import Logo from "@/components/template/Logo";

const HeaderActionsStart = () => {
  return (
    <div className="bg-primary rounded-custom shadow-custom flex justify-center mr-4" style={{ width: "80px", minWidth: "80px" }}>
      <Logo
        type="streamline"
      />
    </div>
  );
};

const HeaderActionsEnd = () => {
  return <UserDropdown hoverable={false} />;
};

const SetupLayout = (props) => {
  return (
    <div className="bg-white h-screen flex flex-col">
      <Header headerStart={<HeaderActionsStart />} headerEnd={<HeaderActionsEnd />} />
      <div className="grow h-full">
        <View {...props} />
      </div>
    </div>
  );
};

export default SetupLayout;
