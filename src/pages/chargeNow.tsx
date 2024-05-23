import React from "react";
import "tailwindcss/tailwind.css";
import "../app/globals.css";
const ChargeNow = () => {
  return (
    <div className="h-screen bg-black">
      <svg width="100" height="100" className="text-white">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#36454F"
          strokeWidth="4"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          className="whiteText"
        >
          <tspan className="whiteText">80</tspan>
        </text>
      </svg>
      <div className="whiteText">hii</div>
    </div>
  );
};

export default ChargeNow;
