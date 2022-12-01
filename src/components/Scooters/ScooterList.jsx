import React from "react";
import { useState, useEffect } from "react";
import scooter from "../../models/scooters";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

const ScooterList = ({ filterPhrase }) => {
  const [scooterData, setScooterData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScooters();
      console.log(res);
      setScooterData(res);
    }
    fetchData();
  }, []);

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
          <tr key={index} className="border-b text-base border-gray-400">
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

  if (!scooterData.scooters) {
    return <div>Loading</div>;
  }

  return (
    <>
      <table className="w-full text-lg text-left content-between">
        <thead className="uppercase bg-sidebarBlue text-gray-200">
          <tr>
            <th className="font-normal px-6">ID</th>
            <th className="font-normal px-6">City</th>
            <th className="font-normal px-6"> Status</th>
            {/* <th className="font-normal ">Current Position</th> */}
            <th className="font-normal px-6">Battery</th>
            <th className="font-normal px-6">View</th>
          </tr>
        </thead>
        <tbody>{scooters()}</tbody>
      </table>
    </>
  );
};

export default ScooterList;
