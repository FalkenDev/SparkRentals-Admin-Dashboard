import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScooterRadioBtn, Map } from "../components";
import { scooterOverview } from "../data/data";
import { AiOutlineClose } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import scooterutils from "../utils/utils";
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
  const [singleMarker, setSingleMarker] = useState({
    lat: lat,
    lon: lon,
  });
  const [useMap, setUseMap] = useState(false);
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

  const setLatLng = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
  };

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

      <div
        className="flex flex-row justify-evenly mt-4 h-full overflow-scroll
      max-xl:flex-col"
      >
        <div className="p-4 xl:mr-4 w-2/3 rounded-xl shadow-md bg-white max-xl:w-full">
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

        <div className="h-full p-7 xl:ml-4 rounded-xl w-1/3 bg-white shadow-md flex flex-col justify-between max-xl:mt-4 max-xl:w-full ">
          <div>
            <h1 className="text-center font-semibold text-2xl">Settings</h1>
            <div className="max-xl:flex flex-row justify-between">
              <div>
                <p className="font-semibold text-xl">Set mode</p>
                <ScooterRadioBtn
                  status={status}
                  setStatus={setStatus}
                  setIsSaved={setIsSaved}
                />
              </div>
              <div>
                <p className="font-semibold text-xl py-2">Set position</p>
                {useMap ? (
                  <div className=" w-full">
                    <div className="w-full text-center m-1">
                      <button
                        className="bg-red-500 rounded-full text-white p-1"
                        onClick={() => setUseMap(false)}
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                    <div className="overflow-hidden h-60 rounded-md shadow-sm">
                      <Map
                        center={[lat, lon]}
                        zoom={zoom}
                        singleMarker={singleMarker}
                        setSingleMarker={setSingleMarker}
                        setLatLng={setLatLng}
                        singleMode={true}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full text-center m-3">
                    <button
                      className="px-2 py-1 bg-slate-500 text-sm text-white rounded-xl"
                      onClick={() => setUseMap(true)}
                    >
                      <span className="flex flex-row">
                        Show Map <BiMap />
                      </span>
                    </button>
                  </div>
                )}

                <div className="flex flex-row justify-evenly py-3">
                  <div className="flex flex-col">
                    <label>Latitude:</label>
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
                  </div>
                  <div className="flex flex-col">
                    <label>Longitude:</label>
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
                className="p-3 bg-red-500 hover:bg-red-700
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
