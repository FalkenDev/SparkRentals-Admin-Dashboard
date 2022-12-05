import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  GeoJSON,
} from "react-leaflet";
import * as L from "leaflet";
import ScooterIcon from "../../assets/icons/ScooterMarker.svg";
import "../../Map.css";
import scooterutils from "../../utils/scooterutils";

//import * as parkData from "./data/skateboard-parks.json";

const Map = ({ center, zoom, features, scooters, cities }) => {
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const scooterIcon = new LeafIcon({
    iconUrl: ScooterIcon,
    iconSize: [68, 95],
    iconAnchor: [34, 95],
    popupAnchor: [-3, -76],
  });

  const areaStyle = (type) => {
    switch (type) {
      case "parkingZone":
        return {
          fillColor: "blue",
          fillOpacity: 0.1,
        };
      case "noParkingZone":
        return {
          fillColor: "red",
          fillOpacity: 0.4,
          weight: 1,
        };
      case "bonusParkingZone":
        return {
          fillColor: "green",
          fillOpacity: 0.4,
          weight: 1,
        };
    }
  };

  function Search() {
    const map = useMap();
    if (features) {
      map.flyTo(features, zoom);
      //map.setZoom(10);
    }

    return null;
  }

  function MarkersDisplay() {
    if (scooters) {
      return scooters.map((item, index) => {
        return (
          <Marker
            key={index}
            position={[item.coordinates.latitude, item.coordinates.longitude]}
            icon={scooterIcon}
          >
            <Popup>
              <h1 className="text-xl">{item.name}</h1>
              <div
                className="text-md text-white w-fit py-1 px-2 rounded-xl my-1"
                style={{ backgroundColor: scooterutils.sateColor(item.status) }}
              >
                {item.status}
              </div>
              <div className="px-1">
                <span className="text-md">
                  Owner: {item.owner}
                  <br />
                  Battery: {item.battery}%
                  <br />
                  Lat: {item.coordinates.latitude}
                  <br />
                  Lon: {item.coordinates.longitude}
                </span>
              </div>
            </Popup>
          </Marker>
        );
      });
    }
  }

  function AreasDisplay() {
    if (cities) {
      return cities.map((item) => {
        return item.zones.map((data, index) => {
          let geoObject = {
            type: "Feature",
            properties: { zonetype: data.zoneType },
            geometry: {
              type: "Polygon",
              coordinates: [data.coordinates],
            },
          };
          return (
            <GeoJSON
              key={index}
              data={geoObject}
              style={areaStyle(data.zoneType)}
            >
              <Popup>
                <h1 className="text-xl">{item.name}</h1>
              </Popup>
            </GeoJSON>
          );
        });
      });
    }
  }

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Search />
      <MarkersDisplay />
      <AreasDisplay />
    </MapContainer>
  );
};

export default Map;
