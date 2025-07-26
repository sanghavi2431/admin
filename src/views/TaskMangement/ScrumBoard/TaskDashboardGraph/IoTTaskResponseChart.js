import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import GraphFooter from "../GraphFooter";

NoDataToDisplay(Highcharts);
const IoTTaskResponseChart = ({ iotTaskResponseData, scrollToFilter }) => {
  const [ioTTaskResponseData, setIoTTaskResponseData] = useState([]);
  const [category, setCategory] = useState([]);
  const [distinctDataUnit, setDistinctDataUnit] = useState("");

  useEffect(() => {
    setIoTTaskResponseData(
      iotTaskResponseData?.data.map((item) => Number(item))
    );
    setCategory(iotTaskResponseData?.category);
    setDistinctDataUnit(
      ioTTaskResponseData.unit === "janitor"
        ? "Janitors List"
        : "Facilities List"
    );
  }, []);

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "IOT Task Response Time",
    },
    xAxis: {
      categories: category,
      title: {
        text: distinctDataUnit,
      },
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Response Time (minutes)",
      },
    },
    tooltip: {
      headerFormat: "<span style='font-size:10px'>{point.key}</span><br/>",
      pointFormat:
        "<span style='color:{series.color};font-size:10px'>Response Time: {point.y} mins</span>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        color: "#02c3de",
        dataLabels: {
          enabled: true,
          format: "{point.y} mins",
        },
      },
    },
    series: [
      {
        name: "Avg. IoT Task Response Time",
        data: ioTTaskResponseData,
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

export default IoTTaskResponseChart;
