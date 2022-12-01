import React from "react";
import { useState, useEffect, useRef } from "react";
import { Searchbar, Map } from "./../components";
import mapConfig from "../config/config.json";
import getCoordinates from "../models/nominatim";
import scooter from "../models/scooters";
import maputils from "../utils/maputils";
import "../Map.css";
import { Icon } from "leaflet";
//import { Marker } from "react-leaflet";
//const geojsonObject = mapConfig.geojsonObject;
//const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];
const startpoint = mapConfig.center;

const MapOverview = () => {
  const [center, setCenter] = useState(startpoint);
  const [zoom, setZoom] = useState(14);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [features, setFeatures] = useState();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScooters();
      const data = res.scooters;
      const Markers = maputils.createMarkerArray(data);
      setMarkers(Markers);
    }
    fetchData();
  }, []);

  const handleSearch = async () => {
    const result = await getCoordinates(searchPhrase);
    const coordArr = [result.latitude, result.longitude];
    setFeatures(coordArr);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-center">
        <Searchbar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          handleSearch={handleSearch}
        />
      </div>
      <div className="">
        <Map
          center={center}
          zoom={zoom}
          features={features}
          markers={markers}
        />
      </div>
    </div>
  );
};

export default MapOverview;
