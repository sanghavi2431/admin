import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

NoDataToDisplay(Highcharts);

const TaskClosureRateChart = ({ taskClosureData, scrollToFilter }) => {
  const [taskClosureRateData, setTaskClosureRateData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataUnit, setDataUnit] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const data = taskClosureData?.data?.map((item) => Number(item));
    setTaskClosureRateData(data);
    setCategories(taskClosureData?.category);
    setDataUnit(
      taskClosureData?.unit === "janitor" ? "Janitors List" : "Facilities List"
    );
    setSummary(
      data?.length > 0
        ? taskClosureData?.anyalyzeDataForTaskClosure
        : "No summary available"
    );
  }, [taskClosureData]);

  const options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      text: "Task Closure Rate",
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
        text: "Number of Tasks Closed",
        style: { color: "#02C3DE" },
      },
      labels: {
        style: { color: "#717171" },
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
    series: [
      {
        name: "Avg. Task Closure Rate",
        data: taskClosureRateData,
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
          This line chart displays the task closure rates for different units. It
          helps track and analyze the performance of janitors or facilities over
          time.
        </p>
        {/* <ul>
          <li>
            <strong>Categories:</strong> Represent the time intervals or units.
          </li>
          <li>
            <strong>Task Closure Rate:</strong> Indicates the average number of
            tasks closed in each interval.
          </li>
        </ul> */}
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
          <strong>Summary:</strong> {summary}
        </div>
      </div>
    </div>
  );
};

export default TaskClosureRateChart;
