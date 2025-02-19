import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPayload,
  getTaskDashboardData,
  setTaskDashboardData,
} from "@/views/TaskMangement/IOTData/iotGraph/store/dataSlice";
import { cloneDeep } from "lodash";
import { Loading } from "@/components/shared";
import TaskEfficiencyChart from "./TaskDashboardGraph/TaskEfficiencyChart";
import JanitorEfficiencyChart from "./TaskDashboardGraph/JanitorEfficiencyChart";
import ErrorScreen from "../IOTData/iotGraph/components/ErrorScreen";
import SummaryCard from "../IOTData/iotGraph/components/SummaryCard";
import { generateSummary } from "@/services/taskManagement/iot.service";
import CleaningEfficiencyChart from "./TaskDashboardGraph/CleaningEfficiencyChart";

const TaskDashboardGraph = () => {
  const dispatch = useDispatch();
  const client_id = useSelector((state) => state.auth.user.clientId);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
  const roleId = useSelector((state) => state.auth.user.roleId);

  const { taskDashboardData, type, loading, payload, error } = useSelector(
    (state) => state.iotData?.data || {}
  );

  const fetchData = (data) => {
    if (!loading) {
      dispatch(setTaskDashboardData(""));
      dispatch(getTaskDashboardData(data));
    }
  };

  useEffect(() => {
    console.log("payload---", payload);
    console.log("type---", type);
    if (payload && type !== "custom") {
      const updatedPayload = { ...cloneDeep(payload), type };
      fetchData(updatedPayload);
    }
  }, [type, payload]);

  const fetchTaskAISummary = async () => {
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

  useEffect(() => {
    if (roleId !== 1 && isFreeTrial) {
      const payloadData = { client_id: client_id?.value, type };
      dispatch(setPayload(payloadData));
      // dispatch(getTaskDashboardData(payloadData));
    }
  }, [isFreeTrial, roleId]);

  if (error) return <ErrorScreen message={error} onRetry={() => fetchData(payload)} />;

  return (
    <div>
      <Loading loading={loading}>
        <div>
          <div className="flex flex-row gap-6">
            <div className="w-1/2 h-[400px] p-5 bg-white shadow-custom border rounded-custom">
              <CleaningEfficiencyChart data={taskDashboardData?.Task_status_distribution} />
            </div>
            <div className="w-1/2 h-[400px] p-5 bg-white shadow-custom border rounded-custom">
              <JanitorEfficiencyChart data={taskDashboardData?.Janitor_efficiency} />
            </div>
          </div>
          {(roleId === 1 || !isFreeTrial) && <div className="flex flex-row gap-6 mt-6">
            <div className="h-[400px] w-2/3 p-5 bg-white shadow-custom border rounded-custom">
              <TaskEfficiencyChart data={taskDashboardData?.Task_Efficiency} />
            </div>
            <div className="h-[400px] w-1/3">
              <SummaryCard
                defaultSummary={`Task Efficiency: ${taskDashboardData?.summaryForTaskEfficiency} Janitor Efficiency: ${taskDashboardData?.summaryForJanitorEfficiency}`}
                fetchAISummary={fetchTaskAISummary}
              />
            </div>
          </div>}
        </div>
      </Loading>
    </div>
  );
};

export default TaskDashboardGraph;
