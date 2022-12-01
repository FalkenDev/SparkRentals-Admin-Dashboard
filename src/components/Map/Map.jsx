import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "../../Map.css";
import { Icon } from "leaflet";

//import * as parkData from "./data/skateboard-parks.json";

const Map = ({ center, zoom, features, markers }) => {
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
        return <Marker position={item} />;
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
    </MapContainer>
  );
};

export default Map;
