import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import { Card } from "@/components/ui";
import MessageComponent from "./No_data_foud";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const AmmoniaLevelChart = ({ data, condition, range_of_ppm }) => {
  // const [gaugeOptions, setGaugeOptions] = useState({
  //     chart: {
  //         type: 'solidgauge',
  //         height: '60%',
  //         backgroundColor: 'transparent',
  //     },
  //     title: null,
  //     tooltip: {
  //         enabled: false
  //     },
  //     pane: {
  //         startAngle: 0,
  //         endAngle: 360,
  //         background: [{
  //             outerRadius: '112%',
  //             innerRadius: '88%',
  //             backgroundColor: Highcharts.color('#DDDF0D').setOpacity(0.3).get(),
  //             borderWidth: 0
  //         }],
  //     },
  //     yAxis: {
  //         min: 0,
  //         max: range_of_ppm.unhealthy_max,
  //         lineWidth: 0,
  //         tickPositions: []
  //     },
  //     credits: {
  //         enabled: false
  //     },
  //     plotOptions: {
  //         solidgauge: {
  //             dataLabels: {
  //                 enabled: true,
  //                 borderWidth: 0,
  //                 y: -20,
  //                 format: `<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/><span style="font-size:12px;color:${data.condition === 'Healthy' ? '#55BF3B' : data.condition === 'Moderate' ? '#DDDF0D' : '#DF5353'}">${condition}</span></div>`,
  //             },
  //             linecap: 'round',
  //             stickyTracking: false,
  //             rounded: true
  //         }
  //     },
  //     series: [{
  //         name: 'Ammonia Level',
  //         data: [{
  //             color: data.condition === 'Healthy' ? '#55BF3B' : data.condition === 'Moderate' ? '#DDDF0D' : '#DF5353',
  //             radius: '112%',
  //             innerRadius: '88%',
  //             y: data.avg_amonia
  //         }],
  //         dataLabels: {
  //             format: `<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/><span style="font-size:12px;color:${data.condition === 'Healthy' ? '#55BF3B' : data.condition === 'Moderate' ? '#DDDF0D' : '#DF5353'}">${condition}</span></div>`
  //         }
  //     }]
  // });

  // useEffect(() => {
  //     // Update chart dynamically if data changes
  //     setGaugeOptions(prevOptions => ({
  //         ...prevOptions,
  //         yAxis: {
  //             ...prevOptions.yAxis,
  //             max: range_of_ppm.unhealthy_max
  //         },
  //         series: [{
  //             ...prevOptions.series[0],
  //             data: [{
  //                 ...prevOptions.series[0].data[0],
  //                 y: data.avg_amonia,
  //                 color: data.condition === 'Healthy' ? '#55BF3B' : data.condition === 'Moderate' ? '#DDDF0D' : '#DF5353'
  //             }]
  //         }]
  //     }));
  // }, [data, condition, range_of_ppm]);

  const tableData = [
    { label: "Current Condition", value: data?.condition },
    {
      label: `Average Ammonia Level (${condition}) `,
      value: Number(data?.avg_amonia)?.toFixed(2),
    },
    {
      label: `Total Washroom Visits   `,
      value: Number(data?.pcd_max)?.toFixed(2),
    },
    // { label: "Percentage Threshold Exceeded", value: "5%" },
  ];

  return (
    // <div className="p-5 bg-white shadow-lg rounded-lg">
    //   <h3 className="mb-12 text-center">
    //     Real Time Ammonia Levels
    //   </h3>
    // <MessageComponent condition={data?.avg_amonia }>
    //   <div className=" w-full gap-32  flex justify-center items-start">
    //     <HighchartsReact
    //       highcharts={Highcharts}
    //       options={{
    //         chart: {
    //           type: "solidgauge",
    //           height: "45%",
    //           backgroundColor: "transparent",
    //         },
    //         title: null,
    //         tooltip: {
    //           enabled: false,
    //         },
    //         pane: {
    //           startAngle: 0,
    //           endAngle: 360,
    //           background: [
    //             {
    //               outerRadius: "112%",
    //               innerRadius: "88%",
    //               backgroundColor: Highcharts.color(`${
    //                 data.condition === "Healthy"
    //                   ? "#55BF3B"
    //                   : data.condition === "Moderate"
    //                   ? "#DDDF0D"
    //                   : "#DF5353"}`)
    //                 .setOpacity(0.3)
    //                 .get(),
    //               borderWidth: 0,
    //             },
    //           ],
    //         },
    //         yAxis: {
    //           min: Number(range_of_ppm.healthy_min),
    //           max: Number(range_of_ppm.unhealthy_max),
    //           lineWidth: 0,
    //           tickPositions: [],
    //         },
    //         credits: {
    //           enabled: false,
    //         },
    //         plotOptions: {
    //           solidgauge: {
    //             dataLabels: {
    //               enabled: true,
    //               borderWidth: 0,
    //               y: -20,
    //               format: `<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/><span style="font-size:12px;color:${
    //                 data.condition === "Healthy"
    //                   ? "#55BF3B"
    //                   : data.condition === "Moderate"
    //                   ? "#DDDF0D"
    //                   : "#DF5353"
    //               }">${condition}</span></div>`,
    //             },
    //             linecap: "round",
    //             stickyTracking: false,
    //             rounded: true,
    //           },
    //         },
    //         series: [
    //           {
    //             name: "Ammonia Level",
    //             data: [
    //               {
    //                 color:
    //                   data.condition === "Healthy"
    //                     ? "#55BF3B"
    //                     : data.condition === "Moderate"
    //                     ? "#DDDF0D"
    //                     : "#DF5353",
    //                 radius: "112%",
    //                 innerRadius: "88%",
    //                 y: Number(data?.avg_amonia),
    //               },
    //             ],
    //             dataLabels: {
    //               format: `<div style="text-align:center"><p style="font-size:25px;color:black">{y}</p><br/><p style="font-size:12px;color:${
    //                 data.condition === "Healthy"
    //                   ? "#55BF3B"
    //                   : data.condition === "Moderate"
    //                   ? "#DDDF0D"
    //                   : "#DF5353"
    //               }">${condition}</p></div>`,
    //             },
    //           },
    //         ],
    //       }}
    //       containerProps={{ className: "chart-container" }}
    //     />
    //     <div className="mt-12 p-4 bg-[#717171] text-white rounded-md drop-shadow">
    //       <h5 className="text-white">Dashboard Summary</h5>
    //       <table className="border rounded-md mt-2">
    //         <tbody>
    //           {tableData.map((row, index) => (
    //             <tr key={index} className="border-b">
    //               <td className="p-2">{row.label}</td>
    //               <th className="p-2">{row.value}</th>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    //   </MessageComponent>
    // </div>

    <div className="grid md:grid-cols-3 gap-4 justify-around p-2">
      <div className="p-5 bg-white shadow-custom border rounded-lg">
        <h4 className="text-center mb-6">Current Condition</h4>
        <div className={`h-44 w-44 bg-[${data.condition === 'Healthy' ? '#55BF3B' : data.condition === 'Moderate' ? '#DDDF0D' : '#DF5353'}] rounded-full mx-auto mb-4`}></div>
        <div className="flex justify-center items-center space-x-4">
          <div className="flex justify-between items-center">
            <div className="h-4 w-4 bg-[#55BF3B] rounded-md mr-1" /> Healthy
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-4 bg-[#DDDF0D] rounded-md mr-1" /> Moderate
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-4 bg-[#DF5353] rounded-md mr-1" /> Bad
          </div>
        </div>
      </div>
      <div className="p-5 bg-white shadow-custom border rounded-lg">
        <h4 className="text-center mb-6">Real Time Ammonia Levels</h4>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: "solidgauge",
                height: "60%",
                backgroundColor: "transparent",
              },
              title: null,
              tooltip: {
                enabled: false,
              },
              pane: {
                startAngle: 0,
                endAngle: 360,
                background: [
                  {
                    outerRadius: "112%",
                    innerRadius: "88%",
                    backgroundColor: Highcharts.color(
                      `${
                        data.condition === "Healthy"
                          ? "#55BF3B"
                          : data.condition === "Moderate"
                          ? "#DDDF0D"
                          : "#DF5353"
                      }`
                    )
                      .setOpacity(0.3)
                      .get(),
                    borderWidth: 0,
                  },
                ],
              },
              yAxis: {
                min: Number(range_of_ppm.healthy_min),
                max: Number(range_of_ppm.unhealthy_max),
                lineWidth: 0,
                tickPositions: [],
              },
              credits: {
                enabled: false,
              },
              plotOptions: {
                solidgauge: {
                  dataLabels: {
                    enabled: true,
                    borderWidth: 0,
                    y: -20,
                    format: `<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/><span style="font-size:12px;color:${
                      data.condition === "Healthy"
                        ? "#55BF3B"
                        : data.condition === "Moderate"
                        ? "#DDDF0D"
                        : "#DF5353"
                    }">${condition}</span></div>`,
                  },
                  linecap: "round",
                  stickyTracking: false,
                  rounded: true,
                },
              },
              series: [
                {
                  name: "Ammonia Level",
                  data: [
                    {
                      color:
                        data.condition === "Healthy"
                          ? "#55BF3B"
                          : data.condition === "Moderate"
                          ? "#DDDF0D"
                          : "#DF5353",
                      radius: "112%",
                      innerRadius: "88%",
                      y: Number(data?.avg_amonia),
                    },
                  ],
                  dataLabels: {
                    format: `<div style="text-align:center"><p style="font-size:25px;color:black">{y}</p><br/><p style="font-size:12px;color:${
                      data.condition === "Healthy"
                        ? "#55BF3B"
                        : data.condition === "Moderate"
                        ? "#DDDF0D"
                        : "#DF5353"
                    }">${condition}</p></div>`,
                  },
                },
              ],
            }}
            containerProps={{ className: "chart-container" }}
          />
        </div>
      </div>
      <div className="p-5 bg-white shadow-custom border rounded-lg">
        <h4 className="text-center mb-6">{tableData[2].label}</h4>
        <div className="h-48 w-48 border-8 rounded-full text-[#00C3DE] text-3xl font-bold flex justify-center items-center mx-auto">
          {tableData[2].value}
        </div>
      </div>
    </div>
  );
};

export default AmmoniaLevelChart;
