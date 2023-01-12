import React from "react";
import { dashboard } from "../../data/data";
import { StatContainer } from "../";
const DataLists = ({ data }) => {
  const datalists = () => {
    return dashboard.map((list) => {
      return (
        <div>
          <div className="text-3xl font-semibold mt-10">
            <h1>{list.title}</h1>
          </div>
          <div>
            {list.sub.map((item) => {
              return (
                <div className="my-4">
                  <StatContainer
                    icon={item.icon}
                    title={item.title}
                    color={list.color}
                    data={data[item.dataName]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };
  return (
    <div
      className="w-full flex flex-row
     justify-evenly px-14"
    >
      {datalists()}
    </div>
  );
};

export default DataLists;
