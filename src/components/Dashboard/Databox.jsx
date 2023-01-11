import React from "react";
import { StatContainer } from "../";
import { dashboard } from "../../data/data";
const Databox = ({ data }) => {
  const databoxes = () => {
    return dashboard.map((items) => {
      return (
        <div className="px-1">
          <StatContainer
            icon={items.icon}
            title={items.title}
            color={items.color}
            data={data[items.dataName]}
          />
        </div>
      );
    });
  };
  return (
    <div className="flex flex-row justify-evenly p-8 shadow-inner bg-blue-800 w-full rounded-xl">
      {databoxes()}
    </div>
  );
};

export default Databox;
