import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

NoDataToDisplay(Highcharts);

const TaskCompletionChart = ({ taskCompletionTimeData }) => {
  const [completionTimeData, setCompletionTimeData] = useState([]);
  const [category, setCategory] = useState([]);
  const [distinctDataUnit, setDistinctDataUnit] = useState("");

  useEffect(() => {
    setCompletionTimeData(
      taskCompletionTimeData.data.map((item) => Number(item))
    );
    setCategory(taskCompletionTimeData.category);
    setDistinctDataUnit(taskCompletionTimeData.unit === "janitor" ? "Janitors List" : "Facilities List");
  }, []);

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Task Completion Time",
    },
    xAxis: {
      categories: category,
      crosshair: false,
      title: {
        text: distinctDataUnit,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Completion Time (minutes)",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.2f} mins</b></td></tr>',
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
        name: "Avg. Task Completion Time",
        data: completionTimeData, 
        color: "#02c3de",
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: "#717171",
          align: "center",
          format: "{point.y}", 
          y: 0, 
          style: {
            fontSize: "12px",
            fontFamily: "sans-serif",
          },
        },
      },
    ],
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TaskCompletionChart;
