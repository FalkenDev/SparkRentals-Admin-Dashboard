import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Map, ScooterSelectList } from "../components";
import { cityScooterOverview, cityZoneOverview } from "../data/data";
import cities from "../models/cities";
import scooter from "../models/scooters";
import "../Map.css";
import getCoordinates from "../models/nominatim";
const zoom = 14;

const CitySelect = () => {
  const [selected, setSelected] = useState();
  const [cityCoords, setCityCoords] = useState();
  const [scooters, setScooters] = useState();
  const [isSelected, setIsSelected] = useState([]);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    async function fetchData() {
      const res = await cities.getCityById(id);
      setSelected(res.city);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScootersByCity(selected.name);
      setScooters(res.cityScooters);
    }
    fetchData();
  }, [selected]);

  useEffect(() => {
    async function fetchData() {
      const result = await getCoordinates(selected.name);
      const coordArr = [result.latitude, result.longitude];
      setCityCoords(coordArr);
    }
    if (selected) {
      fetchData();
    }
  }, [selected]);

  const GetCityScooterDetails = () => {
    return cityScooterOverview.map((item) => {
      return (
        <div className="flex flex-row w-80 justify-between border-b">
          <p>{item.label}</p>
          <p>0</p>
        </div>
      );
    });
  };

  const GetCityZoneDetails = () => {
    return cityZoneOverview.map((item) => {
      return (
        <div className="flex flex-row w-80 justify-between border-b">
          <p>{item.label}</p>
          <p>0</p>
        </div>
      );
    });
  };

  //For deleting scooter
  const handleDelete = () => {
    let updatedScooterList = scooters;

    for (const scooterId of isSelected) {
      scooter.deleteScooter(scooterId);
      updatedScooterList = updatedScooterList.filter((sctr) => {
        return scooterId !== sctr._id;
      });
    }

    setScooters(updatedScooterList);
  };

  if (!selected) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-full p-4 flex flex-col">
      <div className="bg-white p-7 w-full shadow-md mb-4 rounded-xl">
        <h1 className="text-3xl mr-2">{selected.name}</h1>
      </div>

      <div className="flex flex-row">
        <div className="p-4 mr-4 w-2/3 rounded-xl shadow-md bg-white">
          {cityCoords ? (
            <div className="h-125 overflow-hidden">
              <Map
                center={cityCoords}
                zoom={zoom}
                scooters={scooters}
                cities={[selected]}
              />
            </div>
          ) : (
            <div>Loading map data</div>
          )}
          <div>
            <h1 className="font-semibold text-xl mt-3 mb-1">Overview</h1>
            <div className="flex flex-row">
              <div className="mr-7">{GetCityScooterDetails()}</div>
              <div>{GetCityZoneDetails()}</div>
            </div>
          </div>
        </div>

        <div
          className="p-7 ml-4 rounded-xl w-1/3 bg-white
         shadow-md flex flex-col justify-between h-full"
        >
          <h1 className="text-center font-semibold text-2xl">Settings</h1>
          <div>
            <h1 className="text-xl font-semibold">Rates</h1>
          </div>
          <div className="flex flex-row justify-between py-3">
            <div>
              <label>Fixed Rate</label>
              <input
                type="text"
                placeholder="Fixed rate"
                value={selected.taxRates.fixedRate}
                className="border-b border-gray-800 mr-2"
              />
            </div>
            <div>
              <label>Rate per minute</label>
              <input
                type="text"
                placeholder="Rate per minute"
                value={selected.taxRates.timeRate}
                className="border-b border-gray-800 mr-2"
              />
            </div>
          </div>

          <div className="flex flex-row justify-between py-3">
            <div>
              <label>Parking Rate</label>
              <input
                type="text"
                placeholder="Parking Rate"
                value={selected.taxRates.parkingZoneRate}
                className="border-b border-gray-800 mr-2"
              />
            </div>
            <div>
              <label>Discount Rate</label>
              <input
                type="text"
                placeholder="Discount Parking Rate"
                value={selected.taxRates.bonusParkingZoneRate}
                className="border-b border-gray-800 mr-2"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between py-3">
            <div>
              <label>Invalid parking fee</label>
              <input
                type="text"
                placeholder="Invalid parking fee"
                value={selected.taxRates.noParkingZoneRate}
                className="border-b border-gray-800 mr-2"
              />
            </div>
            <div>
              <div>
                <label>Invalid to valid parking</label>
                <input
                  type="text"
                  placeholder="Invalid to valid parking"
                  value={selected.taxRates.noParkingToValidParking}
                  className="border-b border-gray-800 mr-2"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-start py-3">
            <div>
              <div className="flex flex-col">
                <label>Charging Zone</label>
                <input
                  type="text"
                  placeholder="Invalid to valid parking"
                  value={selected.taxRates.chargingZoneRate}
                  className="border-b border-gray-800 mr-2"
                />
              </div>
            </div>
            <div></div>
          </div>
          <div className="mb-12 text-center">
            <button
              className="py-2 px-7 transition-colors mt-6 w-48
             bg-sidebarHover hover:bg-sidebarBlue text-white rounded-xl"
            >
              Save
            </button>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Tools</h1>
            <div className="flex flex-row justify-center mb-20">
              <button
                className="py-2 transition-colors mt-6 mr-3 w-48
             bg-sidebarHover hover:bg-sidebarBlue text-white rounded-xl"
              >
                Manage Zones
              </button>
              <button
                className="py-2 transition-colors mt-6 ml-3 w-48
             bg-sidebarHover hover:bg-sidebarBlue text-white rounded-xl"
              >
                Register Scooter
              </button>
            </div>
            <div className="mt-6">
              <h1 className="text-xl font-semibold">Delete</h1>
              <div className="flex flex-row justify-center">
                <button
                  className="py-2 transition-colors mt-6 ml-3 w-48
                   bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  Delete City
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-full p-7 my-4 rounded-xl w-full bg-white
         shadow-md flex flex-col justify-between"
      >
        <div className="flex flex-row justify-between">
          <h1 className="font-semibold text-2xl">
            Scooters in {selected.name}
          </h1>
          <button
            onClick={handleDelete}
            className="py-2 px-3 transition-colors bg-sidebarHover
           hover:bg-sidebarBlue text-white rounded-full"
          >
            Remove Selected
          </button>
        </div>
        {scooters ? (
          <div className="mt-7">
            <ScooterSelectList
              scooters={scooters}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
          </div>
        ) : (
          <div className="text-xl">No Scooters</div>
        )}
      </div>
    </div>
  );
};

export default CitySelect;
