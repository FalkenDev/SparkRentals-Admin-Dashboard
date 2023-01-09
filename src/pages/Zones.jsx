import React, { useEffect, useState, useCallback } from "react";
import { Map } from "../components";
import { useLocation } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import utils from "../utils/utils";
import cities from "../models/cities";

const Zones = () => {
  const location = useLocation();
  const { id, coords } = location.state;
  const [selected, setSelected] = useState();
  const [isCreate, setIsCreate] = useState(false);
  const [zoneMarkers, setZoneMarkers] = useState([]);
  const [zoneType, setZoneType] = useState("parkingZone");
  const [zoneId, setZoneId] = useState();
  const [reverse, setReverse] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await cities.getCityById(id);
    setSelected(res.city);
  }

  const handleCreate = async () => {
    const newZone = {
      zoneType: zoneType,
      type: "MultipPolygon",
      coordinates: zoneMarkers,
    };

    setIsCreate(false);
    setZoneMarkers([]);
    setReverse([]);
    setZoneType("parkingZone");
    await cities.registerZone(id, newZone);
    await fetchData();
  };

  const handleClickOnZone = (id) => {
    setZoneId(id);
  };

  const handleDeleteZone = async (zoneID) => {
    await cities.deleteZone(zoneID, id);
    await fetchData();
  };

  const handleDeleteCoords = (coords) => {
    let allCoords = zoneMarkers;
    let revCoords = reverse;
    allCoords = allCoords.filter((element) => {
      if (element[0] !== coords[0] && element[1] !== coords[1]) {
        return element;
      }
    });
    revCoords = revCoords.filter((element) => {
      if (element[0] !== coords[1] && element[1] !== coords[0]) {
        return element;
      }
    });
    setZoneMarkers(allCoords);
    setReverse(revCoords);
  };

  const zoneList = () => {
    return selected.zones.map((item, index) => {
      return (
        <div
          className="p-3 border-b border-gray-300
         flex flex-row justify-between"
          key={index}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClickOnZone(item._id);
            }}
          >
            {index} - {utils.zoneNameTranslate(item.zoneType)}
          </button>
          <button onClick={() => handleDeleteZone(item._id)} className="px-5">
            <span className="text-slate-800 hover:text-red-600 transition-colors">
              <BsFillTrashFill />
            </span>
          </button>
        </div>
      );
    });
  };

  const createZoneList = () => {
    return zoneMarkers.map((item, index) => {
      return (
        <div
          className="p-3 border-b border-gray-300
           flex flex-row justify-between"
          key={index}
        >
          <div className="flex flex-row">
            <h1 className="pr-7">{index}</h1>

            <div>
              <p>Lat - {item[1]}</p>
              <p>Lon - {item[0]}</p>
            </div>
          </div>
          <button
            onClick={() => {
              handleDeleteCoords(item);
            }}
            className="px-5"
          >
            <span className="text-slate-800 hover:text-red-600 transition-colors">
              <BsFillTrashFill />
            </span>
          </button>
        </div>
      );
    });
  };

  if (!selected) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full p-5 flex flex-row justify-between">
        <h1 className="text-3xl">Zone Manager</h1>
        {isCreate ? (
          <div className="flex flex-row ">
            <div className="px-2">
              {/* <label className="text-xs">Zone type</label> */}
              <select
                name="zoneType"
                onChange={(e) => setZoneType(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900
              text-sm rounded-lg block p-2.5"
              >
                <option value="parkingZone">Parking Zone</option>
                <option value="noParkingZone">No Parking Zone</option>
                <option value="chargingZone">Charging Zone</option>
                <option value="bonusParkingZone">Bonus Parking</option>
              </select>
            </div>
            <button
              onClick={handleCreate}
              className="py-3 w-32 transition-colors bg-sidebarHover
        hover:bg-sidebarBlue text-white rounded-full mx-2"
            >
              Add Zone
            </button>
            <button
              onClick={() => {
                setZoneMarkers([]);
                setReverse([]);
                setIsCreate(false);
              }}
              className="py-3 w-32 transition-colors bg-red-600
          hover:bg-red-700 text-white rounded-full mx-2"
            >
              Cancel Create
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsCreate(true);
            }}
            className="py-3 w-32 transition-colors bg-sidebarHover
        hover:bg-sidebarBlue text-white rounded-full"
          >
            Create Zone
          </button>
        )}
      </div>
      <div className="flex flex-row">
        <div className="px-5 w-2/3">
          <div className=" h-132 overflow-hidden shadow-md rounded-xl">
            {selected ? (
              <Map
                zoom={14}
                center={coords}
                cities={[selected]}
                zoneId={zoneId}
                add={isCreate}
                zoneMarkers={zoneMarkers}
                setZoneMarkers={setZoneMarkers}
                noPopup={isCreate}
                reverse={reverse}
                setReverse={setReverse}
              />
            ) : (
              <>
                <div>No data...</div>
              </>
            )}
          </div>
        </div>
        <div className="w-1/3 shadow-md rounded-xl p-3 h-132">
          {isCreate ? (
            <div>
              <h1 className="text-xl pb-2">Create Zone</h1>
              <div className="overflow-scroll h-130">{createZoneList()}</div>
            </div>
          ) : (
            <div>
              <h1 className="text-xl pb-2">Area Overview</h1>
              <div className="overflow-scroll h-130">{zoneList()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Zones;
