import React from "react";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { scooterform } from "../../data/data";
import { Map } from "../../components";
import getCoordinates from "../../models/nominatim";
import { scooterData } from "../../data/mock/mockdata";
const RegisterScooterForm = ({ handleForm, cityNames, handleRegister }) => {
  const [locationCoords, setLocationCoords] = useState([0, 0]);
  const [singleMarker, setSingleMarker] = useState({
    lat: 0,
    lon: 0,
  });
  const [newScooter, setNewScooter] = useState({
    owner: cityNames[0],
    longitude: "",
    latitude: "",
    battery: "",
    status: "Available",
  });

  useEffect(() => {
    getCoords(cityNames[0]);
  }, []);

  const handleFormData = (e) => {
    let data = newScooter;
    data[e.target.name] = e.target.value;
    setNewScooter(data);
  };

  const getCoords = async (city) => {
    const res = await getCoordinates(city);
    setLocationCoords([res.latitude, res.longitude]);
  };

  const customOptions = () => {
    return cityNames.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  };

  const handleCustomCoords = (target, value) => {
    setSingleMarker({ ...singleMarker, [target]: value });
  };

  const allFields = () => {
    return scooterform.map((item, index) => {
      if (item.type === "option") {
        return (
          <div key={index}>
            <label className="p-1">{item.title}</label>
            <select
              type={item.type}
              name={item.name}
              className=" bg-gray-50 border border-gray-300 text-gray-900
              text-sm rounded-lg block p-2.5 w-72"
              onChange={(e) => {
                handleFormData(e);
              }}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
              <option value="Off">Off</option>
              <option value="In use">In use</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        );
      }
      if (item.type === "custom") {
        return (
          <div key={index}>
            <label className="p-1">{item.title}</label>
            <select
              type={item.type}
              name={item.name}
              className=" bg-gray-50 border border-gray-300 text-gray-900
                          text-sm rounded-lg block p-2.5 w-72"
              onChange={(e) => {
                handleFormData(e);
                getCoords(e.target.value);
              }}
            >
              {customOptions()}
            </select>
          </div>
        );
      }
      if (item.name === "longitude") {
        return (
          <div key={index} className="my-3">
            <label className="p-1">{item.title}</label>
            <input
              type={item.type}
              name={item.name}
              value={singleMarker.lon}
              maxLength="30"
              onChange={(e) => {
                handleFormData(e);
                handleCustomCoords("lon", e.target.value);
              }}
              placeholder={item.placeholder}
              className="bg-gray-50 border border-gray-300 text-gray-900
                        text-sm rounded-lg block p-2.5 w-72"
              required
            />
          </div>
        );
      }
      if (item.name === "latitude") {
        return (
          <div key={index} className="my-3">
            <label className="p-1">{item.title}</label>
            <input
              type={item.type}
              name={item.name}
              value={singleMarker.lat}
              maxLength="30"
              onChange={(e) => {
                handleFormData(e);
                handleCustomCoords("lat", e.target.value);
              }}
              placeholder={item.placeholder}
              className="bg-gray-50 border border-gray-300 text-gray-900
                        text-sm rounded-lg block p-2.5 w-72"
              required
            />
          </div>
        );
      }
      return (
        <div key={index} className="my-3">
          <label className="p-1">{item.title}</label>
          <input
            type={item.type}
            name={item.name}
            maxLength="30"
            onChange={(e) => handleFormData(e)}
            placeholder={item.placeholder}
            className="bg-gray-50 border border-gray-300 text-gray-900
                        text-sm rounded-lg block p-2.5 w-72"
            required
          />
        </div>
      );
    });
  };
  return (
    <div className="bg-white p-4 reounded rounded-xl shadow-lg w-128">
      <button
        onClick={handleForm}
        className="rounded-full transition-colors p-2 shadow-md hover:bg-red-400"
      >
        <GrClose />
      </button>
      <h1 className="text-xl font-semibold text-center pb-2">
        Register Scooter
      </h1>
      <div className="flex flex-row justify-between border-t border-gray-400 p-4">
        <form id="newScooter" className="p-2 h-fit">
          {allFields()}
          <div className="text-center w-full pt-3">
            <button
              onClick={() => {
                handleRegister({
                  owner: newScooter.owner,
                  longitude: singleMarker.lon,
                  latitude: singleMarker.lat,
                  battery: newScooter.battery,
                  status: newScooter.status,
                });
                handleForm();
              }}
              className="
          py-2 px-4 transition-colors bg-sidebarHover
        hover:bg-sidebarBlue text-white rounded-full"
            >
              Register
            </button>
          </div>
        </form>
        <div className=" w-96 h-130 overflow-hidden">
          <Map
            center={[0, 0]}
            zoom={12}
            features={locationCoords}
            setSingleMarker={setSingleMarker}
            singleMarker={singleMarker}
            singleMode={true}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterScooterForm;
