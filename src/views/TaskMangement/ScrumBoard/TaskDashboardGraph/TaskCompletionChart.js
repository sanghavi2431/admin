import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

NoDataToDisplay(Highcharts);

const TaskCompletionChart = ({ taskCompletionTimeData, scrollToFilter }) => {
  const [completionTimeData, setCompletionTimeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataUnit, setDataUnit] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const data = taskCompletionTimeData?.data?.map((item) => Number(item));
    setCompletionTimeData(data);
    setCategories(taskCompletionTimeData?.category);
    setDataUnit(
      taskCompletionTimeData?.unit === "janitor" ? "Janitors List" : "Facilities List"
    );

    setSummary(
      data?.length > 0
        ? taskCompletionTimeData?.anyalyzeDataForTaskCompletionTime
        : "No summary available"
    );
  }, [taskCompletionTimeData]);

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Task Completion Time",
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
        text: "Completion Time (minutes)",
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
        "<td style='padding:0'><b>{point.y:.2f} mins</b></td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          style: { fontSize: "12px", color: "#717171" },
        },
      },
    },
    series: [
      {
        name: "Avg. Task Completion Time",
        data: completionTimeData,
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
          This column chart illustrates the average task completion times for various
          units. The data provides insights into how long tasks typically take to be
          completed.
        </p>
        {/* <ul>
          <li>
            <strong>Categories:</strong> Represent the time intervals or units.
          </li>
          <li>
            <strong>Completion Time:</strong> Indicates the average time (in
            minutes) taken to complete tasks.
          </li>
        </ul> */}
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
          <strong>Summary:</strong> {summary}
        </div>
      </div>
    </div>
  );
};

export default TaskCompletionChart;
