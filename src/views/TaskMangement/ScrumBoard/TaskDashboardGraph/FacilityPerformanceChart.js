import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const FacilityPerformanceChart = ({ title, data }) => {
  const chartData = data;

  // Helper function to check if data exists and has valid values
  const hasValidData = () => {
    if (!chartData) return false;
    
    const totalCount = 
      (Number(chartData?.completed_count) || 0) +
      (Number(chartData?.pending_count) || 0) +
      (Number(chartData?.accepted_count) || 0) +
      (Number(chartData?.ongoing_count) || 0);
    
    return totalCount > 0;
  };

  // Filter out categories with zero values
  const getChartSeries = () => {
    const seriesData = [];
    
    const categories = [
      { name: "Completed", value: Number(chartData?.completed_count) || 0, color: "#8BDFFB" },
      { name: "Pending", value: Number(chartData?.pending_count) || 0, color: "#008C9F" },
      { name: "Accepted", value: Number(chartData?.accepted_count) || 0, color: "#006C7B" },
      { name: "Ongoing", value: Number(chartData?.ongoing_count) || 0, color: "#8AF1FF" },
    ];

    // Only include categories with values greater than 0
    categories.forEach(category => {
      if (category.value > 0) {
        seriesData.push({
          name: category.name,
          y: category.value,
          color: category.color
        });
      }
    });

    return seriesData;
  };

  // No Data Component
  const NoDataDisplay = () => (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-center mb-4">{title} Performance</h2>
      <div className="flex flex-col items-center justify-center h-64">
        <svg 
          className="w-16 h-16 text-gray-400 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
        <p className="text-gray-500 text-lg font-medium">No Data Available</p>
        <p className="text-gray-400 text-sm mt-2">No facility performance data to display</p>
      </div>
    </div>
  );

  // If no valid data, show no data message
  if (!hasValidData()) {
    return <NoDataDisplay />;
  }

  const seriesData = getChartSeries();

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
        innerSize: "60%",
        borderRadius: 0,
        dataLabels: {
          enabled: true,
          distance: -4,
          format: '{point.percentage:.0f}%',
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#ffffff',
            textOutline: '2px contrast'
          },
          backgroundColor: '#666666',
          borderColor: '#666666',
          borderRadius: 100,
          borderWidth: 0,
          padding: 10,
          useHTML: true,
          formatter: function() {
            return `<div style="background-color: #666666; color: white; padding: 8px; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">${Math.round(this.percentage)}%</div>`;
          }
        },
        borderWidth: 0,
        borderColor: '#ffffff',
      },
    },
    series: [
      {
        name: "Count",
        data: seriesData,
      },
    ],
    credits: {
      enabled: false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b><br>Percentage: <b>{point.percentage:.1f}%</b>'
    }
  };

  return (
    <div className="h-full w-full">
      <h2 className="text-xl font-bold text-center mb-4">{title} Performance</h2>
      <div className="flex items-center justify-center">
        <div className="relative w-full">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
};

export default FacilityPerformanceChart;