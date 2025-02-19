import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBuilding } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { setGraphDataLevel } from "@/views/TaskMangement/IOTData/iotGraph/store/dataSlice";
import { toast } from "@/components/ui";
import Notification from "@/components/ui/Notification";

const GraphFooter = ({ scrollToFilter }) => {
  const dispatch = useDispatch();
  const graphDataLevel = useSelector((state) => state.iotData?.data?.graphDataLevel);

  const handleDrillDownClick = (dataLevel) => {
    if(dataLevel === graphDataLevel) return;
    if (scrollToFilter) scrollToFilter();
    // dispatch(setGraphDataLevel(dataLevel));
    toast.push(
      <Notification type="info" duration={2500}>
        Please select the{" "}
        {dataLevel === "Building"
          ? "Location"
          : dataLevel === "Facility"
          ? "Building"
          : "Facility"}{" "}
        to view the {dataLevel} wise data
      </Notification>,
      {
        placement: "top-center",
      }
    );
  };

  return (
    <div className="flex justify-center items-center gap-4 my-2">
      <div
        onClick={() => handleDrillDownClick("Building")}
        className={`text-base font-semibold flex items-center gap-1 cursor-pointer ${graphDataLevel === "Building" ? "text-[#00C3DE]" : ""}`}
      >
        <FaBuilding />
        Building
      </div>
      <div
        onClick={() => handleDrillDownClick("Facility")}
        className={`text-base font-semibold flex items-center gap-1 cursor-pointer ${graphDataLevel === "Facility" ? "text-[#00C3DE]" : ""}`}
      >
        <BsBuildingsFill />
        Facility
      </div>
      <div
        onClick={() => handleDrillDownClick("Janitor")}
        className={`text-base font-semibold flex items-center gap-1 cursor-pointer ${graphDataLevel === "Janitor" ? "text-[#00C3DE]" : ""}`}
      >
        <MdGroups size={20} />
        Janitor
      </div>
    </div>
  );
};

export default GraphFooter;
