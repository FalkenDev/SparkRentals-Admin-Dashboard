import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { scooters } from "../data/mock/mockdata";
import { ScooterRadioBtn, Map } from "../components";
import { Layers, TileLayer, VectorLayer } from "../components/Map/Layers";
import { Fill, Stroke, Style, Icon } from "ol/style";
import { osm, vector } from "../components/Map/Source";
import { areas, markers } from "../data/mock/mockdata";
import { get } from "ol/proj";
import { fromLonLat } from "ol/proj";
import { scooterOverview } from "../data/data";
import scooterutils from "../utils/scooterutils";
import scooter from "../models/scooters";
import GeoJSON from "ol/format/GeoJSON";
import mapConfig from "../config/config.json";
const startpoint = mapConfig.center;
const zoom = 14;

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

const ScooterSelect = () => {
  const [selected, setSelected] = useState({});
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScooterById(id);
      setSelected(res);
    }
    fetchData();
  }, []);

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

  const GetScooterDetails = () => {
    const getValueByKey = (key, obj) => {
      return [].concat(key).reduce((o, k) => o[k], obj);
    };

    return scooterOverview.map((item) => {
      return (
        <div className="flex flex-row w-80 justify-between border-b">
          <p>{item.label}</p>
          <p>{getValueByKey(item.data, selected.scooter)}</p>
        </div>
      );
    });
  };

  if (!selected.scooter) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-full p-4 flex flex-col">
      <div className="bg-white flex flex-row p-7 align-middle rounded-xl shadow-md">
        <h1 className="text-3xl mr-2">Selected Scooter #233</h1>
        <h2
          style={{
            backgroundColor: scooterutils.sateColor(selected.scooter.status),
          }}
          className="p-2 rounded-xl text-white"
        >
          {selected.scooter.status}
        </h2>
      </div>

      <div className="flex flex-row justify-between mt-4 h-full overflow-scroll">
        <div className="p-4 mr-4 w-2/3 rounded-xl shadow-md bg-white">
          <h1 className="text-2xl font-semibold pb-2">Scooter Position</h1>
          <div>
            <Map center={fromLonLat(startpoint)} zoom={zoom}>
              <Layers>
                <TileLayer source={osm()} zIndex={0} />
                {areasZones()}
                {/* <VectorLayer source={vector({ features })} /> */}
              </Layers>
            </Map>
          </div>
          <div>
            <h1 className="text-xl py-2">Overview</h1>
            {GetScooterDetails()}
          </div>
        </div>

        <div className="h-full p-7 ml-4 rounded-xl w-1/3 bg-white shadow-md flex flex-col justify-between">
          <div>
            <h1 className="text-center font-semibold text-2xl">Settings</h1>
            <div>
              <p className="font-semibold text-xl">Set mode</p>
              <ScooterRadioBtn status={selected.scooter.status} />
            </div>
            <div>
              <p className="font-semibold text-xl">Set position</p>
              <div className="flex flex-row justify-between py-3">
                <input
                  type="text"
                  placeholder="Set Latitude"
                  value={selected.scooter.coordinates.latitude}
                  className="border-b border-gray-800 mr-2"
                />
                <input
                  type="text"
                  placeholder="Set longitude"
                  value={selected.scooter.coordinates.longitude}
                  className="border-b border-gray-800 ml-2"
                />
              </div>
              <div className="text-center my-5">
                <button
                  className="p-3 bg-blue-900 hover:bg-violet-700
               text-white rounded-xl font-semibold transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className="text-center my-5">
            <button
              className="p-3 bg-red-400 hover:bg-red-700
               text-white rounded-xl font-semibold transition-colors"
            >
              Delete Scooter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScooterSelect;
