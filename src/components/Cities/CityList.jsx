import React, { useEffect, useState } from "react";
//import cities from "../../models/cities";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
const CityList = ({ filterPhrase, cityData }) => {
  const citiesList = () => {
    return cityData.arrayOverview
      .filter((item) => {
        if (filterPhrase === "") {
          return item;
        } else if (
          item.name.toLowerCase().includes(filterPhrase.toLowerCase())
        ) {
          return item;
        }
        return;
      })
      .map((item, index) => {
        return (
          <tr key={index} className="border-b text-base border-gray-400">
            <td className="py-3 px-6">{index}</td>
            <td className="py-3 px-6">{item.name}</td>
            <td className="py-3 px-6">{item.totalScooters}</td>
            <td className="py-3 px-6">{item.totalInUse}</td>
            <td className="py-3 px-6">{item.totalAvailable}</td>
            <td className="py-3 px-6">{item.totalUnavailable}</td>
            <td className="py-3 px-6">{item.totalMaintenance}</td>
            <td className="py-3 px-6">{item.totalOff}</td>
            <td className="py-3 px-6">{item.totalZones}</td>
            <td className="py-3 px-6 text-right">
              <Link to={"/cities/select"} state={{ id: item._id }}>
                <span>
                  <AiOutlineRight />
                </span>
              </Link>
            </td>
          </tr>
        );
      });
  };

  if (!cityData.arrayOverview) {
    return <div>Loading</div>;
  }

  return (
    <>
      <table className="w-full text-lg content-between text-center">
        <thead className=" bg-sidebarBlue text-gray-200">
          <tr>
            <th className="font-normal px-6">ID</th>
            <th className="font-normal px-6">City</th>
            <th className="font-normal px-6">Scooters</th>
            <th className="font-normal px-6">Active</th>
            <th className="font-normal px-6">Available</th>
            <th className="font-normal px-6">Charging</th>
            <th className="font-normal px-6">Maintance</th>
            <th className="font-normal px-6">Off</th>
            <th className="font-normal px-6">Zones</th>
            <th className="font-normal px-6">View</th>
          </tr>
        </thead>
        <tbody>{citiesList()}</tbody>
      </table>
    </>
  );
};

export default CityList;
