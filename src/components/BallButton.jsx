import React from "react";

const BallButton = ({ color, points, onClick, isFoul = false }) => {
  return (
    <div>
    <button
      onClick={() => onClick(points)}
      className={`w-12 h-12 m-1 rounded-full shadow-md text-white font-bold text-sm capitalize ${color} ${
        isFoul ? "border-2 border-red-500" : ""
        }`}
        
        >
      {points}
    </button>
        </div>
  );
};

export default BallButton;
