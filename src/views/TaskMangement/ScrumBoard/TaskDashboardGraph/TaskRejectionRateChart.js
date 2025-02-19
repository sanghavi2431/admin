import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import GraphFooter from "../GraphFooter";

NoDataToDisplay(Highcharts);

const TaskRejectionRateChart = ({ taskRejectionData, scrollToFilter }) => {
  const [rejectionRateData, setRejectionRateData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataUnit, setDataUnit] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const data = taskRejectionData?.data?.map((item) => Number(item)) || [];
    setRejectionRateData(data);
    setCategories(taskRejectionData?.category || []);
    setDataUnit(
      taskRejectionData?.unit === "janitor" ? "Janitors List" : "Facilities List"
    );

    setSummary(
      data.length > 0
        ? taskRejectionData?.anyalyzeDataForTaskRejection || "No summary available"
        : "No summary available"
    );
  }, [taskRejectionData]);

  const options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      text: "Task Rejection Rate",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#717171",
      },
    },
    xAxis: {
      categories,
      title: {
        text: dataUnit,
        style: { color: "#717171" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Tasks Rejected",
        style: { color: "#02C3DE" },
      },
      labels: {
        style: { color: "#717171" },
      },
      min: 0,
    },
    tooltip: {
      headerFormat: "<span style='font-size:10px'>{point.key}</span><table>",
      pointFormat:
        "<tr><td style='color:{series.color};padding:0'>{series.name}: </td>" +
        "<td style='padding:0'><b>{point.y} tasks</b></td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          style: { fontSize: "12px", color: "#717171" },
        },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        name: "Avg. Task Rejection Rate",
        data: rejectionRateData,
        color: "#02C3DE",
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          flex: 1,
          width: "80%",
          maxWidth: "800px",
          backgroundColor: "transparent",
        }}
      >
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div
        style={{
          flex: 1,
          fontSize: "14px",
          color: "#555",
          padding: "10px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          This line chart represents the average task rejection rates across various
          units. It highlights patterns and trends in task rejection.
        </p>
        {/* <ul>
          <li>
            <strong>Categories:</strong> Represent the units or groups being analyzed.
          </li>
          <li>
            <strong>Rejection Rate:</strong> Indicates the average number of tasks rejected.
          </li>
        </ul> */}
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
          <strong>Summary:</strong> {summary}
        </div>
      </div>
    </div>
  );
};

export default TaskRejectionRateChart;
