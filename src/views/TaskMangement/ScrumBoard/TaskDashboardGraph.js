import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPayload,
  getTaskDashboardData,
  setTaskDashboardData,
  getTaskDashboardDataForFreeTrial,
} from "@/views/TaskMangement/IOTData/iotGraph/store/dataSlice";
import { cloneDeep } from "lodash";
import { Loading } from "@/components/shared";
import TaskEfficiencyChart from "./TaskDashboardGraph/TaskEfficiencyChart";
// import JanitorEfficiencyChart from "./TaskDashboardGraph/JanitorEfficiencyChart";
import ErrorScreen from "../IOTData/iotGraph/components/ErrorScreen";
import SummaryCard from "../IOTData/iotGraph/components/SummaryCard";
import { generateSummary } from "@/services/taskManagement/iot.service";
// import CleaningEfficiencyChart from "./TaskDashboardGraph/CleaningEfficiencyChart";
import FacilityPerformanceChart from "./TaskDashboardGraph/FacilityPerformanceChart";
import TaskAuditChart from "./TaskDashboardGraph/TaskAuditChart";

const demoTaskDashboardData = {
  Task_Efficiency: [
    { interval: "12 AM - 03 AM", total_task: "50", completed_task: "45" },
    { interval: "03 AM - 06 AM", total_task: "40", completed_task: "35" },
    { interval: "06 AM - 09 AM", total_task: "60", completed_task: "55" },
    { interval: "09 AM - 12 PM", total_task: "70", completed_task: "67" },
    { interval: "12 PM - 03 PM", total_task: "40", completed_task: "33" },
    { interval: "03 PM - 06 PM", total_task: "90", completed_task: "60" },
    { interval: "06 PM - 09 PM", total_task: "20", completed_task: "9" },
    { interval: "09 PM - 12 AM", total_task: "30", completed_task: "18" },
  ],
  Task_status_distribution: {
    completed_count: "30",
    accepted_count: "10",
    ongoing_count: "5",
    pending_count: "2",
    completed_percentage: "81%",
  },
  summaryForTaskEfficiency: "Average task efficiency is 90% this week.",
  summaryForJanitorEfficiency: "Janitor performance maintained above 85%.",
};

const TaskDashboardGraph = () => {
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState(null);

  const client_id = useSelector((state) => state.auth.user.clientId);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
  const roleId = useSelector((state) => state.auth.user.roleId);

  const { taskDashboardData, type, loading, payload, error, isDemoMode } = useSelector(
    (state) => state.iotData?.data || {}
  );

  const fetchData = (data) => {
    if (!loading) {
      dispatch(setTaskDashboardData(""));
      if (roleId === 1 || !isFreeTrial) {
        dispatch(getTaskDashboardData(data));
      } else {
        dispatch(getTaskDashboardDataForFreeTrial(data));
      }
    }
  };

  // useEffect(() => {
  //   if (payload && type !== "custom") {
  //     const updatedPayload = { ...cloneDeep(payload), type };
  //     fetchData(updatedPayload);
  //   }
  // }, [type, payload]);

  useEffect(() => {
    if (isDemoMode) {
      setLocalData(demoTaskDashboardData);
    } else {
      const payloadData = cloneDeep(payload);
      if (payloadData) payloadData.type = type;
      payloadData?.type !== "custom" && fetchData(payloadData);
    }
  }, [type, payload, isDemoMode]);

  useEffect(() => {
    if (client_id && isFreeTrial) {
      const payloadData = { client_id: client_id?.value, type };
      dispatch(setPayload(payloadData));
    }
  }, [isFreeTrial, client_id]);

  const fetchTaskAISummary = async () => {
    if (isDemoMode) {
      return `
        Task Efficiency Summary: Tasks are being completed efficiently in the demo scenario.<br /><br />
        Janitor Efficiency Summary: All janitors are performing as expected in this demo.
      `;
    }

    try {
      const [taskSummary, janitorSummary] = await Promise.all([
        generateSummary({
          data: taskDashboardData?.Task_Efficiency,
          type: "Closure_comparison",
        }),
        generateSummary({
          data: taskDashboardData?.Janitor_efficiency,
          type: "Janitor_Efficiency",
        }),
      ]);

      const taskSummaryText =
        taskSummary?.data?.results && taskSummary.data.results.length > 0
          ? taskSummary.data.results
          : "No summary available";

      const janitorSummaryText =
        janitorSummary?.data?.results && janitorSummary.data.results.length > 0
          ? janitorSummary.data.results
          : "No summary available";

      return `${taskSummaryText}<br /><br />${janitorSummaryText}`;
    } catch (error) {
      console.error("Failed to fetch AI summary:", error);
      return "Error generating AI summary.";
    }
  };

  const data = isDemoMode ? localData : taskDashboardData;

  if (!isDemoMode && error) return <ErrorScreen message={error} onRetry={() => fetchData(payload)} />;

  return (
    <div>
      <Loading loading={loading}>
        <div className="py-3">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2 h-[400px] p-5 bg-white shadow-custom border rounded-custom">
              {/* <CleaningEfficiencyChart data={taskDashboardData?.Task_status_distribution} /> */}
              <FacilityPerformanceChart title={payload?.location_id ? "Location" : "Facility"} data={data?.Task_status_distribution} />
            </div>
            <div className="w-full lg:w-1/2 h-[400px] p-5 bg-white shadow-custom border rounded-custom">
              {/* <JanitorEfficiencyChart data={taskDashboardData?.Janitor_efficiency} /> */}
              <TaskAuditChart data={data?.Task_status_distribution} />
            </div>
          </div>
          {roleId === 1 || !isFreeTrial || isDemoMode ? (
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
              <div className="w-full lg:w-2/3 h-[400px] p-5 bg-white shadow-custom border rounded-custom">
                <TaskEfficiencyChart data={data?.Task_Efficiency} />
              </div>
              <div className="w-full lg:w-1/3 h-[400px]">
                <SummaryCard
                  defaultSummary={`Task Efficiency: ${data?.summaryForTaskEfficiency} Janitor Efficiency: ${data?.summaryForJanitorEfficiency}`}
                  fetchAISummary={fetchTaskAISummary}
                />
              </div>
            </div>
          ) : null}
        </div>
      </Loading>
    </div>
  );
};

export default TaskDashboardGraph;
