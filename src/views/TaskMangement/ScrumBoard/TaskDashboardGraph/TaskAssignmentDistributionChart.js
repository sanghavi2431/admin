import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import GraphFooter from "../GraphFooter";

NoDataToDisplay(Highcharts);

const TaskAssignmentDistributionChart = ({ taskAssignDistributionData, scrollToFilter }) => {
  const [taskDistributionData, setTaskDistributionData] = useState([]);
  const [category, setCategory] = useState([]);
  const [distinctDataUnit, setDistinctDataUnit] = useState("");

  useEffect(() => {
    setTaskDistributionData(taskAssignDistributionData?.data.map((item) => Number(item)));
    setCategory(taskAssignDistributionData?.category);
    setDistinctDataUnit(
      taskAssignDistributionData?.unit === "facility" ? "Facilities List" : "Janitors List"
    );
  }, []);

  const options = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: "Task Assignment Distribution",
    },
    xAxis: {
      categories: category,
      title: {
        text: distinctDataUnit,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Tasks Assigned",
      },
      allowDecimals: false,
    },
    tooltip: {
      valueSuffix: " tasks",
      shared: true,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: {
      name: "Tasks Assigned",
      data: taskDistributionData,
      color: "#02c3de",
    },
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

export default TaskAssignmentDistributionChart;
