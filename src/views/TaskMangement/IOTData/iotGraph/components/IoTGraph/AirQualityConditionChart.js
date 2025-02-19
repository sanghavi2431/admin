import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const AirQualityConditionChart = () => {
  const airQualityData = [
    { condition: "bad", count: 414, percentage: 13.13 },
    { condition: "good", count: 2164, percentage: 68.63 },
    { condition: "moderate", count: 575, percentage: 18.24 },
  ];

  // Prepare data for Highcharts
  const chartData = airQualityData.map(({ condition, count, percentage }) => {
    const color = condition === "bad" ? "#00C3DE" : condition === "moderate" ? "#231F20" : "#717171";
    return { name: `${condition.charAt(0).toUpperCase() + condition.slice(1)} (${percentage}%)`, y: count, color };
  });

  // Analyze data for insights
  const totalOccurrences = airQualityData.reduce((sum, { count }) => sum + count, 0);
  const highestCondition = airQualityData.reduce((a, b) => (a.count > b.count ? a : b));
  const lowestCondition = airQualityData.reduce((a, b) => (a.count < b.count ? a : b));

  const insights = {
    totalOccurrences,
    highestCondition,
    lowestCondition,
  };

  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Air Quality Condition Distribution",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b> ({point.y} occurrences)",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Conditions",
        colorByPoint: true,
        data: chartData,
      },
    ],
    exporting: {
      enabled: false,
    },
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "20px", padding: "20px", backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: "8px" }}>
      {/* Chart */}
      <div style={{ flex: 1 }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

      {/* Description */}
      <div style={{ flex: 1, fontSize: "14px", color: "#555", padding: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <p style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
          The chart displays the distribution of air quality conditions based on monitored data. The data shows the percentage and total occurrences for each condition category:
        </p>
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          {airQualityData.map(({ condition, count, percentage }) => (
            <li key={condition}>
              <strong style={{ color: chartData.find((data) => data.name.toLowerCase().includes(condition)).color }}>
                {condition.charAt(0).toUpperCase() + condition.slice(1)} ({percentage}%):
              </strong>{" "}
              {count} occurrences.
            </li>
          ))}
        </ul>
        <p style={{ marginTop: "10px", lineHeight: "1.5" }}>
          <strong>Total observations:</strong> {insights.totalOccurrences}.
        </p>
        <p style={{ lineHeight: "1.5" }}>
          <strong>Condition with the highest frequency:</strong> {insights.highestCondition.condition} ({insights.highestCondition.count} occurrences, {insights.highestCondition.percentage}%).
        </p>
        <p style={{ lineHeight: "1.5" }}>
          <strong>Condition with the lowest frequency:</strong> {insights.lowestCondition.condition} ({insights.lowestCondition.count} occurrences, {insights.lowestCondition.percentage}%).
        </p>
      </div>
    </div>
  );
};

export default AirQualityConditionChart;
