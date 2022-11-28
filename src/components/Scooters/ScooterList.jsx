import React from "react";
import { scooterData } from "../../data/mock/mockdata";
import { AiOutlineRight } from "react-icons/ai";

const ScooterList = ({ filterPhrase }) => {
  const scooters = () => {
    return scooterData.scooters
      .sort((a, b) => {
        return a.owner.localeCompare(b.owner);
      })
      .filter((item) => {
        if (filterPhrase === "") {
          return item;
        } else if (
          item.owner.toLowerCase().includes(filterPhrase.toLowerCase())
        ) {
          return item;
        } else if (
          item.status.toLowerCase().includes(filterPhrase.toLowerCase())
        ) {
          return item;
        }
        return;
      })
      .map((item, index) => {
        return (
          <tr key={index} className="border-b text-base border-gray-700">
            <td className="py-3 px-6">{index}</td>
            <td className="py-3 px-6">{item.owner}</td>
            <td className="py-3 px-6">{item.status}</td>
            <td className="py-3 px-6">{item.battery}%</td>
            <td className="py-3 px-6">
              <button>
                <AiOutlineRight />
              </button>
            </td>
          </tr>
        );
      });
  };
  return (
    <>
      <table className="w-full text-lg table-auto text-left">
        <thead className="text-lg text-gray-800 p-1 border-y border-gray-800">
          <tr>
            <th className="font-normal px-6">ID</th>
            <th className="font-normal px-6">City</th>
            <th className="font-normal px-6"> Status</th>
            {/* <th className="font-normal ">Current Position</th> */}
            <th className="font-normal px-6">Battery</th>
          </tr>
        </thead>
        <tbody>{scooters()}</tbody>
      </table>
    </>
  );
};

export default ScooterList;
