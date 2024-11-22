import React, { useEffect, useState } from "react";
import Header from "components/template/Header";
import SidePanel from "components/template/SidePanel";
import UserDropdown from "components/template/UserDropdown";
import SideNavToggle from "components/template/SideNavToggle";
import MobileNav from "components/template/MobileNav";
import SideNav from "components/template/SideNav";
import View from "views";
import { Select } from "components/ui";
import { HiCheck, HiChevronDown, HiX } from "react-icons/hi";
import { FaCoins } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { setShowOnChangeModule } from "store/auth/userSlice";
import {
  setSelectedModule,
  setLooDiscovery,
  setSideBarDisabled,
} from "store/auth/userSlice";
import { useNavigate } from "react-router-dom";

const HeaderActionsStart = () => {
  return (
    <>
      <MobileNav />
      <SideNavToggle />
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
        backgroundColor: isSelected ? "black" : "black",
        color: "white",
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
      {showOnChangeModule ? (
        <div className="w-48 mr-2">
          <Select
            backgroundColor="black"
            onChange={(opt) => handleChange(opt)}
            components={{ Option: CustomOption }}
            className="text-white font-semibold cursor-pointer"
            options={modules}
            size="sm"
            value={selectedModule}
          />
        </div>
      ) : (
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
    <div className="app-layout-modern flex flex-auto flex-col">
      <div className="flex flex-auto min-w-0">
        <SideNav />
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700">
          <Header
            className="border-b border-gray-200 dark:border-gray-700"
            headerEnd={<HeaderActionsEnd />}
            headerStart={<HeaderActionsStart />}
          />
          <View {...props} />
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
