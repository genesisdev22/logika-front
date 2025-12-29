import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LoaderProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const Loader = ({ className, size = "medium" }: LoaderProps) => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/loading.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch animation");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error("Loader animation error:", err);
      });
  }, []);

  const sizeMap = {
    small: 24,
    medium: 60,
    large: 120,
  };

  const width = sizeMap[size];
  const height = sizeMap[size];
  const padding = size === "small" ? "0px" : "20px";

  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: padding,
      }}
    >
      {animationData ? (
        <div style={{ width, height }}>
          <Lottie animationData={animationData} loop={true} />
        </div>
      ) : (
        <div style={{ color: "#aaa", fontSize: size === "small" ? 10 : 14 }}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default Loader;
