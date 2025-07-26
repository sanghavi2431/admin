import React, { useEffect, useState } from "react";
import Header from "@/components/template/Header";
import SidePanel from "@/components/template/SidePanel";
import UserDropdown from "@/components/template/UserDropdown";
import SideNavToggle from "@/components/template/SideNavToggle";
import MobileNav from "@/components/template/MobileNav";
import SideNav from "@/components/template/SideNav";
import View from "@/views";
import { Select } from "@/components/ui";
import { HiCheck } from "react-icons/hi";
import { FaCoins } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedModule,
  setLooDiscovery,
  setSideBarDisabled,
} from "@/store/auth/userSlice";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/template/Logo";

const HeaderActionsStart = () => {
  return (
    <>
      <div className="bg-[#00C3DE] rounded-custom shadow-custom flex justify-center mr-4" style={{width: "80px", minWidth: "80px"}}>
        <Logo
          type="streamline"
        />
      </div>
      <MobileNav />
    </>
  );
};
// CustomOption component to style the options
const CustomOption = ({ innerProps, label, isSelected, selectProps }) => {
  const { themeColor } = selectProps;
  return (
    <div
      {...innerProps}
      style={{
        backgroundColor: isSelected ? "white" : "#00c3de",
        color: "black",
        padding: "4px",
      }}
      className="flex justify-between"
    >
      <span className="ml-2">{label}</span>
      {isSelected && (
        <HiCheck className={`text-${themeColor} dark:text-white text-xl `} />
      )}
    </div>
  );
};

const HeaderActionsEnd = () => {
  const [value, setValue] = useState({ label: "Task Management", value: 1 });
  const [path, setPath] = useState("/client");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modules = useSelector((state) => state.auth.user.module);
  const showOnChangeModule = useSelector(
    (state) => state.auth.user.showOnChangeModule
  );
  const selectedModule = useSelector((state) => state.auth.user.selectedModule);
  const progressState = useSelector((state) => state.auth.user.progressState);
  const totalCoins = useSelector((state) => state.auth.user.totalCoins);
  const roleId = useSelector((state) => state.auth.user.roleId);
  const allTrue = Object.values(progressState).every((value) => value === true);
  useEffect(() => {
    if (allTrue) {
      setPath("/iotData");
    } else {
      setPath("/client");
    }
  }, [allTrue]);
  const handleChange = (opt) => {
    setValue(opt);
    dispatch(setSelectedModule(opt));
    dispatch(setSideBarDisabled(false));
    if (opt.label == "Store") {
      const link = document.createElement("a");
      link.href = "https://shop.woloo.in/admin/login.php";
      link.target = "./blank";
      // Append to html link element page
      document.body.appendChild(link);
      // Start download
      link.click();
      navigate("/dashboard");
    } else {
      opt.label == "Task Management"
        ? dispatch(setLooDiscovery(false))
        : dispatch(setLooDiscovery(true));
      opt.label == "Task Management"
        ? navigate(path)
        : navigate("/wolooRating");
    }
  };

  return (
    <>
      <SidePanel />
      {showOnChangeModule && (
        <div className="w-48 mr-2">
          <Select
            backgroundColor="#00c3de"
            onChange={(opt) => handleChange(opt)}
            components={{ Option: CustomOption }}
            className="text-black font-semibold cursor-pointer"
            options={modules}
            size="sm"
            value={selectedModule}
          />
        </div>
      )}
      {roleId === 9 && (
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md">
          <FaCoins className="text-yellow-400 text-lg mr-2" />
          <span className="font-bold">{totalCoins || 0}</span>
        </div>
      )}
      <UserDropdown hoverable={false} />
    </>
  );
};

const ModernLayout = (props) => {
  return (
    <div className="bg-white h-screen flex flex-col">
      <Header
        className=""
        headerEnd={<HeaderActionsEnd />}
        headerStart={<HeaderActionsStart />}
      />
      <div className="grow flex max-h-screen overflow-y-auto relative">
        {/* Sidebar - Now Absolutely Positioned */}
        <div
          className="absolute h-full p-2 transition-all duration-300"
          style={{ zIndex: 20 }} // Ensures it's on top of content
        >
          <SideNav />
        </div>

        <div className="grow h-full overflow-auto" style={{marginLeft: "80px"}}>
          <View {...props} />
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
