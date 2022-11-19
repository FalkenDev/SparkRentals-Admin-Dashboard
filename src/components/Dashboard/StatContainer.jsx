import React from "react";
const StatContainer = ({ icon, title, color }) => {
  return (
    <div
      className="flex flex-row w-80 justify-between
     bg-white p-4 rounded-xl h-32 align-middle
       items-center shadow-md"
    >
      <div
        style={{ backgroundColor: color }}
        className="p-3 rounded-2xl w-16 h-16 text-4xl text-white
         flex justify-center align-middle"
      >
        {icon}
      </div>
      <div className="flex justify-between flex-col">
        <h1 className="text-2xl font-semibold text-right">9999</h1>
        <p className="text-gray-600 font-semibold">{title}</p>
      </div>
    </div>
  );
};

export default StatContainer;
