import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const AirQualityChart = ({ AirQualityVsUsageData }) => {
  const categories = AirQualityVsUsageData.map((entry) => entry.time_range);
  const airQualityData = AirQualityVsUsageData.map((entry) => parseFloat(entry.avg_ppm_avg));
  const usageData = AirQualityVsUsageData.map((entry) => parseFloat(entry.avg_pcd_max));

  const options = {
    chart: {
      type: "areaspline",
      backgroundColor: "transparent",
      height: "300px"
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: categories,
      gridLineWidth: 1,
      gridLineDashStyle: "Dash",
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: {
        style: {
          fontSize: "14px",
          color: "#1D2939",
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "Air Quality Index",
          style: {
            fontSize: "14px",
            color: "#717171",
          },
        },
        gridLineColor: "#E4E4E4",
        labels: {
          style: {
            fontSize: "12px",
            color: "#717171",
          },
        },
        plotLines: [
          {
            value: 750, // Threshold at AQI 400
            color: "red",
            width: 2,
            dashStyle: "Dash",
            zIndex: 5,
            label: {
              text: "Threshold (400 PPM)",
              align: "right",
              style: {
                color: "red",
                fontSize: "12px",
                fontWeight: "bold",
              },
            },
          },
        ],
      },
      {
        title: {
          text: "Usage",
          style: {
            fontSize: "14px",
            color: "#717171",
          },
        },
        gridLineColor: "transparent",
        labels: {
          style: {
            fontSize: "12px",
            color: "#717171",
          },
        },
        opposite: true,
      },
    ],
    legend: {
      align: "center",
      verticalAlign: "top",
      layout: "horizontal",
      itemStyle: {
        color: "#1D2939",
        fontWeight: "bold",
      },
    },
    tooltip: {
      shared: true,
      backgroundColor: "#ffffff",
      borderColor: "#E4E4E4",
      borderRadius: 10,
      style: {
        color: "#1D2939",
        fontSize: "14px",
      },
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 1,
        marker: {
          radius: 3,
          lineWidth: 1,
        },
      },
    },
    series: [
      {
        name: "Air Quality",
        data: airQualityData,
        color: "#00C3DE",
        lineWidth: 2,
        marker: {
          fillColor: "#ffffff",
          lineColor: "#00C3DE",
        },
        yAxis: 0,
      },
      {
        name: "Usage",
        data: usageData,
        color: "#FFEB00",
        lineWidth: 2,
        marker: {
          fillColor: "#ffffff",
          lineColor: "#FFEB00",
        },
        yAxis: 1,
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  };

  return (
    <div className="h-full w-full">
      <h2 className="text-xl font-bold text-center mb-4">Air Quality vs Usage</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AirQualityChart;
