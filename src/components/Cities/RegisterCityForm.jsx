import React from "react";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { cityform } from "../../data/data";
import { Map } from "../../components";
import cities from "../../models/cities";
import getCoordinates from "../../models/nominatim";
const RegisterCityForm = ({
  handleForm,
  handleRegister,
  setNewCity,
  newCity,
}) => {
  const [coords, setCoords] = useState([0, 0]);

  const getCoords = async () => {
    const res = await getCoordinates(newCity.name);
    setCoords([res.latitude, res.longitude]);
  };

  const handleFormData = (e) => {
    let data = newCity;
    data[e.target.name] = e.target.value;
    setNewCity(data);
  };

  const allFields = () => {
    return cityform.map((item, index) => {
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
      <h1 className="text-xl font-semibold text-center pb-2">Register City</h1>
      <div className="flex flex-row justify-between border-t border-gray-400 p-4">
        <form id="newScooter" className="p-2 h-fit">
          {allFields()}
          <div className="text-center w-full pt-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRegister(newCity);
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
        <div className=" w-96 h-130 overflow-hidden flex flex-col pt-12">
          <Map center={coords} features={coords} zoom={10} />
          <div className="w-full">
            <div className="text-xl mb-5 bg-slate-700 text-white py-1 px-3">
              <p>Lat: {coords[0]} </p>
              <p>Lon: {coords[1]}</p>
            </div>
            <div className="text-center">
              <button
                className="py-2 px-4 transition-colors bg-sidebarHover
              hover:bg-sidebarBlue text-white rounded-full"
                onClick={() => {
                  getCoords();
                }}
              >
                Get Coordinates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCityForm;
