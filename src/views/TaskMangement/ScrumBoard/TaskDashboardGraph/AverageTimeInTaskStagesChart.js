import React, { useState, useEffect } from "react";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

require("highcharts/modules/exporting")(Highcharts);
NoDataToDisplay(Highcharts);

const formatStatus = (status) => {
  return status
      .toLowerCase() 
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

const AverageTimeInTaskStagesChart = ({ avgTimeInTaskStagesData }) => {
  const [avgTimeInStagesData, setAvgTimeInStagesData] = useState([]);
  const [transitionStatus, setTransitionStatus] = useState([]);
  const [chartTitle, setChartTitle] = useState("");

  useEffect(() => {
    console.log(
      "AverageTimeInTaskStagesChart.js: useEffect() called",
      avgTimeInTaskStagesData
    );

    const timeData = avgTimeInTaskStagesData[0]?.data.map((item) => ({
      name: `${formatStatus(item.previous_status)} to ${formatStatus(item.current_status)}`,
      y: Number(item.avg_time_spent_minutes),
    }));
    setAvgTimeInStagesData(timeData);

    const statusTransitions = avgTimeInTaskStagesData[0]?.data.map(
      (item) => `${formatStatus(item.previous_status)} to ${formatStatus(item.current_status)}`
    );
    setTransitionStatus(statusTransitions);

    const title =
      avgTimeInTaskStagesData[0]?.unit === "janitor"
        ? "Janitor wise Avg. Time"
        : "Facility wise Avg. Time";
    setChartTitle(title);
  }, [avgTimeInTaskStagesData]);

  const options = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: "Avg. Time in Each Task Stage",
    },
    xAxis: {
      categories: transitionStatus,
      title: {
        text: "Task Stages",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Minutes Spent",
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: " hrs",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: chartTitle,
        data: avgTimeInStagesData,
        color: "#02c3de",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AverageTimeInTaskStagesChart;
