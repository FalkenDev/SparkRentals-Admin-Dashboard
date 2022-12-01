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
import { areas } from "../../data/mock/mockdata";
//import { Icon } from "leaflet";

//import * as parkData from "./data/skateboard-parks.json";

const Map = ({ center, zoom, features, markers }) => {
  //console.log(ScooterIcon);
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const scooterIcon = new LeafIcon({
    iconUrl: ScooterIcon,
    //iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    //shadowUrl: "my-icon-shadow.png",
    // shadowSize: [68, 95],
    //shadowAnchor: [22, 94],
  });

  function Search() {
    const map = useMap();
    if (features) {
      map.flyTo(features, map.getZoom());
    }

    return null;
  }

  function MarkersDisplay() {
    if (markers) {
      return markers.map((item) => {
        return <Marker position={item} icon={scooterIcon} />;
      });
    }
  }

  function AreasDisplay() {
    return areas.geoObjects.map((item) => {
      return <GeoJSON data={item} />;
    });
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
