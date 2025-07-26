import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TaskEfficiencyChart = ({ data }) => {
  const categories = data?.map((entry) => entry.interval);
  const totalTasks = data?.map((entry) => Number(entry.total_task));
  const completedTasks = data?.map((entry) => Number(entry.completed_task));

  const options = {
    chart: {
      type: "areaspline",
      backgroundColor: "transparent",
      height: "300px",
    },
    title: {
      text: null,
    },
    xAxis: {
      categories,
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
    yAxis: {
      title: {
        text: "No. of Tasks Completed",
        style: {
          fontSize: "14px",
          color: "#1D2939",
        },
      },
      gridLineColor: "#E4E4E4",
    },
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
        name: "Total Tasks",
        data: totalTasks,
        color: "#00C3DE",
        lineWidth: 2,
        marker: {
          fillColor: "#ffffff",
          lineColor: "#00C3DE",
        },
      },
      {
        name: "Task Completed",
        data: completedTasks,
        color: "#FFEB00",
        lineWidth: 2,
        marker: {
          fillColor: "#ffffff",
          lineColor: "#FFEB00",
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="h-full w-full">
      <h2 className="text-xl font-bold text-center mb-4">Task Efficiency</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TaskEfficiencyChart;
