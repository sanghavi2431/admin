// import { Card } from "@/components/ui";
// import React from "react";
// import ReactHighcharts from "react-highcharts";
// import { useSelector } from "react-redux";

// const AreaChart = () => {
//   // Get historical ammonia level data from Redux store
//   const historicalData = useSelector((state) => state.iotData.data.IOTDashboardData.historical_ammonia_level);

//   // Configure the chart
//   const chartConfig = {
//     chart: {
//       type: "area",
//     },
//     title: {
//       text: "",
//     },
//     credits: {
//       enabled: false,
//     },
//     series: [
//       {
//         data: historicalData.map((data) => parseFloat(data.avg_ppm)), // Assuming avg_ppm is the property for average level in historicalData
//         fillColor: "rgba(100, 200, 255, 0.3)",
//         name: "Historical Average Level",
//       },
//     ],
//     yAxis: {
//       title: {
//         text: "Ammonia Level (ppm)",
//       },
//       min: 0,
//       max: Math.max(...historicalData.map((data) => parseFloat(data.max_ppm))), // Assuming max_ppm is the property for max value in historicalData
//     },
//     xAxis: {
//       categories: historicalData.map((data) => data.date),
//       title: {
//         text: "Date",
//       },
//     },
//   };

//   return (
//     <Card>
//       <h3 className="mb-3 text-center">Historical Ammonia level</h3>
//       <div className="xl:flex items-center gap-10">
//         {/* Render the chart */}
//         <ReactHighcharts config={chartConfig} />
//         {/* Render the table */}
//         <div>
//           <table className="border mt-2">
//             <thead className="border-b">
//               <tr>
//                 <th scope="col" className="p-2 text-left">
//                   Date
//                 </th>
//                 <th scope="col" className="p-2 text-left">
//                   Average Value
//                 </th>
//                 <th scope="col" className="p-2">
//                   Min Value
//                 </th>
//                 <th scope="col" className="p-2">
//                   Max Value
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {historicalData.map((data, index) => (
//                 <tr key={index}>
//                   <td className="p-2">{data.date}</td>
//                   <td className="p-2">{data.avg_ppm} ppm</td>
//                   <td className="p-2">{data.min_ppm} ppm</td>
//                   <td className="p-2">{data.max_ppm} ppm</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default AreaChart;
