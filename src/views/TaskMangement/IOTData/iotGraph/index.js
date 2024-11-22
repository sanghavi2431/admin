import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AdaptableCard } from "components/shared";
import { injectReducer } from "store";
import IotFilterTools from "./components/IotFilterTools";
import reducer from "./store";
import IotGraph from "./components/iotGraph";
import IotTools from "./components/iotTools";
import TaskDashboardGraph from "views/TaskMangement/ScrumBoard/TaskDashboardGraph";
import ReviewGraph from "views/TaskMangement/ReviewManagement/ReviewManagementGraph/components/ReviewManagementGraph";
import DateTypeSegment from "./components/DateTypeSegment";
import DashboardTypeSegment from "./components/DashboardTypeSegment";

injectReducer("iotData", reducer);

function IotData() {
  const type = useSelector((state) => state.iotData.data.type);
  const dashboardType = useSelector(
    (state) => state.iotData.data.dashboardType
  );
  const [currentDashboard, setCurrentDashboard] = useState(<IotGraph />);

  useEffect(() => {
    const updateDashboard = () => {
      switch (dashboardType) {
        case "iot":
          return <IotGraph />;
        case "task":
          return <TaskDashboardGraph />;
        case "review":
          return <ReviewGraph />;
        default:
          return <IotGraph />;
      }
    };

    setCurrentDashboard(updateDashboard());
  }, [dashboardType]);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex justify-end mb-3">
        <DateTypeSegment className="" type={type} />
      </div>
      <div className="md:flex md:items-center md:justify-between md:mb-4">
        <div className="w-full border-b-2">
          <IotFilterTools />
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <DashboardTypeSegment dashboardType={dashboardType} />
      </div>
      {currentDashboard}
    </AdaptableCard>
  );
}

export default IotData;
