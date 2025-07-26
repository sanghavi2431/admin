import { useState, useEffect } from "react";
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
import AirQualityUsageChart from "./IoTGraph/AirQualityUsageChart";

const demoIoTDashboardData = {
  "avgppm_time_range": [
    { time_range: "12-3 AM", avg_ppm_avg: 180, avg_pcd_max: 120 },
    { time_range: "3-6 AM", avg_ppm_avg: 220, avg_pcd_max: 140 },
    { time_range: "6-9 AM", avg_ppm_avg: 260, avg_pcd_max: 190 },
    { time_range: "9-12 AM", avg_ppm_avg: 310, avg_pcd_max: 250 },
    { time_range: "12-3 PM", avg_ppm_avg: 450, avg_pcd_max: 320 },
    { time_range: "3-6 PM", avg_ppm_avg: 490, avg_pcd_max: 600 },
    { time_range: "6-9 PM", avg_ppm_avg: 300, avg_pcd_max: 400 },
    { time_range: "9-12 PM", avg_ppm_avg: 200, avg_pcd_max: 150 }
  ],
  "alerts_notification": [
    { data_unit: "Restroom A", ppm_time: "2025-07-23 10:00", condition: "bad" },
    { data_unit: "Restroom B", ppm_time: "2025-07-23 11:30", condition: "moderate" },
    { data_unit: "Restroom C", ppm_time: "2025-07-23 12:15", condition: "healthy" },
    { data_unit: "Restroom A", ppm_time: "2025-07-23 13:45", condition: "bad" },
    { data_unit: "Restroom D", ppm_time: "2025-07-23 15:00", condition: "moderate" }
  ],
  "amonia_table_data": [
    {
      heading: "Restroom A",
      ppm_diff: -30,
      value: [60, 55, 40, 30, 20]
    },
    {
      heading: "Restroom B",
      ppm_diff: 10,
      value: [20, 25, 30, 35, 40]
    },
    {
      heading: "Restroom C",
      ppm_diff: -5,
      value: [15, 10, 8, 7, 5]
    },
    {
      heading: "Restroom D",
      ppm_diff: 20,
      value: [10, 20, 25, 30, 35]
    }
  ],
  "gauge_graph_data": {
    avg_amonia: 78
  },
  "summary": {
    avgppm_time_range_insights: "PPM was highest between 12–6 PM. Morning levels remained moderate.",
    alerts_notification_summary: "Most alerts triggered in Restroom A. Consistent high ammonia detected.",
    avgppm_over_location: "Restroom B had the most stable air quality throughout the day."
  }
}

const IotGraph = () => {
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState(null);

  let IOTdata = useSelector((state) => state.iotData.data.IOTdata);
  let type = useSelector((state) => state.iotData.data.type);
  let loading = useSelector((state) => state.iotData.data.loading);
  let payload = useSelector((state) => state.iotData.data.payload);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
  const roleId = useSelector((state) => state.auth.user.roleId);
  const error = useSelector((state) => state.iotData.data.error);
  const isDemoMode = useSelector((state) => state.iotData.data.isDemoMode);

  const fetchData = async (data) => {
    if (loading) return;
    dispatch(setIOTdata(""));
    dispatch(getIOTData(data));
  };

  const getSummaryTypeLabel = (summaryType) => {
    const map = {
      avgppm_time_range_analysis: "Average PPM Time Range Analysis",
      avgppm_over_time_analysis: "Average PPM Over Location",
      alerts_notification: "Alert Notifications"
    };
    return map[summaryType] || summaryType.replace(/_/g, " ");
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
      if (!summaryData?.length) return `No data available for ${getSummaryTypeLabel(summaryType)}.`;
      const payload = formatPayload(summaryType, summaryData);
      const response = await generateSummary(payload);
      return response?.data?.results || `No insights generated for ${getSummaryTypeLabel(summaryType)}.`;
    } catch (error) {
      console.error(`Failed to fetch AI summary for ${summaryType}:`, error);
      return `Error generating summary for ${getSummaryTypeLabel(summaryType)}. Please try again later.`;
    }
  };

  useEffect(() => {
    if (isDemoMode) {
      setLocalData(demoIoTDashboardData);
    } else {
      const payloadData = cloneDeep(payload);
      if (payloadData) payloadData.type = type;
      payloadData?.type !== "custom" && fetchData(payloadData);
    }
  }, [type, payload, isDemoMode]);

  const data = isDemoMode ? localData : IOTdata;

  const handleRetry = () => {
    fetchData(payload);
  };

  if (!isDemoMode && error) return <ErrorScreen message={error} onRetry={handleRetry} />
  if (!isDemoMode && roleId !== 1 && isFreeTrial) return <PremiumPrompt />

  return (
    <>
      <div>
        <Loading loading={loading}>
          {!isEmpty(data?.["avgppm_time_range"]) ? (
            <>
              <div className="grid grid-cols-4 gap-6">
                <div className="col-span-3 h-[400px] p-5 bg-white shadow-custom border rounded-custom">
                  {/* <AirQualityChart
                      AirQualityVsUsageData={IOTdata?.["avgppm_time_range"]}
                      /> */}
                  <AirQualityUsageChart
                    AirQualityVsUsageData={data?.["avgppm_time_range"]}
                  />
                </div>
                <SummaryCard defaultSummary={data?.["summary"]?.["avgppm_time_range_insights"]} fetchAISummary={() => fetchAISummary("avgppm_time_range_analysis", data?.["avgppm_time_range"])} />
                <div className="col-span-3 h-[400px] p-5 bg-white shadow-custom border rounded-custom">
                  <Alerts_table
                    data={data?.["alerts_notification"]}
                    selectedHeading={
                      data?.["ammonia_level_across_washroom_result"]?.[
                      "distinct_people_data_unit"
                      ]
                    }
                  />
                </div>
                <SummaryCard defaultSummary={data?.["summary"]?.["alerts_notification_summary"]} fetchAISummary={() => fetchAISummary("alerts_notification", data?.["alerts_notification"])} />
                <div className="h-[400px] p-5 bg-white shadow-custom border rounded-custom">
                  <DailyAvgWatchList data={data?.["amonia_table_data"]} />
                </div>
                <div className="col-span-2">
                  <SummaryCard defaultSummary={data?.["summary"]?.["avgppm_over_location"]} fetchAISummary={() => fetchAISummary("avgppm_over_time_analysis", data?.["amonia_table_data"])} />
                </div>
                <div className="h-[400px] p-5 bg-white shadow-custom border rounded-custom">
                  <AirQualityGauge value={data?.["gauge_graph_data"]?.["avg_amonia"] ?? 0} />
                </div>
              </div>
            </>
          )
            : (
              <div className="flex flex-col items-center justify-end">
                <DoubleSidedImage
                  src="/img/others/img-2.png"
                  darkModeSrc="/img/others/img-2-dark.png"
                  alt="No Data found!"
                />
                <h3 className="mt-8">No Data found!</h3>
              </div>
            )}
        </Loading>
      </div>
    </>
  );
};

export default IotGraph;