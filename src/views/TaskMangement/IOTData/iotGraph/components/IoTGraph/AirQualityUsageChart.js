import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ChevronRight } from "lucide-react";

const AirQualityUsageChart = ({ AirQualityVsUsageData }) => {
  // const [selectedPeriod, setSelectedPeriod] = useState("ALL");
  
  // Sample data if none provided
  // const defaultData = [
  //   { time_range: "12-3 AM", avg_ppm_avg: 30, avg_pcd_max: 5 },
  //   { time_range: "3-6 AM", avg_ppm_avg: 25, avg_pcd_max: 8 },
  //   { time_range: "6-9 AM", avg_ppm_avg: 20, avg_pcd_max: 10 },
  //   { time_range: "9-12 AM", avg_ppm_avg: 15, avg_pcd_max: 25 },
  //   { time_range: "12-3 PM", avg_ppm_avg: 35, avg_pcd_max: 75 },
  //   { time_range: "3-6 PM", avg_ppm_avg: 20, avg_pcd_max: 95 },
  //   { time_range: "6-9 PM", avg_ppm_avg: 10, avg_pcd_max: 15 },
  //   { time_range: "9-12 PM", avg_ppm_avg: 5, avg_pcd_max: 3 }
  // ];

  const data = AirQualityVsUsageData;
  
  const categories = data.map((entry) => entry.time_range);
  const airQualityData = data.map((entry) => parseFloat(entry.avg_ppm_avg));
  const usageData = data.map((entry) => parseFloat(entry.avg_pcd_max));

  const options = {
    chart: {
      backgroundColor: "transparent",
      height: "350px",
      spacingTop: 20,
      spacingBottom: 20,
      spacingLeft: 20,
      spacingRight: 20
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: categories,
      gridLineWidth: 1,
      gridLineColor: "#E0E0E0",
      gridLineDashStyle: "Dash",
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: {
        style: {
          fontSize: "12px",
          color: "#666666",
          fontWeight: "normal"
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      min: 0,
      max: 600,
      tickInterval: 100,
      gridLineColor: "#E0E0E0",
      gridLineWidth: 1,
      labels: {
        style: {
          fontSize: "12px",
          color: "#666666",
        },
        formatter: function() {
          return this.value + '.0';
        }
      },
      plotLines: [
        {
          value: 500,
          color: "#FF6B6B",
          width: 2,
          dashStyle: "Dash",
          zIndex: 5,
        },
      ],
    },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      itemStyle: {
        color: "#333333",
        fontSize: "14px",
        fontWeight: "normal"
      },
      symbolWidth: 18,
      symbolHeight: 18,
      symbolRadius: 9,
      itemDistance: 30,
      y: -10
    },
    tooltip: {
      shared: true,
      backgroundColor: "#ffffff",
      borderColor: "#E4E4E4",
      borderRadius: 5,
      style: {
        color: "#333333",
        fontSize: "12px",
      },
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          radius: 4,
          lineWidth: 2,
        },
        lineWidth: 2,
      },
      area: {
        fillOpacity: 0.3,
        marker: {
          enabled: true,
          radius: 4,
          lineWidth: 2,
        },
        lineWidth: 2,
      }
    },
    series: [
      {
        name: "Air Quality",
        type: "line",
        data: airQualityData,
        color: "#4A90E2",
        marker: {
          fillColor: "#4A90E2",
          lineColor: "#4A90E2",
        },
      },
      {
        name: "Usage",
        type: "area",
        data: usageData,
        color: "#F5C842",
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(245, 200, 66, 0.8)"],
            [1, "rgba(245, 200, 66, 0.1)"]
          ]
        },
        marker: {
          fillColor: "#F5C842",
          lineColor: "#F5C842",
        },
      },
      {
        name: "Threshold (500 ppm)",
        type: "line",
        data: Array(categories.length).fill(500),
        color: "#FF6B6B",
        dashStyle: "Dash",
        marker: {
          enabled: false
        },
        enableMouseTracking: false,
        showInLegend: true,
        lineWidth: 2
      }
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  };

  const timeOptions = ["ALL", "1M", "6M"];

  return (
    <div className="">
      {/* Header */}
      {/* <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Air Quality vs Usage</h2>
        <div className="flex items-center gap-2">
          {timeOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedPeriod(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === option
                  ? "bg-gray-200 text-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-150"
              }`}
            >
              {option}
            </button>
          ))}
          <button className="p-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors">
            <ChevronRight size={16} className="text-white" />
          </button>
        </div>
      </div> */}

      {/* Chart */}
      <h2 className="text-xl font-bold text-center mb-4">Air Quality vs Usage</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AirQualityUsageChart;