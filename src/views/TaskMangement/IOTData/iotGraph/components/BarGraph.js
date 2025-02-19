import React, { useState } from 'react';

const BarGraph = () => {
  // Sample dynamic data, which you would fetch or pass as props
  const [data, setData] = useState([
    { day: 'M', value: 40 },
    { day: 'T', value: 80 },
    { day: 'W', value: 120 },
    { day: 'T', value: 60 },
    { day: 'F', value: 100 },
    { day: 'S', value: 140 },
    { day: 'S', value: 90 },
  ]);

  const maxValue = Math.max(...data.map(item => item.value)); // Get the maximum value for scaling the bar heights

  return (
    <div className="w-[535px] h-[386px] pl-[25px] pr-[11px] pt-[18px] pb-3 bg-white rounded-[25px] shadow flex-col justify-end items-start gap-[9px] inline-flex">
      <div className="w-[359px] h-[29px] text-[#00261c] text-2xl font-normal font-['Century Gothic'] tracking-tight">Usage Report</div>

      <div className="w-[499px] h-[318px] relative flex justify-between items-end">
        {/* Left Graph Container */}
        <div className="w-[276px] h-[318px] left-0 top-0 absolute">
          <div className="w-[276px] h-[318px] bg-white rounded-[10px]">
            {/* Days Labels */}
            <div className="flex justify-between px-[16px] pt-[202.65px] text-[#757575] text-xs font-bold font-['Inter']">
              {data.map((item, index) => (
                <div key={index}>{item.day}</div>
              ))}
            </div>

            {/* Bars */}
            {data.map((item, index) => (
              <div
                key={index}
                className="w-4 rounded-[10px]"
                style={{
                  height: `${(item.value / maxValue) * 100}%`, // Dynamically calculate the bar height
                  backgroundColor: item.value >= 100 ? '#00c3de' : '#717171', // Change color based on value
                  position: 'absolute',
                  left: `${index * 36}px`, // Space out the bars
                  bottom: '0',
                }}
              />
            ))}

            {/* You are doing good message */}
            <div className="left-[57.80px] top-[260.55px] absolute text-[#757575] text-xs font-bold font-['Century Gothic']">
              You are doing good!
            </div>
            <div className="left-[57.80px] top-[276.79px] absolute text-[#757575] text-[10px] font-normal font-['Century Gothic']">
              You almost reached your goal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
