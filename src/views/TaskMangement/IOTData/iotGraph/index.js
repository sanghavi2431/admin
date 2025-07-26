import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import IotFilterTools from "./components/IotFilterTools";
import reducer from "./store";
import IotGraph from "./components/iotGraph";
import TaskDashboardGraph from "@/views/TaskMangement/ScrumBoard/TaskDashboardGraph";
import ReviewGraph from "@/views/TaskMangement/ReviewManagement/ReviewManagementGraph/components/ReviewManagementGraph";
import DashboardTypeSegment from "./components/DashboardTypeSegment";
import DateTypeSegment from "./components/DateTypeSegment";
import DemoModeToggle from "./components/DemoModeToggle";
import { setDemoMode } from "./store/dataSlice";

injectReducer("iotData", reducer);

function IotData() {
  const dispatch = useDispatch();
  const [currentDashboard, setCurrentDashboard] = useState(null);
  const dashboardType = useSelector((state) => state.iotData.data.dashboardType);
  const isDemoMode = useSelector(state => state.iotData.data.isDemoMode);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
  const roleId = useSelector((state) => state.auth.user.roleId);

  const handleDemoModeToggle = (enabled) => {
    dispatch(setDemoMode(!enabled));
  };

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
    if (isFreeTrial && roleId !== 1) dispatch(setDemoMode(true))
    return () => dispatch(setDemoMode(false))
  }, [roleId, isFreeTrial]);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      {(isFreeTrial && roleId !== 1) && <div className="flex justify-between items-center mb-4">
        <div>
          {isDemoMode && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded-md text-sm">
              📊 Demo Mode Active - Displaying sample data
            </div>
          )}
        </div>
        <DemoModeToggle
          isDemoMode={isDemoMode}
          onToggle={handleDemoModeToggle}
        />
      </div>}

      <div className="w-full">
        <IotFilterTools />
      </div>

      <div className="flex justify-center my-6">
        <DashboardTypeSegment
          dashboardType={dashboardType}
          dashboardSize={"lg"}
        />
      </div>

      <div className="main-chart">
        {currentDashboard}
      </div>
    </AdaptableCard>
  );
}

export default IotData;
