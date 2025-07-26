import React from "react";

const OverallSummary = () => {
  return (
    <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2 style={{ fontSize: "18px", color: "#333", marginBottom: "10px" }}>Overall Air Quality and Usage Insights</h2>
      <p style={{ fontSize: "14px", color: "#555" }}>
        The data visualized across the three graphs provides a comprehensive view of air quality conditions, average PPM levels, and facility usage patterns. Key insights include:
      </p>
      <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#555" }}>
        <li>
          <strong>Air Quality Condition Distribution:</strong> Most of the monitored air quality conditions fall into the "Moderate" category, with a smaller proportion classified as "Bad" or "Good." This highlights the need for targeted actions to reduce the occurrences of poor air quality.
        </li>
        <li>
          <strong>Average PPM and Usage by Time:</strong> PPM levels and facility usage vary significantly across different times of the day. Peak usage times, such as afternoon and evening, correlate with higher PPM levels, indicating a need for enhanced ventilation and maintenance during these periods.
        </li>
        <li>
          <strong>Average PPM Scores Over Time:</strong> Both men's and women's washrooms show fluctuating PPM levels over time. Instances where PPM exceeds the threshold (50 ppm) are visualized with distinct markers, helping to identify periods requiring immediate attention.
        </li>
      </ul>
      <p style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}>
        These insights provide actionable data to improve air quality, optimize facility usage, and ensure healthier environments. Regular monitoring and analysis will help maintain conditions within acceptable limits and address issues proactively.
      </p>
    </div>
  );
};

export default OverallSummary;
