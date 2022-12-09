import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScooterRadioBtn, Map } from "../components";
import { scooterOverview } from "../data/data";
import scooterutils from "../utils/scooterutils";
import scooter from "../models/scooters";
import mapConfig from "../config/config.json";
import "../Map.css";
const startpoint = mapConfig.center;
const zoom = 14;

const ScooterSelect = () => {
  const [selected, setSelected] = useState();
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [status, setStatus] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScooterById(id);
      setSelected(res.scooter);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selected) {
      setLat(selected.coordinates.latitude);
      setLon(selected.coordinates.longitude);
      setStatus(selected.status);
    }
  }, [selected]);

  const handleEdit = () => {
    setIsSaved(true);
    const editedScooter = {
      _id: selected._id,
      owner: selected.owner,
      coordinates: {
        longitude: lon,
        latitude: lat,
      },
      log: selected.log,
      name: selected.name,
      battery: selected.battery,
      speed: selected.speed,
      status: status,
      trip: selected.trip,
    };
    scooter.editScooter(editedScooter);
    setSelected(editedScooter);
  };

  const handleDelete = async () => {
    await scooter.deleteScooter(selected._id);
    navigate("/scooters");
  };

  const GetScooterDetails = () => {
    const getValueByKey = (key, obj) => {
      return [].concat(key).reduce((o, k) => o[k], obj);
    };

    return scooterOverview.map((item) => {
      return (
        <div className="flex flex-row w-80 justify-between border-b">
          <p>{item.label}</p>
          <p>{getValueByKey(item.data, selected)}</p>
        </div>
      );
    });
  };

  if (!status) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-full p-4 flex flex-col">
      <div className="bg-white flex flex-row p-7 align-middle rounded-xl shadow-md">
        <h1 className="text-3xl mr-2">{selected.name}</h1>
        <h2
          style={{
            backgroundColor: scooterutils.sateColor(status),
          }}
          className="p-2 rounded-xl text-white"
        >
          {status}
        </h2>
      </div>

      <div className="flex flex-row justify-between mt-4 h-full overflow-scroll">
        <div className="p-4 mr-4 w-2/3 rounded-xl shadow-md bg-white">
          <h1 className="text-2xl font-semibold pb-2">Scooter Position</h1>
          {selected ? (
            <div className="h-125 overflow-hidden">
              <Map
                center={[lat, lon]}
                zoom={zoom}
                scooters={[selected]}
                features={[lat, lon]}
              />
            </div>
          ) : (
            <div>Loading ...</div>
          )}

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
              <ScooterRadioBtn
                status={status}
                setStatus={setStatus}
                setIsSaved={setIsSaved}
              />
            </div>
            <div>
              <p className="font-semibold text-xl">Set position</p>
              <div className="flex flex-row justify-between py-3">
                <input
                  type="number"
                  placeholder="Set Latitude"
                  onChange={(e) => {
                    setIsSaved(false);
                    setLat(e.target.value);
                  }}
                  value={lat}
                  className="border-b border-gray-800 mr-2"
                />
                <input
                  type="number"
                  placeholder="Set longitude"
                  onChange={(e) => {
                    setIsSaved(false);
                    setLon(e.target.value);
                  }}
                  value={lon}
                  className="border-b border-gray-800 ml-2"
                />
              </div>
              {isSaved ? (
                <div></div>
              ) : (
                <div>
                  <p className="text-red-600 text-center">
                    You have unsaved changes
                  </p>
                </div>
              )}
              <div className="text-center my-5">
                <button
                  onClick={() => {
                    handleEdit();
                  }}
                  className="p-3 bg-blue-900 hover:bg-violet-700
               text-white rounded-xl font-semibold transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className="text-center my-5">
            {confirmDelete ? (
              <div className="flex flex-row justify-evenly">
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className="p-3 bg-red-400 hover:bg-red-700 w-44
                         text-white rounded-xl font-semibold transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setConfirmDelete(false);
                  }}
                  className="p-3 bg-gray-400 hover:bg-gray-700 w-44
                         text-white rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setConfirmDelete(true);
                }}
                className="p-3 bg-red-400 hover:bg-red-700
                         text-white rounded-xl font-semibold transition-colors"
              >
                Delete Scooter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScooterSelect;
