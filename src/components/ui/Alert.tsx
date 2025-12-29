import React from "react";

type AlertProps = {
  message: string;
  type?: "error" | "success" | "info";
};

const Alert = ({ message, type = "error" }: AlertProps) => {
  const colors = {
    error: { bg: "#ffebee", text: "#c62828", border: "#ef9a9a" },
    success: { bg: "#e8f5e9", text: "#2e7d32", border: "#a5d6a7" },
    info: { bg: "#e3f2fd", text: "#1565c0", border: "#90caf9" },
  };

  const style = colors[type];

  return (
    <div
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
        padding: "10px",
        borderRadius: "4px",
        marginBottom: "10px",
        fontSize: "14px",
      }}
    >
      {message}
    </div>
  );
};

export default Alert;
