import React, { useRef } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AvgPPMByTimeGraph = () => {
  const dummyData = [
    { time: "Morning Peak", ppm: 40, usage: 120 },
    { time: "Afternoon Peak", ppm: 55, usage: 150 },
    { time: "Evening Peak", ppm: 35, usage: 90 },
    { time: "Late Night", ppm: 20, usage: 50 },
  ];

  // const graphRef = useRef(null); // Reference for the graph container
  // const summaryRef = useRef(null); // Reference for the summary container

  // const exportToPDF = async () => {
  //   const pdf = new jsPDF("p", "mm", "a4"); // Portrait mode, millimeter units, A4 size
  //   const graphCanvas = await html2canvas(graphRef.current); // Capture the graph
  //   const summaryCanvas = await html2canvas(summaryRef.current); // Capture the summary

  //   const graphImage = graphCanvas.toDataURL("image/png");
  //   const summaryImage = summaryCanvas.toDataURL("image/png");

  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const pageHeight = pdf.internal.pageSize.getHeight();

  //   // Add Graph Image to PDF
  //   pdf.addImage(graphImage, "PNG", 10, 10, pageWidth - 20, pageHeight / 2 - 10);

  //   // Add Summary Image to PDF
  //   pdf.addImage(
  //     summaryImage,
  //     "PNG",
  //     10,
  //     pageHeight / 2,
  //     pageWidth - 20,
  //     pageHeight / 2 - 10
  //   );

  //   // Save the PDF
  //   pdf.save("AvgPPMReport.pdf");
  // };

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Average PPM and People Usage by Time of Day",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#717171",
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "top",
      itemStyle: {
        color: "#717171",
        fontWeight: "bold",
      },
    },
    xAxis: {
      categories: dummyData.map((item) => item.time),
    },
    yAxis: [
      {
        title: { text: "PPM (Parts Per Million)", style: { color: "#00C3DE" } },
        labels: { style: { color: "#00C3DE" } },
        min: 0,
        max: 60,
        plotLines: [
          {
            value: 50, // Threshold value
            color: "#FF0000", // Red color for the threshold line
            dashStyle: "Dash", // Dashed line style
            width: 2, // Line width
            label: {
              text: "Threshold (50 ppm)",
              align: "center",
              style: { color: "#FF0000", fontWeight: "bold" },
            },
          },
        ],
      },
      {
        title: { text: "People Usage", style: { color: "#717171" } },
        labels: { style: { color: "#717171" } },
        opposite: true,
        min: 0,
        max: 200,
      },
    ],
    series: [
      {
        name: "Average PPM",
        data: dummyData.map((item) => item.ppm),
        color: "#00C3DE",
        yAxis: 0,
      },
      {
        name: "People Usage",
        data: dummyData.map((item) => item.usage),
        color: "#717171",
        yAxis: 1,
      },
    ],
    exporting: {
      enabled: false, // Disable the hamburger menu
    },
  };

  return (
    <div>
      {/* <button
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          backgroundColor: "#00C3DE",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Export to PDF
      </button> */}
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
            marginBottom: "20px",
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
            This column graph illustrates the average PPM (Parts Per Million)
            levels and the number of people using the facility during different
            times of the day. The metrics are shown on separate scales:
          </p>
          <ul>
            <li>
              <strong>PPM Score:</strong> Tracks the air quality, with a warning
              threshold set at <strong>50 ppm</strong>.
            </li>
            <li>
              <strong>People Usage:</strong> Represents the number of people using
              the facility.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AvgPPMByTimeGraph;
