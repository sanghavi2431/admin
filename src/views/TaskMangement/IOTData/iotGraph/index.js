import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import IotFilterTools from "./components/IotFilterTools";
import reducer from "./store";
import IotGraph from "./components/iotGraph";
import TaskDashboardGraph from "@/views/TaskMangement/ScrumBoard/TaskDashboardGraph";
import ReviewGraph from "@/views/TaskMangement/ReviewManagement/ReviewManagementGraph/components/ReviewManagementGraph";
import DashboardTypeSegment from "./components/DashboardTypeSegment";
import DateTypeSegment from "./components/DateTypeSegment";

injectReducer("iotData", reducer);

function IotData() {
  const [currentDashboard, setCurrentDashboard] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const dashboardType = useSelector((state) => state.iotData.data.dashboardType);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
  const roleId = useSelector((state) => state.auth.user.roleId);
  const type = useSelector((state) => state.iotData.data.type);

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
          return <TaskDashboardGraph />;
      }
    };

    setCurrentDashboard(updateDashboard());
  }, [dashboardType]);

  useEffect(() => {
    if (roleId === 1 || !isFreeTrial) {
      setShowFilters(true);
    }
  }, [roleId, isFreeTrial]);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      {showFilters &&
        <div className="w-full">
          <IotFilterTools />
        </div>
      }
      <div className={`flex ${!showFilters ? "justify-between" : "justify-center"} items-center gap-4`}>
        {!showFilters && (
          <DateTypeSegment type={type} />
        )}
        <div className="flex justify-center my-6">
          <DashboardTypeSegment dashboardType={dashboardType} dashboardSize={showFilters ? "lg" : "md"} />
        </div>
      </div>
      {currentDashboard}
    </AdaptableCard>
  );
}

export default IotData;
