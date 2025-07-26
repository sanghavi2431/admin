import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";

const ratingsColor = [
  "rgba(0, 195, 222, 1)",
  "rgba(0, 195, 222, 0.5)",
  "rgba(105, 211, 204, 0.2)",
  "rgba(113, 113, 113, 1)",
  "#000",
];

const ReviewChart = ({ demoData = {} }) => {
  const [ratingsData, setRatingsData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const reviewData = useSelector(state => state.iotData?.data?.reviewDashboardData);
  const isDemoMode = useSelector((state) => state.iotData.data.isDemoMode);

  useEffect(() => {
    const sourceData = isDemoMode ? demoData : reviewData;

    if (sourceData) {
      const data = sourceData.data || [];
      const mappedData = data.map((count, index) => ({
        rating: index + 1,
        count,
        color: ratingsColor[index],
      }));
      setRatingsData(mappedData);
      setAverageRating(sourceData.avg_rating || 0);
    }
  }, [isDemoMode, demoData, reviewData]);


  const options = {
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: true,
    },
    title: {
      text: `${Number(averageRating).toFixed(1)} Stars`,
      align: "center",
      verticalAlign: "middle",
      // floating: true,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        innerSize: "85%", 
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          distance: -50,
        },
        showInLegend: true,
        borderRadius: 25,
      },
    },
    series: [{
      name: "Ratings",
      colorByPoint: true,
      data: ratingsData.map(rating => ({
        name: `${rating.rating} Stars`,
        y: rating.count,
        color: rating.color,
      })),
    }],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="h-full w-full flex items-center p-5 bg-white shadow-custom border rounded-lg">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ReviewChart;
