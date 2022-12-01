import React from "react";
import Map from "../components/Map/Map";
import { useState, useEffect } from "react";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { Layers, TileLayer, VectorLayer } from "../components/Map/Layers";
import Point from "ol/geom/Point";
import { Fill, Stroke, Style, Icon } from "ol/style";
import { osm, vector } from "../components/Map/Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
//import { Controls, FullScreenControl } from "./Controls";
import scooter from "../models/scooters";
import { Searchbar } from "./../components";
import mapConfig from "../config/config.json";
import { areas, markers } from "../data/mock/mockdata";
import getCoordinates from "../models/nominatim";
import maputils from "../utils/maputils";
//const geojsonObject = mapConfig.geojsonObject;
//const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];
const startpoint = mapConfig.center;

let styles = {
  MultiPolygon: new Style({
    stroke: new Stroke({ color: "blue", width: 1 }),
    fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" }),
  }),
  MultiPolygon2: new Style({
    stroke: new Stroke({ color: "red", width: 1 }),
    fill: new Fill({ color: "rgba(255,160,122, 0.1)" }),
  }),
};

// function addMarkers(lonLatArray) {
//   const iconStyle = new Style({
//     image: new Icon({
//       anchorXUnits: "fraction",
//       anchorYUnits: "pixels",
//       src: mapConfig.markerImage32,
//     }),
//   });
//   const features = lonLatArray.map((item) => {
//     let feature = new Feature({
//       geometry: new Point(fromLonLat(item)),
//     });
//     feature.setStyle(iconStyle);
//     return feature;
//   });
//   return features;
// }

const MapOverview = () => {
  const [center, setCenter] = useState(startpoint);
  const [zoom, setZoom] = useState(14);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScooters();
      const data = res.scooters;
      const Markers = maputils.createMarkerArray(data);
      console.log(Markers);
      console.log(features);
      setFeatures(maputils.addMarkers(Markers));
    }
    fetchData();
  }, []);

  const handleSearch = async () => {
    const result = await getCoordinates(searchPhrase);
    const coordArr = [result.longitude, result.latitude];
    setZoom(10);
    setCenter(coordArr);
  };

  const zoomOutFunc = () => {
    setZoom(zoom - 1);
  };

  const zoomInFunc = () => {
    setZoom(zoom + 1);
  };

  const areasZones = () => {
    return areas.geoObjects.map((item) => {
      return (
        <VectorLayer
          source={vector({
            features: new GeoJSON().readFeatures(item, {
              featureProjection: get("EPSG:3857"),
            }),
          })}
          style={styles.MultiPolygon}
        />
      );
    });
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
      <div className=" w-full flex flex-col justify-center">
        <div className="flex flex-row-reverse">
          <button
            onClick={zoomOutFunc}
            className="w-fit h-fit p-2 bg-gray-300 border-2 border-slate-600"
          >
            <AiOutlineZoomOut />
          </button>
          <button
            onClick={zoomInFunc}
            className="w-fit h-fit p-2 bg-gray-300 border-2 border-slate-600"
          >
            <AiOutlineZoomIn />
          </button>
        </div>
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
            {areasZones()}
            {showMarker && <VectorLayer source={vector({ features })} />}
          </Layers>
          {/* <Controls>
          {" "}
          <FullScreenControl />{" "}
        </Controls>{" "} */}
        </Map>
      </div>
    </div>
  );
};

export default MapOverview;
