import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import { FaUserCircle } from "react-icons/fa"; 

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const AirQualityGauge = ({ value }) => {
    const options = {
        chart: {
            type: "solidgauge",
            backgroundColor: "transparent",
            height: "250px",
        },
        title: {
            text: null,
        },
        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [
                {
                    outerRadius: "100%",
                    innerRadius: "80%",
                    shape: "arc",
                    borderWidth: 0,
                    backgroundColor: "#717171", // Gray background
                    borderRadius: 10
                },
            ],
        },
        yAxis: {
            min: 0,
            max: 1000, // Scale from 0 to 1
            stops: [[0.3, "#00C3DE"]], // Blue arc color
            lineWidth: 0,
            tickPositions: [],
            labels: {
                enabled: false,
            },
        },
        series: [
            {
                name: "Air Quality",
                data: [Number(value)],
                borderRadius: 10, // Rounded arc
                dataLabels: {
                    enabled: false, // Hide default labels
                },
                overshoot: 0,
                rounded: true,
                color: "#00C3DE", // Blue arc
            },
        ],
        tooltip: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: false,
        },
    };

    return (
        <div className="text-center">
            <h2 className="text-xl font-bold text-center mb-4">Air Quality Level</h2>
            <p className="text-gray-500 font-semibold mt-1">Overall Performance</p>

            <div className="relative flex items-center justify-center mt-3">
                <HighchartsReact highcharts={Highcharts} options={options} />
                <div className="absolute flex flex-col items-center">
                    <FaUserCircle className="text-gray-400 text-4xl" />
                    <span className="text-2xl font-bold text-gray-900">{value}</span>
                </div>
            </div>

            <p className="text-gray-500 font-semibold">
                Average AQL across all facilities
            </p>
        </div>
    );
};

export default AirQualityGauge;
