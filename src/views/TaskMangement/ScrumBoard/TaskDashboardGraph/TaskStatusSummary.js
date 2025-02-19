import React, { useEffect, useState } from "react";

const TaskStatusSummary = ({ taskSummaryData }) => {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    setSummary(taskSummaryData);
  }, [taskSummaryData]);

  const parseSummary = (text) => {
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold for **text**
      .replace(/\*(.*?)\*/g, "<em>$1</em>"); // Italic for *text*
    return { __html: formattedText };
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "15px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Task Status Summary
      </h2>
      <div
        style={{
          fontSize: "16px",
          textAlign: "center",
          color: summary ? "#555" : "#999",
          fontStyle: summary ? "normal" : "italic",
        }}
          dangerouslySetInnerHTML={parseSummary(
          summary || "No summary available"
        )}
      />
    </div>
  );
};

export default TaskStatusSummary;
