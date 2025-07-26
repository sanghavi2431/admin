import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const CleaningEfficiencyChart = ({ data }) => {
  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: "300px",
    },
    title: {
      text: "",
    },
    plotOptions: {
      pie: {
        innerSize: "80%",
        borderRadius: 20,
        dataLabels: {
          enabled: false,
        },
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tasks",
        data: [
          { name: "Pending Tasks", y: Number(data?.pending_count), color: "#00C3DE" },
          { name: "Accepted Tasks", y: Number(data?.accepted_count), color: "#B8B8B8" },
          { name: "On Going", y: Number(data?.ongoing_count), color: "#717171" },
          { name: "Completed Tasks", y: Number(data?.completed_count), color: "#000000" },
        ],
      },
    ],
    credits: {
      enabled: false
    }
  };

  return (
    <div className="h-full w-full">
      <h2 className="text-xl font-bold text-center mb-4">Cleaning Efficiency</h2>
      <div className="flex items-center">
        <div className="relative w-2/3">
          <HighchartsReact highcharts={Highcharts} options={options} />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-black">
            {data?.completed_percentage}
          </span>
        </div>
        <div className="w-1/3 pl-6">
          <ul className="text-gray-700 font-semibold space-y-2">
            <li className="flex items-center">
              <span className="w-3 h-3 bg-[#00C3DE] rounded-full mr-2"></span>
              Pending Tasks: {Number(data?.pending_count)}
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-[#B8B8B8] rounded-full mr-2"></span>
              Accepted Tasks: {Number(data?.accepted_count)}
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-[#717171] rounded-full mr-2"></span>
              On Going: {Number(data?.ongoing_count)}
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-[#231F20] rounded-full mr-2"></span>
              Completed Tasks: {Number(data?.completed_count)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CleaningEfficiencyChart;
