import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

NoDataToDisplay(Highcharts);

const JanitorEfficiencyChart = ({ data }) => {
  const categories = data?.category || [];
  const totalTasks = data?.totaltask.map(y => Number(y)) || [];
  const closedTasks = data?.closedtask.map(y => Number(y)) || [];

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: "300px",
    },
    title: {
      text: null,
    },
    xAxis: {
      categories,
      labels: {
        style: {
          fontSize: "14px",
          color: "#707070",
          fontWeight: "bold",
        },
      },
    },
    yAxis: [
      {
        title: {
          text: `Tasks per ${data?.unit || "unit"}`,
        },
        labels: {
          style: {
            fontSize: "14px",
            color: "#707070",
            fontWeight: "bold",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: null,
        },
        labels: {
          style: {
            fontSize: "14px",
            color: "#707070",
            fontWeight: "bold",
          },
        },
      },
    ],
    legend: {
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      itemStyle: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#707070",
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
      column: {
        borderRadius: 5,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series:
      [
        {
          name: "Total Tasks",
          data: totalTasks,
          color: "#00C3DE",
        },
        {
          name: "Tasks Completed",
          data: closedTasks,
          color: "#717171",
        },
      ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-bold text-center mb-4">Janitor Efficiency</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default JanitorEfficiencyChart;
