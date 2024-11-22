import { useEffect, useState } from "react";
import ReactHighcharts from "react-highcharts";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  getIOTData,
  setIOTdata,
  setType,
  setPayload,
} from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { Loading, DoubleSidedImage } from "components/shared";
import IotParameter from "./IotParameter";
import IotTools from "./iotTools";
import { cloneDeep, round } from "lodash";
import GaugeCharts from "./GaugeCharts";
import Amonia_table from "./Amonia_table";
import Alerts_table from "./alerts_table";
import Historical_amonia_table from "./Historical_amonia_table";
import Chart from "./Chart";
import ScatterChart from "./ScatterChart";
import AmmoniaLevelChart from "./AmmoniaLevelChart";
// import RealTimeColumn from "./RealTimeColumn";
// import AreaChart from "./AreaChart";
// import BubbleChart from "./BubbleChart";

export default function IotGraph() {
  const dispatch = useDispatch();
  let IOTdata = useSelector((state) => state.iotData.data.IOTdata);

  let type = useSelector((state) => state.iotData.data.type);
  let loading = useSelector((state) => state.iotData.data.loading);
  let payload = useSelector((state) => state.iotData.data.payload);

  const fetchData = async (data) => {
    dispatch(setIOTdata(""));
    let payloadData = cloneDeep(payload);
    console.log("payloadData", payloadData);
    // let tempData = {
    //   "period": "custom",
    //   "start_date": "2024-05-01",
    //   "end_date": "2024-05-13"
    // }
    // payloadData && dispatch(getIOTData(data));
    dispatch(getIOTData(data));
  };

  useEffect(() => {
    let data = { type: type };
    let payloadData = cloneDeep(payload);
    if (payloadData) {
      payloadData.type = type;
    }
    console.log("data", payloadData, data);

    // data = payloadData ? payloadData : data;
    payloadData.type != "custom" && fetchData(payloadData);
  }, [type, payload]);

  return (
    <>
      {
        <Loading loading={loading}>
          {!isEmpty(IOTdata?.["historical_distinct_data_table"]) && (
            <div className="flex justify-around gap-4 flex-col ">
              <AmmoniaLevelChart
                data={IOTdata?.["gauge_graph_data"]}
                condition={IOTdata?.ammonia_unit}
                range_of_ppm={IOTdata?.range_of_ppm}
              />
              <div className="grid md:grid-cols-3 gap-8 justify-around p-2">
                <div className="h-[500px] p-5 mb-2 bg-white shadow-lg rounded-lg">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                      chart: {
                        type: "column",
                        backgroundColor: "transparent",
                      },
                      title: {
                        text: "Historical Ammonia Usage",
                      },
                      xAxis: {
                        categories:
                          IOTdata?.["historical_ammonia_level"]?.[
                            "historical_distinct_data_modified"
                          ]?.["category"],
                        crosshair: false,
                        title: {
                          text: IOTdata?.["historical_ammonia_level"]?.[
                            "historical_distinct_data_unit"
                          ],
                        },
                      },
                      yAxis: {
                        min: 0,
                        title: {
                          text: IOTdata?.ammonia_unit,
                        },
                      },
                      tooltip: {
                        headerFormat:
                          '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat:
                          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                          '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: "</table>",
                        shared: true,
                        useHTML: true,
                      },
                      plotOptions: {
                        column: {
                          pointPadding: 0.2,
                          borderWidth: 0,
                          colorByPoint: true,
                          colors: ["#717171", "#02c3de"],
                        },
                      },
                      credits: {
                        enabled: false,
                      },
                      series: [
                        {
                          name: IOTdata?.ammonia_unit,
                          data: IOTdata?.["historical_ammonia_level"]?.[
                            "historical_distinct_data_modified"
                          ]?.["data"].map((item) => round(item.y)),
                        },
                      ],
                    }}
                  />
                </div>
                <div className="h-[500px] p-5 mb-2 bg-white shadow-lg rounded-lg">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                      chart: {
                        type: "column",
                        backgroundColor: "transparent",
                      },
                      title: {
                        text: "Historical People Usage",
                      },
                      xAxis: {
                        categories:
                          IOTdata?.["historical_ammonia_level"]?.[
                            "historical_people_data_modified"
                          ]?.["category"],
                        crosshair: false,
                        title: {
                          text: IOTdata?.["historical_ammonia_level"]?.[
                            "historical_distinct_data_unit"
                          ],
                        },
                      },
                      yAxis: {
                        min: 0,
                        title: {
                          text: "People",
                        },
                      },
                      tooltip: {
                        headerFormat:
                          '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat:
                          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                          '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: "</table>",
                        shared: true,
                        useHTML: true,
                      },
                      plotOptions: {
                        column: {
                          pointPadding: 0.2,
                          borderWidth: 0,
                          colorByPoint: true,
                          colors: ["#717171", "#02c3de"],
                        },
                      },
                      credits: {
                        enabled: false,
                      },
                      series: [
                        {
                          name: "People Usage",
                          data: IOTdata?.["historical_ammonia_level"]?.[
                            "historical_people_data_modified"
                          ]?.["data"].map((item) => round(item.y)),
                          // dataLabels: {
                          //   enabled: true,
                          //   rotation: 0,
                          //   color: "#717171",
                          //   align: "center",
                          //   format: "{point.y}",
                          //   y: 0,
                          //   style: {
                          //     fontSize: "12px",
                          //     fontFamily: "sans-serif",
                          //   },
                          // },
                        },
                      ],
                    }}
                  />
                </div>
                <div className="h-[500px] p-5 mb-2 bg-white shadow-lg rounded-lg">
                  <Historical_amonia_table
                    condition={IOTdata?.ammonia_unit}
                    data={IOTdata?.["historical_distinct_data_table"]}
                    selectedHeading={
                      IOTdata?.["historical_ammonia_level"]?.[
                        "historical_distinct_data_unit"
                      ]
                    }
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 justify-around p-2">
                <div className="md:col-span-2 h-[500px] p-5 mb-2 bg-white shadow-lg rounded-lg">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                      chart: {
                        type: "column",
                        backgroundColor: "transparent",
                      },
                      title: {
                        text: "Building Usage Report",
                      },
                      xAxis: {
                        categories:
                          IOTdata?.["ammonia_level_across_washroom_result"]?.[
                            "distinct_data_modified"
                          ]?.["category"],
                        crosshair: false,
                        title: {
                          text: null,
                        },
                      },
                      yAxis: {
                        min: 0,
                        title: {
                          text: null,
                        },
                      },
                      tooltip: {
                        headerFormat:
                          '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat:
                          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                          '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: "</table>",
                        shared: true,
                        useHTML: true,
                      },
                      plotOptions: {
                        column: {
                          pointPadding: 0.2,
                          borderWidth: 0,
                          colorByPoint: false,
                        },
                      },
                      credits: {
                        enabled: false,
                      },
                      series: [
                        {
                          name: "Ammonia Level",
                          data: IOTdata?.[
                            "ammonia_level_across_washroom_result"
                          ]?.["distinct_data_modified"]?.["data"].map(
                            (item) => item.y
                          ),
                          color: "#717171",
                        },
                        {
                          name: "People Count",
                          data: IOTdata?.[
                            "ammonia_level_across_washroom_result"
                          ]?.["distinct_people_data_modified"]?.["data"].map(
                            (item) => item.y
                          ),
                          color: "#02c3de",
                        },
                      ],
                    }}
                  />
                </div>
                <div className="h-[500px] p-5 mb-2 bg-white shadow-lg rounded-lg">
                  <Amonia_table
                    condition={IOTdata?.ammonia_unit}
                    data={IOTdata?.["amonia_table_data"]}
                    selectedHeading={
                      IOTdata?.["ammonia_level_across_washroom_result"]?.[
                        "distinct_people_data_unit"
                      ]
                    }
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 justify-around p-2">
                <div className="md:col-span-2 h-[500px] p-5 mb-2 bg-white shadow-lg rounded-lg">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                      chart: {
                        type: "areaspline",
                      },
                      title: {
                        text: "Historical Ammonia vs People Usage",
                      },
                      legend: {
                        enabled: true,
                      },
                      xAxis: {
                        categories:
                          IOTdata?.["historical_ammonia_level"]?.[
                            "historical_distinct_data_modified"
                          ]?.["category"],
                        crosshair: false,
                        type: "datetime",
                        title: {
                          text: IOTdata?.["historical_ammonia_level"]?.[
                            "historical_distinct_data_unit"
                          ],
                        },
                        dateTimeLabelFormats: {
                          day: "%e of %b",
                        },
                      },
                      yAxis: {
                        title: {
                          text: null,
                        },
                      },
                      tooltip: {
                        shared: true,
                        valueSuffix: " units",
                        xDateFormat: "%A, %b %e, %H:%M",
                      },
                      credits: {
                        enabled: false,
                      },
                      plotOptions: {
                        areaspline: {
                          fillOpacity: 0.5,
                          marker: {
                            radius: 2,
                          },
                          lineWidth: 1,
                          states: {
                            hover: {
                              lineWidth: 1,
                            },
                          },
                          threshold: null,
                        },
                      },
                      series: [
                        {
                          name: "Ammonia Usage",
                          data: IOTdata?.["historical_ammonia_level"]?.[
                            "historical_distinct_data_modified"
                          ]?.["data"].map((item) => round(item.y)),
                          color: "#717171",
                        },
                        {
                          name: "People Usage",
                          data: IOTdata?.["historical_ammonia_level"]?.[
                            "historical_people_data_modified"
                          ]?.["data"].map((item) => round(item.y)),
                          color: "#02c3de",
                        },
                      ],
                    }}
                  />
                </div>
                <div className="h-[500px] p-5 mb-2 bg-white shadow-lg rounded-lg">
                  <Alerts_table
                    data={IOTdata?.["alerts_notification"]}
                    selectedHeading={
                      IOTdata?.["ammonia_level_across_washroom_result"]?.[
                        "distinct_people_data_unit"
                      ]
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </Loading>
      }
      {!loading && isEmpty(IOTdata?.["historical_distinct_data_table"]) && (
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
