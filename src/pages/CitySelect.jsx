import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Map, ScooterSelectList } from "../components";
import { cityScooterOverview, cityZoneOverview } from "../data/data";
import cities from "../models/cities";
import scooter from "../models/scooters";
import maputils from "../utils/maputils";
import mapConfig from "../config/config.json";
import "../Map.css";
import getCoordinates from "../models/nominatim";
const startpoint = mapConfig.center;
const zoom = 14;

const CitySelect = () => {
  const [selected, setSelected] = useState();
  const [cityCoords, setCityCoords] = useState();
  const [scooters, setScooters] = useState();
  const [markers, setMarkers] = useState([]);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    async function fetchData() {
      const res = await cities.getCityById(id);
      setSelected(res);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScootersByCity(selected.city.name);
      setScooters(res.cityScooters);
      const mark = maputils.createMarkerArray(res.cityScooters);
      setMarkers(mark);
    }
    fetchData();
  }, [selected]);

  useEffect(() => {
    async function fetchData() {
      const result = await getCoordinates(selected.city.name);
      const coordArr = [result.latitude, result.longitude];
      setCityCoords(coordArr);
    }
    if (selected) {
      fetchData();
    }
  }, [selected]);

  const GetCityScooterDetails = () => {
    // const getValueByKey = (key, obj) => {
    //   return [].concat(key).reduce((o, k) => o[k], obj);
    // };

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
    // const getValueByKey = (key, obj) => {
    //   return [].concat(key).reduce((o, k) => o[k], obj);
    // };

    return cityZoneOverview.map((item) => {
      return (
        <div className="flex flex-row w-80 justify-between border-b">
          <p>{item.label}</p>
          <p>0</p>
        </div>
      );
    });
  };

  if (!selected) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-full p-4 flex flex-col">
      <div className="bg-white p-7 w-full shadow-md mb-4 rounded-xl">
        <h1 className="text-3xl mr-2">{selected.city.name}</h1>
      </div>

      <div className="flex flex-row">
        <div className="p-4 mr-4 w-2/3 rounded-xl shadow-md bg-white">
          {cityCoords ? (
            <div>
              <Map center={cityCoords} zoom={zoom} markers={markers} />
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
            <input
              type="text"
              placeholder="Fixed rate"
              //value={selected.scooter.coordinates.latitude}
              className="border-b border-gray-800 mr-2"
            />
            <input
              type="text"
              placeholder="Rate per minute"
              //value={selected.scooter.coordinates.latitude}
              className="border-b border-gray-800 mr-2"
            />
          </div>
          <div className="flex flex-row justify-between py-3">
            <input
              type="text"
              placeholder="Parking Rate"
              //value={selected.scooter.coordinates.latitude}
              className="border-b border-gray-800 mr-2"
            />
            <input
              type="text"
              placeholder="Discount Parking Rate"
              //value={selected.scooter.coordinates.latitude}
              className="border-b border-gray-800 mr-2"
            />
          </div>
          <div className="flex flex-row justify-between py-3">
            <input
              type="text"
              placeholder="Invalid parking fee"
              //value={selected.scooter.coordinates.latitude}
              className="border-b border-gray-800 mr-2"
            />
            <div>
              <input
                type="text"
                placeholder="Invalid to valid parking"
                //value={selected.scooter.coordinates.latitude}
                className="border-b border-gray-800 mr-2"
              />
            </div>
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
                Edit Zone
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
            Scooters in {selected.city.name}
          </h1>
          <button className="py-2 px-3 transition-colors bg-sidebarHover hover:bg-sidebarBlue text-white rounded-full">
            Remove Selected
          </button>
        </div>
        {scooters ? (
          <div className="mt-7">
            <ScooterSelectList scooters={scooters} />
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default CitySelect;
