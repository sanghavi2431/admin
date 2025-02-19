import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import Highcharts from "highcharts";
import { Card } from "@/components/ui";
import { useSelector } from "react-redux";
import MessageComponent from "./No_data_foud";

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const GaugeCharts = ({data,condition,range_of_ppm}) => {
  // const iotData = useSelector((state) => state.iotData.data.IOTDashboardData.gauge_graph_data);
  console.log("range_of_ppm",range_of_ppm)
  let [healthy_min, setHealthy_min] = useState(0);
  let [healthy_max, setHealthy_max] = useState(0.25);
  let [moderate_max, setModerate_max] = useState(0.25);
  let [moderate_min, setModerate_min] = useState(0.5);
  let [unhealthy_min, setUnhealthy_min] = useState(0.5);
  let [unhealthy_max, setUnhealthy_max] = useState(3);
  let [avg_amonia, setAvg_amonia] = useState(0);

  useEffect(() => {
    // Update state variables when range_of_ppm changes
    setHealthy_min(range_of_ppm?.healthy_min ? Number(range_of_ppm.healthy_min) : 0);
    setHealthy_max(range_of_ppm?.healthy_max ? Number(range_of_ppm.healthy_max) : 0.25);
    setModerate_max(range_of_ppm?.moderate_max ? Number(range_of_ppm.moderate_max) : 0.25);
    setModerate_min(range_of_ppm?.moderate_min ? Number(range_of_ppm.moderate_min) : 0.5);
    setUnhealthy_min(range_of_ppm?.unhealthy_min ? Number(range_of_ppm.unhealthy_min) : 0.5);
    setUnhealthy_max(range_of_ppm?.unhealthy_max ? Number(range_of_ppm.unhealthy_max) : 3);
  }, [range_of_ppm]);

  useEffect(() => {
    // Update avg_amonia when data changes
    setAvg_amonia(data?.avg_amonia ? Number(data.avg_amonia) : 0);
  }, [data]);
  
  const tableData = [
    { label: "Current Condition", value: data?.condition },
    { label: `Average Ammonia Level (${condition}) ` , value:  Number(data?.avg_amonia)?.toFixed(2) },
    { label: `Total Washroom Visits   `, value: Number(data?.pcd_max)?.toFixed(2) },
    // { label: "Percentage Threshold Exceeded", value: "5%" },
  ];
  const options = {
    chart: {
      type: "gauge",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: "70%",
      // width: "70%",
      className:"flex flex-col justify-center items-center"
      // style:{
      //   display:"flex",
      //   justify-content:"center"
      // }
    },

    title: {
      text: null, // Set to null to disable chart title
    },

    credits: {
      enabled: false,
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "60%"],
      size: "100%",
    },

    // the value axis
    yAxis: {
      min:healthy_min,
      max: unhealthy_max,
      tickPixelInterval: 72,
      tickPosition: "inside",
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "14px",
        },
      },
      lineWidth: 0,
      plotBands: [
        {
          from: healthy_min,
          to: healthy_max,
          color: "#55BF3B", // green
          thickness: 20,
        },
        {
          from: moderate_min,
          to: moderate_max,
          color: "#DDDF0D", // yellow
          thickness: 20,
        },
        {
          from: unhealthy_min,
          to: unhealthy_max,
          color: "#DF5353", // red
          thickness: 20,
        },
      ],
    },

    series: [
      {
        name: "Ammonia level",
        data: [avg_amonia],
        tooltip: {
          valueSuffix: " ",
        },
        dataLabels: {
          format: "{y}",
          borderWidth: 0,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "#333333",
          style: {
            fontSize: "16px",
          },
        },
        dial: {
          radius: "80%",
          backgroundColor: "gray",
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "gray",
          radius: 6,
        },
      },
    ],
  };
console.log("options",options)
  return (
    <Card>
      <h3 className="mb-12 text-center">
        Real Time Ammonia Levels 
      </h3>
      <MessageComponent condition={data?.avg_amonia }>
      <div className=" w-full gap-32  flex justify-center items-start">
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div className="mt-12 ">
          <h5>Dashboard Summary</h5>
          <table className="border mt-2">
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{row.label}</td>
                  <th className="p-2">{row.value}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </MessageComponent>
    </Card>
  );
};

export default GaugeCharts;
