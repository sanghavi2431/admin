import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { cloneDeep } from "lodash";
import { MdStar } from "react-icons/md";
import {
  setPayload,
  getReviewData,
  setReviewDashboardData,
} from "@/views/TaskMangement/IOTData/iotGraph/store/dataSlice";
import ReviewChart from "./ReviewChart";
import PremiumPrompt from "@/views/TaskMangement/IOTData/iotGraph/components/PremiumPrompt";
import ErrorScreen from "@/views/TaskMangement/IOTData/iotGraph/components/ErrorScreen";

export const demoReviewDashboardData = {
  avg_rating: 4.2,
  rating: ["1", "2", "3", "4", "5"],
  data: [3, 7, 12, 25, 53],
  facility_name: "Location Rating",
  date: "July 2025",
  comments: [
    {
      rating: 5,
      guest_name: "Neha Sharma",
      comments: "Amazing experience! Super clean and well maintained.",
      created_at: "2025-07-21T10:15:00",
    },
    {
      rating: 4,
      guest_name: "Rahul Mehta",
      comments: "Nice facility, but there was a short wait time.",
      created_at: "2025-07-20T09:45:00",
    },
    {
      rating: 3,
      guest_name: "Pooja Nair",
      comments: "It was okay. Could improve on the sanitization.",
      created_at: "2025-07-18T18:30:00",
    },
    {
      rating: 5,
      guest_name: "Mohit Sinha",
      comments: "Excellent service, very hygienic and prompt.",
      created_at: "2025-07-17T12:00:00",
    },
    {
      rating: 2,
      guest_name: "Kavita Joshi",
      comments: "Had to wait for supplies to be refilled.",
      created_at: "2025-07-15T16:10:00",
    },
    {
      rating: 4,
      guest_name: "Arjun Patel",
      comments: "Well maintained overall, slightly crowded at peak time.",
      created_at: "2025-07-14T14:25:00",
    },
  ],
};

const x_title = {
  today: "Ratings",
  week: "Ratings",
  curr_month: "Ratings",
  past_month: "Ratings",
  past_week: "Ratings",
};

export default function ReviewGraph() {
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState(null);

  const reviewData = useSelector(
    (state) => state.iotData?.data?.reviewDashboardData
  );

  const type = useSelector((state) => state.iotData?.data?.type);
  const loading = useSelector((state) => state.iotData?.data?.loading);
  const payload = useSelector((state) => state.iotData?.data?.payload);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
  const roleId = useSelector((state) => state.auth.user.roleId);
  const error = useSelector((state) => state.iotData.data.error);
  const isDemoMode = useSelector((state) => state.iotData.data.isDemoMode);

  const fetchData = async (data) => {
    if (loading) return;
    dispatch(setReviewDashboardData(""));
    dispatch(getReviewData(data));
  };

  // useEffect(() => {
  //   if (payload && type !== "custom") {
  //     const updatedPayload = { ...cloneDeep(payload), type };
  //     fetchData(updatedPayload);
  //   }
  // }, [type, payload]);

  useEffect(() => {
    if (isDemoMode) {
      setLocalData(demoReviewDashboardData);
    } else {
      const payloadData = cloneDeep(payload);
      if (payloadData) payloadData.type = type;
      payloadData?.type !== "custom" && fetchData(payloadData);
    }
  }, [type, payload, isDemoMode]);

  function getPeopleCountConfig(
    cat_data,
    total_people_data,
    cat_title,
    graph_title,
    graph_subtitle,
    interval
  ) {
    const config = {
      chart: { type: "column" },
      xAxis: {
        categories: cat_data,
        title: {
          text: cat_title,
        },
      },
      yAxis: {
        title: {
          text: "Number of Reviews",
        },
        tickInterval: interval,
        plotBands: [],
      },
      series: [
        {
          name: "Reviews",
          data: total_people_data,
        },
      ],
      title: {
        text: graph_title,
        align: "left",
      },
      subtitle: {
        text: graph_subtitle,
        align: "left",
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          innerWidth: 0.2,
        },
      },
    };
    return config;
  }

  const data = isDemoMode ? localData : reviewData;

  const handleRetry = () => {
    fetchData(payload);
  }

  if (!isDemoMode && error) return <ErrorScreen message={error} onRetry={handleRetry} />
  if (!isDemoMode && roleId !== 1 && isFreeTrial) return <PremiumPrompt />

  return (
    <>
      {
        <div>
          <Loading loading={loading}>
            {data?.["avg_rating"] ? (
              <div className="">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ReviewChart demoData={demoReviewDashboardData} />
                    </div>
                    <div className="p-5 bg-white shadow-custom border rounded-lg">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={getPeopleCountConfig(
                          data["rating"],
                          data["data"],
                          x_title[type],
                          data?.facility_name,
                          data["date"],
                          Math.ceil(Math.max(...data["data"]) / 10)
                        )}
                      />
                      <div className="">
                        <div className=" text-[14px] font-semibold w-[90%]">
                          1. Need Improvements
                        </div>
                        <div className=" text-[14px] font-semibold w-[90%]">
                          2. Good, but could have been better
                        </div>
                        <div className=" text-[14px] font-semibold w-[90%]">
                          3. I am satisfied with overall experience
                        </div>
                        <div className=" text-[14px] font-semibold w-[90%]">
                          4. Really Liked the facility
                        </div>
                        <div className=" text-[14px] font-semibold w-[90%]">
                          5. My experience was amazing
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 p-5 bg-white shadow-custom border rounded-lg">
                      <p className="mb-2 text-black text-lg">Reviews</p>
                      <div className="h-[500px] overflow-auto">
                        {data?.comments?.length ? (
                          data?.comments?.map((comment) => {
                            const dateObject = new Date(comment?.created_at);
                            const monthAbbreviations = [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec",
                            ];
                            const day = dateObject.getDate();
                            const monthIndex = dateObject.getMonth();
                            const year = dateObject.getFullYear();
                            const hours = dateObject.getHours();
                            const minutes = dateObject.getMinutes();
                            const seconds = dateObject.getSeconds();
                            return (
                              <div className="border-t-2 border-black-500 flex flex-col gap-2 flex-wrap py-2">
                                <div className="flex justify-between mt-4">
                                  <div className="flex gap-2">
                                    <div className="flex justify-center items-center gap-2 bg-[#165F05] p-0.5 pr-2 pl-2 rounded-md">
                                      <p className="text-white">
                                        {comment?.rating}
                                      </p>
                                      <MdStar color="#fff" />
                                    </div>
                                    <p className="text-black">
                                      {comment?.guest_name}
                                    </p>
                                  </div>
                                  <p className="text-xs">{`${day} ${monthAbbreviations[monthIndex]} ${year} ${hours}:${minutes}:${seconds}`}</p>
                                </div>
                                <p>{comment?.comments}</p>
                              </div>
                            );
                          })
                        ) : (
                          <div className="flex justify-center items-center h-full">
                            No Review Data Found !
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) :
              (
                <div className="flex flex-col items-center justify-end">
                  <DoubleSidedImage
                    src="/img/others/img-2.png"
                    darkModeSrc="/img/others/img-2-dark.png"
                    alt="No Data found!"
                  />
                  <h3 className="mt-8">No Data found!</h3>
                </div>
              )
            }
          </Loading>
        </div>
      }
    </>
  );
}
