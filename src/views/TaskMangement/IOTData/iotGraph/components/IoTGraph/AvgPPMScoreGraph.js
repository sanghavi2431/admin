import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const AvgPPMScoreGraph = () => {
  const data = {
    category: [
      "2025-01-14",
      "2025-01-15",
      "2025-01-16",
      "2025-01-17",
      "2025-01-18",
      "2025-01-19",
      "2025-01-20",
      "2025-01-21",
    ],
    values: {
      "Etah UWT001": [2, 85, 2, 17, 120, 208, 9, 179],
      "Lal Kuan UWF049": [166, 499, 0, 268, 846, 1235, 479, 419],
      "Lucknow-2 UET002": [155.5, 138, 67, 16, 0, 74.5, 65, 26.5],
      "Raibareilly UEF025": [133.5, 45.5, 77, 236.5, 188.5, 82, 101.5, 576.5],
      "VaranasiTS UET004": [527, 107, 3910, 1728, 1545, 1066, 633, 416],
      "Majhola UWC016": [0, 0, 2020, 0, 1856, 0, 0, 0],
    },
  };

  const threshold = 500;

  // Analyze the data for insights
  const insights = (() => {
    const summary = Object.entries(data.values).map(([location, values]) => {
      const total = values.reduce((sum, val) => sum + val, 0);
      const avg = total / values.length;
      const max = Math.max(...values);
      const min = Math.min(...values);
      const aboveThreshold = values.filter((val) => val > threshold).length;

      return { location, avg, max, min, aboveThreshold };
    });

    // Locations with the highest average PPM
    const highestAvg = summary.reduce((a, b) => (a.avg > b.avg ? a : b));

    // Date-wise maximum PPM
    const dateMaxValues = data.category.map((date, idx) => {
      const dateValues = Object.values(data.values).map((vals) => vals[idx]);
      return { date, max: Math.max(...dateValues) };
    });
    const highestDate = dateMaxValues.reduce((a, b) => (a.max > b.max ? a : b));

    return {
      highestAvg,
      highestDate,
      summary,
    };
  })();

  const options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      text: "Average PPM Score Report",
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
      y: 0,
      itemStyle: {
        color: "#717171",
      },
    },
    xAxis: {
      categories: data.category,
      title: {
        text: "Dates",
        style: {
          color: "#717171",
          fontWeight: "bold",
        },
      },
      labels: {
        style: {
          color: "#717171",
        },
      },
      gridLineWidth: 0,
      lineWidth: 1,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Average PPM Score",
        style: {
          color: "#00C3DE",
          fontWeight: "bold",
        },
      },
      labels: {
        style: {
          color: "#00C3DE",
        },
      },
      gridLineWidth: 1,
      plotLines: [
        {
          color: "#FF0000",
          width: 2,
          value: threshold,
          dashStyle: "Dash",
          label: {
            text: `Threshold (${threshold} ppm)`,
            align: "center",
            style: { color: "#FF0000", fontWeight: "bold" },
          },
          zIndex: 3,
        },
      ],
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ppm</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: true,
      },
    },
    credits: {
      enabled: false,
    },
    series: Object.entries(data.values).map(([location, values]) => ({
      name: location,
      data: values,
      zones: [
        {
          value: threshold,
          marker: { symbol: "circle" },
        },
        {
          color: "#FF0000",
          marker: { symbol: "diamond" },
        },
      ],
    })),
    exporting: {
      enabled: false,
    },
  };

  return (
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
      <div style={{ flex: 1 }}>
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
        <p>
          This graph illustrates the average PPM (Parts Per Million) scores for
          various locations over time, indicating ammonia levels and air
          quality.
        </p>
        <h4>Summary Insights:</h4>
        <ul>
          <li>
            <strong>Location with the highest average PPM:</strong>{" "}
            {insights.highestAvg.location} ({insights.highestAvg.avg.toFixed(2)}{" "}
            ppm on average).
          </li>
          <li>
            <strong>Date with the highest PPM across locations:</strong>{" "}
            {insights.highestDate.date} ({insights.highestDate.max} ppm).
          </li>
          <li>
            Locations exceeding the threshold most frequently:
            <ul>
              {insights.summary.map(({ location, aboveThreshold }) => (
                <li key={location}>
                  {location}: {aboveThreshold} times
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AvgPPMScoreGraph;
