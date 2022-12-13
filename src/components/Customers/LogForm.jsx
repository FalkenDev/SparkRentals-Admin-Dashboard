import React from "react";
import { GrClose } from "react-icons/gr";

const LogForm = ({ handleForm, logData }) => {
  const logList = () => {
    return logData.map((item, index) => {
      return (
        <div key={index} className="border-b border-gray-400 p-2 text-sm">
          <div className="flex flex-row justify-between">
            <p>{item.scooterName}</p>
            <p>{item.date}</p>
          </div>
          <div>
            <p className="py-1">
              {item.totalMin} Minutes for {item.totalPrice} SEK
            </p>

            <p>
              Start pos {item.startPosition[0]},{item.startPosition[1]} - End
              pos {item.endPosition[0]},{item.endPosition[1]}
            </p>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="pb-2 px-2 bg-white w-72 h-131 rounded-xl shadow-md">
      <button className="py-1" onClick={() => handleForm()}>
        <GrClose />
      </button>
      <div>
        <h1 className="text-xl text-center pb-2">Log History</h1>
      </div>
      <div className=" bg-gray-200 w-full h-130 rounded-xl overflow-scroll">
        {logList()}
      </div>
    </div>
  );
};

export default LogForm;
