import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const FacilityCard = ({ name, value, trendUp, trendData }) => {
    const options = {
        chart: {
            type: "area",
            height: 50,
            width: 80,
            backgroundColor: "transparent",
        },
        title: { text: "" },
        xAxis: { visible: false },
        yAxis: { visible: false },
        legend: { enabled: false },
        tooltip: { enabled: false },
        series: [
            {
                data: trendData,
                color: trendUp ? "#00C3DE" : "#EB7487",
                fillOpacity: 0.3,
            },
        ],
        credits: { enabled: false },
    };

    return (
        <div className="flex items-center justify-between gap-1 border-b py-3">
            <div className="flex-shrink-0 w-1/3">
                <p className="font-semibold truncate">{name}</p>
            </div>
            <div className="w-20 flex-shrink-0">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-base font-semibold">{value}</span>
                <span className={trendUp ? "text-green-500" : "text-red-500"}>
                    {trendUp ? "\u2191" : "\u2193"}
                </span>
            </div>
        </div>
    );
};

const DailyAvgWatchList = ({ data }) => {
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        setDataList(data?.map((item) => ({
            name: item.heading,
            value: Math.abs(item.ppm_diff),
            trendUp: item.ppm_diff >= 0,
            trendData: item.value.map(y => Number(y))
        })) || []);
    }, [data])

    return (
        <div className="h-full p-4">
            <h2 className="text-xl font-bold text-center mb-4">Facilities</h2>
            <div className="text-center mt-2 mb-4">
                <p className="font-semibold">Watchlist</p>
                <p className="text-gray-500 text-sm">Daily Average</p>
            </div>
            <div className="h-3/4 overflow-y-auto">
                {dataList.length > 0 ? (
                    dataList.map((facility, index) => (
                        <FacilityCard key={index} {...facility} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No data available</p>
                )}
            </div>
        </div>
    );
};

export default DailyAvgWatchList;
