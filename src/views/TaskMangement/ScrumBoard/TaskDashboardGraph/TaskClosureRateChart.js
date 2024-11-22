import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

NoDataToDisplay(Highcharts);

const TaskClosureRateChart = ({ taskClosureData }) => {
  const [taskClosureRateData, setTaskClosureRateData] = useState([]);
  const [category, setCategory] = useState([]);
  const [distinctDataUnit, setDistinctDataUnit] = useState("");

  useEffect(() => {
    setTaskClosureRateData(taskClosureData.data.map((item) => Number(item)));
    setCategory(taskClosureData.category);
    setDistinctDataUnit(
      taskClosureData.unit === "janitor" ? "Janitors List" : "Facilities List"
    );
  }, []);

  const options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      text: "Task Closure Rate",
    },
    xAxis: {
      categories: category,
      title: {
        text: distinctDataUnit,
      },
    },
    yAxis: {
      title: {
        text: "Number of Tasks Closed",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      headerFormat: "<b>{point.key}</b><br>",
      pointFormat: "{series.name}: {point.y} tasks<br>",
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: true,
      },
    },
    series: {
      name: "Avg. Task Clouser Rate",
      data: taskClosureRateData,
      color: "#02c3de",
    },
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

export default TaskClosureRateChart;
