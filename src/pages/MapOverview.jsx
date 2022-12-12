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
  const [features, setFeatures] = useState();
  const [scooters, setScooters] = useState([]);
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScooters();
      const data = res.scooters;
      setScooters(data);
    }
    fetchData();
    setInterval(fetchData, 1000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await cities.getCities();
      const data = res.cities;
      setCityData(data);
    }
    fetchData();
  }, []);

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
    <div className="flex flex-row w-full">
      <div className="w-3/4">
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
  );
};

export default MapOverview;
