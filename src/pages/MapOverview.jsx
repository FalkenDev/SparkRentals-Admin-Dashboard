import React from "react";
import { useState, useEffect, useRef } from "react";
import { Searchbar, Map, MapSidebar } from "./../components";
import mapConfig from "../config/config.json";
import getCoordinates from "../models/nominatim";
import scooter from "../models/scooters";
import cities from "../models/cities";
import "../Map.css";
const startpoint = mapConfig.center;

const MapOverview = () => {
  const [center, setCenter] = useState(startpoint);
  const [zoom, setZoom] = useState(14);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [features, setFeatures] = useState();
  const [scooters, setScooters] = useState([]);
  const [cityData, setCityData] = useState([]);
  const timerRef = useRef(null);
  timerRef.current = isLive;

  useEffect(() => {
    fetchScooterData();
  }, []);

  useEffect(() => {
    async function fetchCityData() {
      const res = await cities.getCities();
      const data = res.cities;
      setCityData(data);
    }
    fetchCityData();
  }, []);

  useEffect(() => {
    updateMap();
  }, [isLive]);

  async function fetchScooterData() {
    console.log("!");
    const res = await scooter.getScooters();
    const data = res.scooters;
    setScooters(data);
  }

  function updateMap() {
    const timer = setInterval(() => {
      if (timerRef.current === false) {
        // Read the boxed value
        clearInterval(timer);
      } else {
        fetchScooterData();
      }
    }, 1000);
  }

  const handleToggle = () => {
    setIsLive(!isLive);
  };

  const handleSearch = async () => {
    const result = await getCoordinates(searchPhrase);
    const coordArr = [result.latitude, result.longitude];
    setZoom(12);
    setFeatures(coordArr);
  };

  const handleFlyToArea = async (place) => {
    const result = await getCoordinates(place);
    const coordArr = [result.latitude, result.longitude];
    setZoom(12);
    setFeatures(coordArr);
  };

  const handleFlyTo = (coords) => {
    setZoom(16);
    setFeatures(coords);
  };

  return (
    <div className="w-full">
      {cityData ? (
        <div className="flex flex-row w-full">
          <div className="w-3/4">
            <div className="absolute  text-white z-100 leaflet-bottom pointer-events-auto bg-slate-700 p-3 rounded-tr-xl">
              <label class="inline-flex relative items-center cursor-pointer">
                <input
                  onClick={(e) => {
                    handleToggle();
                  }}
                  type="checkbox"
                  value={isLive}
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-800 peer-focus:outline-none
                  peer-focus:ring-4 peer-focus:ring-blue-300
                 dark:peer-focus:ring-blue-800 rounded-full peer
                  dark:bg-slate-500 peer-checked:after:translate-x-full 
                  peer-checked:after:border-white after:content-[''] 
                  after:absolute after:top-[2px] after:left-[2px]
                 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 
                  after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Live View
                </span>
              </label>
            </div>
            <Map
              center={center}
              zoom={zoom}
              features={features}
              scooters={scooters}
              cities={cityData}
            />
          </div>
          <div className="w-1/4 flex flex-col max-h-screen bg-gray-800">
            <div className="p-4">
              <Searchbar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                handleSearch={handleSearch}
              />
            </div>
            <div className="w-full overflow-scroll">
              <MapSidebar
                scooters={scooters}
                cities={cityData}
                handleFlyTo={handleFlyTo}
                handleFlyToArea={handleFlyToArea}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading</h1>
        </div>
      )}
    </div>
  );
};

export default MapOverview;
