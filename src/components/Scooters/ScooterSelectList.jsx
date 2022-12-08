import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
const ScooterSelectList = ({ scooters, isSelected, setIsSelected }) => {
  const handleSelect = (e, id) => {
    if (e.target.checked) {
      setIsSelected([...isSelected, id]);
    } else {
      const nextSelectScooters = isSelected.filter((item) => item != id);
      setIsSelected(nextSelectScooters);
    }
  };

  const scootersList = () => {
    return scooters.map((item, index) => {
      return (
        <tr key={index} className="border-b text-base border-gray-400 ">
          <td className="py-3 px-8 w-24">
            <input
              onChange={(e) => {
                e.preventDefault;
                handleSelect(e, item._id);
              }}
              type="checkbox"
              id={item.index}
              name="select"
            />
          </td>
          <td className="py-3 px-6">{index}</td>
          <td className="py-3 px-6">{item.owner}</td>
          <td className="py-3 px-6">{item.status}</td>
          <td className="py-3 px-6">{item.battery}%</td>
          <td className="py-3 px-6 w-2">
            <Link to={"/scooters/select"} state={{ id: item._id }}>
              <span>
                <AiOutlineRight />
              </span>
            </Link>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <table className="w-full text-lg content-between">
        <thead className=" bg-sidebarBlue text-gray-200 text-left">
          <tr>
            <th className="font-normal px-6">Select</th>
            <th className="font-normal px-6">ID</th>
            <th className="font-normal px-6">City</th>
            <th className="font-normal px-6"> Status</th>
            <th className="font-normal px-6">Battery</th>
            <th className="font-normal px-6">View</th>
          </tr>
        </thead>
        <tbody>{scootersList()}</tbody>
      </table>
    </>
  );
};

export default ScooterSelectList;
