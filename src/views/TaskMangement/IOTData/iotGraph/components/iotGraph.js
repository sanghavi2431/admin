import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { getIOTData, setIOTdata } from "../store/dataSlice";
import { generateSummary } from "@/services/taskManagement/iot.service";
import isEmpty from "lodash/isEmpty";
import { Loading, DoubleSidedImage } from "@/components/shared";
import Alerts_table from "./alerts_table";
import AirQualityChart from "./IoTGraph/AirQualityChart";
import AirQualityGauge from "./IoTGraph/AirQualityGauge";
import PremiumPrompt from "./PremiumPrompt";
import DailyAvgWatchList from "./IoTGraph/DailyAvgWatchList";
import ErrorScreen from "./ErrorScreen";
import SummaryCard from "./SummaryCard";

export default function IotGraph() {
  const dispatch = useDispatch();
  let IOTdata = useSelector((state) => state.iotData.data.IOTdata);
  let type = useSelector((state) => state.iotData.data.type);
  let loading = useSelector((state) => state.iotData.data.loading);
  let payload = useSelector((state) => state.iotData.data.payload);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
  const roleId = useSelector((state) => state.auth.user.roleId);
  const error = useSelector((state) => state.iotData.data.error);

  const fetchData = async (data) => {
    if (loading) return;
    dispatch(setIOTdata(""));
    dispatch(getIOTData(data));
  };

  const getSummaryTypeLabel = (summaryType) => {
    const summaryTypeMap = {
      "avgppm_time_range_analysis": "Average PPM Time Range Analysis",
      "avgppm_over_time_analysis": "Average PPM Over Location",
      "alerts_notification": "Alert Notifications",
    };
    return summaryTypeMap[summaryType] || summaryType.replace(/_/g, " ");
  };

  const formatPayload = (summaryType, summaryData) => {
    switch (summaryType) {
      case "avgppm_time_range_analysis":
        return {
          data: summaryData?.map(({ time_range, avg_ppm_avg, avg_pcd_max }) => ({
            time_range,
            avg_ppm_avg,
            avg_pcd_max,
          })),
          type: summaryType,
        };

      case "avgppm_over_time_analysis":
        return {
          data: summaryData?.map(({ ppm_avg, heading }) => ({
            ppm_avg,
            heading,
          })),
          type: summaryType,
        };

      case "alerts_notification":
        const formattedData = summaryData?.reduce((acc, { data_unit }) => {
          acc[data_unit] = (acc[data_unit] || 0) + 1;
          return acc;
        }, {});
        return {
          data: formattedData,
          type: summaryType,
        };

      default:
        throw new Error("Invalid summary type provided.");
    }
  };

  const fetchAISummary = async (summaryType, summaryData) => {
    try {
      if (!summaryData || summaryData.length === 0) {
        return `No data available for ${getSummaryTypeLabel(summaryType)}.`;
      }
      const payload = formatPayload(summaryType, summaryData);
      const response = await generateSummary(payload);
      return response?.data?.results || `No insights generated for ${getSummaryTypeLabel(summaryType)}.`;
    } catch (error) {
      console.error(`Failed to fetch AI summary for ${summaryType}:`, error);
      return `Error generating summary for ${getSummaryTypeLabel(summaryType)}. Please try again later.`;
    }
  };

  useEffect(() => {
    let payloadData = cloneDeep(payload);
    if (payloadData) {
      payloadData.type = type;
    }
    payloadData.type != "custom" && fetchData(payloadData);
  }, [type, payload]);

  const handleRetry = () => {
    fetchData(payload);
  };

  if (error) return <ErrorScreen message={error} onRetry={handleRetry} />
  if (roleId !== 1 && isFreeTrial) return <PremiumPrompt />

  return (
    <>
      {
        <div>
          <Loading loading={loading}>
            {!isEmpty(IOTdata?.["avgppm_time_range"]) && (
              <>
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-3 h-[400px] p-5 bg-white shadow-custom border rounded-custom">
                    <AirQualityChart
                      AirQualityVsUsageData={IOTdata?.["avgppm_time_range"]}
                    />
                  </div>
                  <SummaryCard defaultSummary={IOTdata?.["summary"]?.["avgppm_time_range_insights"]} fetchAISummary={() => fetchAISummary("avgppm_time_range_analysis", IOTdata?.["avgppm_time_range"])} />
                  <div className="col-span-3 h-[400px] p-5 bg-white shadow-custom border rounded-custom">
                    <Alerts_table
                      data={IOTdata?.["alerts_notification"]}
                      selectedHeading={
                        IOTdata?.["ammonia_level_across_washroom_result"]?.[
                        "distinct_people_data_unit"
                        ]
                      }
                    />
                  </div>
                  <SummaryCard defaultSummary={IOTdata?.["summary"]?.["alerts_notification_summary"]} fetchAISummary={() => fetchAISummary("alerts_notification", IOTdata?.["alerts_notification"])} />
                  <div className="h-[400px] p-5 bg-white shadow-custom border rounded-custom">
                    <DailyAvgWatchList data={IOTdata?.["amonia_table_data"]} />
                  </div>
                  <div className="col-span-2">
                    <SummaryCard defaultSummary={IOTdata?.["summary"]?.["avgppm_over_location"]} fetchAISummary={() => fetchAISummary("avgppm_over_time_analysis", IOTdata?.["amonia_table_data"])} />
                  </div>
                  <div className="h-[400px] p-5 bg-white shadow-custom border rounded-custom">
                    <AirQualityGauge value={IOTdata?.["gauge_graph_data"]?.["avg_amonia"] ?? 0} />
                  </div>
                </div>
              </>
            )}
          </Loading>
        </div>
      }
      {!loading && isEmpty(IOTdata?.["avgppm_time_range"]) && (
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
}
