import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ChevronDown } from "lucide-react";
import { fetchJanitors } from "@/services/taskManagement/janitorService";
import { fetchTask } from "@/services/taskManagement/taskDashboardService";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { Loading } from "@/components/shared";

// Sample data structure - you can replace this with your actual data prop
// const defaultData = {
//     completed_count: 6,
//     accepted_count: 2,
//     ongoing_count: 3,
//     pending_count: 2,
//     completed_percentage: 97
// };

const TaskAuditChart = ({ data }) => {
    const [selectedBuddy, setSelectedBuddy] = useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [buddyOptions, setBuddyOptions] = useState([]);
    const [chartData, setChartData] = useState();
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const { type, payload, isDemoMode } = useSelector((state) => state.iotData?.data);

    useEffect(() => {
        if (data) setChartData(data)
    }, [data]);

    useEffect(() => {
        async function getJanitors() {
            try {
                const res = await fetchJanitors(
                    {
                        "role_id": 1
                    }
                );
                const janitorsList = res?.data?.results?.data;
                setBuddyOptions(janitorsList.map(j => {
                    return {
                        id: j.id,
                        name: j.name || "Unknown",
                    }
                }
                ))
            } catch (e) {
                setBuddyOptions([]);
            }
        }
        getJanitors();
    }, []);

    useEffect(() => {
        if (!isDropdownOpen) return;
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    useEffect(() => {
        async function fetchDashboard() {
            if (selectedBuddy) {
                setLoading(true);
                try {
                    const data = {
                        ...cloneDeep(payload),
                        type,
                        janitor_id: selectedBuddy?.id
                    };
                    const res = await fetchTask(data);
                    if (res?.data?.results?.Task_status_distribution) {
                        setChartData(res.data.results.Task_status_distribution);
                    }
                } catch (e) {
                    // Optionally handle error
                    console.error("Facing server error: ", e);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchDashboard();
    }, [selectedBuddy]);

    const options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            height: "300px",
            spacing: [0, 0, 0, 0]
        },
        title: {
            text: `<div style="text-align: center; margin-top: 20px;">
               <div style="font-size: 60px; font-weight: bold; color: #333; line-height: 1;">${chartData?.completed_percentage || "0%"}</div>
               <div style="font-size: 18px; color: #8BDFFB; font-weight: 600; margin-top: 8px;">Task Buddy</div>
               <div style="font-size: 16px; color: #666; font-weight: 500;">Efficiency</div>
             </div>`,
            align: "center",
            verticalAlign: "middle",
            useHTML: true,
            style: {
                fontSize: "16px"
            }
        },
        plotOptions: {
            pie: {
                innerSize: "85%",
                borderWidth: 0,
                borderRadius: 10,
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true,
                states: {
                    hover: {
                        halo: {
                            size: 0
                        }
                    }
                }
            }
        },
        series: [
            {
                name: "Tasks",
                data: [
                    { name: "Completed Tasks", y: Number(chartData?.completed_count), color: "#8BDFFB" },
                    { name: "Accepted Tasks", y: Number(chartData?.accepted_count), color: "#006C7B" },
                    { name: "On Going Tasks", y: Number(chartData?.ongoing_count), color: "#8AF1FF" },
                    { name: "Pending Tasks", y: Number(chartData?.pending_count), color: "#008C9F" }
                ]
            }
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
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-center">Task Audit</h2>
                <div className="relative" ref={dropdownRef}>
                    <button
                        disabled={isDemoMode}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <span>{selectedBuddy?.name || "Select Task Buddy"}</span>
                        <ChevronDown size={16} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 max-h-60 overflow-y-auto bg-white rounded-lg shadow-lg border z-10">
                            {buddyOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setSelectedBuddy(option);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                                >
                                    {option.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <Loading loading={loading}>
                    <div className="flex flex-row justify-center items-center w-full gap-8">
                        {/* Highcharts Chart */}
                        <div className="mb-0 flex-shrink-0" style={{ width: '320px', minWidth: '260px' }}>
                            <HighchartsReact highcharts={Highcharts} options={options} />
                        </div>

                        {/* Legend */}
                        <div className="grid grid-cols-1 gap-4 w-56">
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                <div className="w-4 h-4 rounded-full bg-[#8BDFFB]"></div>
                                <div>
                                    <div className="text-gray-700 font-medium">Completed Tasks: {chartData?.completed_count}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                <div className="w-4 h-4 rounded-full bg-[#006C7B]"></div>
                                <div>
                                    <div className="text-gray-700 font-medium">Accepted Tasks: {chartData?.accepted_count}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                <div className="w-4 h-4 rounded-full bg-[#8AF1FF]"></div>
                                <div>
                                    <div className="text-gray-700 font-medium">On Going Tasks: {chartData?.ongoing_count}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                <div className="w-4 h-4 rounded-full bg-[#008C9F]"></div>
                                <div>
                                    <div className="text-gray-700 font-medium">Pending Tasks: {chartData?.pending_count}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Loading>
            </div>
        </div>
    );
};

export default TaskAuditChart;