import React, { useState } from "react";
import { FaCity } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import { TbScooter } from "react-icons/tb";

const MapSidebar = ({ cities, scooters, handleFlyToArea, handleFlyTo }) => {
  const [isOpen, setIsOpen] = useState({});
  const handleClick = (id) => {
    setIsOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const rotate = (bool) => {
    if (bool) {
      return "rotate(90deg)";
    }
    return "rotate(0deg)";
  };

  const scootersList = (city) => {
    const filteredScooters = scooters.filter((item) => item.owner === city);
    return filteredScooters.map((item, index) => {
      return (
        <div
          key={index}
          className="p-3 flex flex-row border-b border-slate-500 transition-colors hover:bg-gray-300"
        >
          <span className="text-xl">
            <TbScooter />
          </span>
          <button
            onClick={() => {
              handleFlyTo([
                item.coordinates.latitude,
                item.coordinates.longitude,
              ]);
            }}
            className="pl-3 hover:text-slate-500 flex flex-row"
          >
            {item.name}
          </button>
        </div>
      );
    });
  };
  const listElement = () => {
    return cities.map((item) => {
      return (
        <div className="w-full relative">
          <div className="text-xl flex flex-row justify-between absolute px-2">
            <span className=" m-2">
              <FaCity />
            </span>
            <button
              onClick={() => {
                handleFlyToArea(item.name);
              }}
              className="hover:text-slate-700"
            >
              {item.name}
            </button>
          </div>
          <button
            onClick={() => handleClick(item._id)}
            className="p-2 bg-slate-300 w-full
           text-right border-b border-slate-400
           hover:bg-slate-400 transition-colors"
          >
            <div className="text-xl px-4">
              <button
                className="transition-transform"
                style={{ transform: rotate(isOpen[item._id]) }}
              >
                <AiOutlineRight />
              </button>
            </div>
          </button>
          {isOpen[item._id] ? (
            <div className="bg-gray-200">{scootersList(item.name)}</div>
          ) : (
            <div></div>
          )}
        </div>
      );
    });
  };
  return <div className="flex flex-col w-full ">{listElement()}</div>;
};

export default MapSidebar;
