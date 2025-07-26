// import { Card } from "@/components/ui";
// import React from "react";
// import ReactHighcharts from "react-highcharts";
// import { useSelector } from "react-redux";

// const RealTimeColumn = () => {
//   // Get real-time data from Redux store
//   const realTimeData = useSelector((state) => state.iotData.data.IOTDashboardData.real_time_usage);
// console.log(useSelector((state) => state.iotData.data.IOTDashboardData))
//   // Define chart configuration
//   const chartConfig = {
//     chart: {
//       type: "column",
//     },
//     title: {
//       text: "",
//     },
//     credits: {
//       enabled: false,
//     },
//     xAxis: {
//       categories: realTimeData?.map((item) => item.facility_name), // Assuming facility_name is the property for facility in realTimeData
//       title: {
//         text: "Facilities",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Average Ammonia Levels (ppm)",
//       },
//       min: 0,
//       max: 8,
//     },
//     series: [
//       {
//         name: "Average Ammonia Levels (ppm)",
//         data: realTimeData?.map((item) => parseFloat(item.avg_ppm)), // Assuming avg_ppm is the property for average value in realTimeData
//       },
//     ],
//   };

//   return (
//     <Card>
//       <h3 className="mb-3 text-center">Real Time Usage - Today’s data</h3>
//       <div className="xl:flex items-center gap-10">
//         <ReactHighcharts config={chartConfig} />
//         <div>
//           <table className="border mt-2">
//             <thead>
//               <tr className="bo border-b">
//                 <th scope="col" className="p-2 text-left">
//                   Facility
//                 </th>
//                 <th scope="col" className="p-2">
//                   Average Value
//                 </th>
//                 <th scope="col" className="p-2">
//                   Min Value
//                 </th>
//                 <th scope="col" className="p-2">
//                   Max Value
//                 </th>
//                 <th scope="col" className="p-2">
//                   Stage
//                 </th>
//                 {/* Add more table headings if needed */}
//               </tr>
//             </thead>
//             <tbody>
//               {realTimeData?.map((item, index) => (
//                 <tr key={index}>
//                   <td className="p-2">{item.facility_name}</td>
//                   <td className="p-2">{item.avg_ppm} ppm</td>
//                   <td className="p-2">{item.min_ppm} ppm</td>
//                   <td className="p-2">{item.max_ppm} ppm</td>
//                   <td className="p-2">{item.stage} ppm</td>
//                   {/* Add more table cells for additional data */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default RealTimeColumn;
