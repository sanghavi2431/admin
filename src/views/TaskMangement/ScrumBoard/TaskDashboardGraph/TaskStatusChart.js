import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import GraphFooter from "../GraphFooter";

HighchartsMore(Highcharts);
NoDataToDisplay(Highcharts);

const TaskStatusChart = ({ taskStatusDistData, scrollToFilter }) => {
  const [taskStatusData, setTaskStatusData] = useState([]);

  useEffect(() => {
    const processedData = [
      {
        name: "Pending",
        y: Number(taskStatusDistData?.pending_count) || 0,
        color: "#00C3DE",
      },
      {
        name: "Accepted",
        y: Number(taskStatusDistData?.accepted_count) || 0,
        color: "#888888",
      },
      {
        name: "In Progress",
        y: Number(taskStatusDistData?.ongoing_count) || 0,
        color: "#717171",
      },
      {
        name: "Sent for Closure",
        y: Number(taskStatusDistData?.request_for_closure_count) || 0,
        color: "#FFEB00FE",
      },
      {
        name: "Closed",
        y: Number(taskStatusDistData?.completed_count) || 0,
        color: "#231F20",
      },
      {
        name: "Rejected",
        y: Number(taskStatusDistData?.rejected_count) || 0,
        color: "#c62828",
      },
      {
        name: "Reopened",
        y: Number(taskStatusDistData?.reopen_count) || 0,
        color: "#546e7a",
      },
    ];

    setTaskStatusData(processedData);
  }, [taskStatusDistData]);

  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: "Task Status Distribution",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f} %</b>",
    },
    plotOptions: {
      pie: {
        innerSize: "80%",
        depth: 45,
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        borderRadius: 25,
      },
    },
    series: [
      {
        name: "Tasks",
        data: taskStatusData,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="p-5 bg-white shadow-custom rounded-lg border">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <GraphFooter scrollToFilter={scrollToFilter} />
    </div>
  );
};

export default TaskStatusChart;
