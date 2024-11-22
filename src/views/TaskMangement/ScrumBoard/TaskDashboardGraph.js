import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AverageTimeInTaskStagesChart from "./TaskDashboardGraph/AverageTimeInTaskStagesChart";
import TaskAssignmentDistributionChart from "./TaskDashboardGraph/TaskAssignmentDistributionChart";
import TaskClosureRateChart from "./TaskDashboardGraph/TaskClosureRateChart";
import TaskCompletionChart from "./TaskDashboardGraph/TaskCompletionChart";
import TaskStatusChart from "./TaskDashboardGraph/TaskStatusChart";
import IoTTaskResponseChart from "./TaskDashboardGraph/IoTTaskResponseChart";
// import { getBoards } from "./store/dataSlice";
import { getBoards, setTaskDashboardData } from "views/TaskMangement/IOTData/iotGraph/store/dataSlice";
import { cloneDeep, isEmpty } from "lodash";
import { Loading, DoubleSidedImage } from "components/shared";

const TaskDashboardGraph = ({ filtersData}) => {
  const dispatch = useDispatch();
  let type = useSelector((state) => state.iotData.data.type);
  const loading = useSelector((state) => state.iotData?.data?.loading);
  const payload = useSelector((state) => state.iotData?.data?.payload);
  const taskDashboardData = useSelector((state) => state.iot?.data?.taskDashboardData);

  const fetchData = async (data) => {
    dispatch(setTaskDashboardData(""));
    dispatch(getBoards(data));
  };

  useEffect(() => {
    let data = { type: type };
    let payloadData = cloneDeep(payload);
    if (payloadData) {
      payloadData.type = type;
    }
    // console.log("data", payloadData, data);
    payloadData.type != "custom" && fetchData(payloadData);
  }, [type, payload]);


  return (
    <>
      {
        <Loading loading={loading}>
          {!isEmpty(taskDashboardData?.["Average_Time_Each_Stage"]) && (
            <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TaskStatusChart taskStatusDistData={taskDashboardData["Task_status_distribution"]} />
              <TaskClosureRateChart taskClosureData={taskDashboardData["Task_closer_count"]} />
              <AverageTimeInTaskStagesChart avgTimeInTaskStagesData={taskDashboardData["Average_Time_Each_Stage"]} />
              <TaskAssignmentDistributionChart taskAssignDistributionData={taskDashboardData["Task_Assign_disturbution"]} />
              <IoTTaskResponseChart iotTaskResponseData={taskDashboardData["Ammonia_Task_response"]} />
              <TaskCompletionChart taskCompletionTimeData={taskDashboardData["Task_Completion_Time"]} />
            </div>
          )}
        </Loading>
      }
      {!loading && isEmpty(taskDashboardData?.["Average_Time_Each_Stage"]) && (
        <div className="flex flex-col items-center justify-end">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No Data found!"
          />
          <h3 className="mt-8">No Data found!</h3>
        </div>
      )}
    </>
  );
};

export default TaskDashboardGraph;
