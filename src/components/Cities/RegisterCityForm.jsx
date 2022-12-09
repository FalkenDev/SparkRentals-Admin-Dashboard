import React from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { cityform } from "../../data/data";
import cities from "../../models/cities";

const RegisterCityForm = ({ handleForm, cityData }) => {
  const [newCity, setNewCity] = useState({
    name: "",
    fixedRate: 0,
    timeRate: 0,
    bonusParkingZoneRate: 0,
    parkingZoneRate: 0,
    noParkingZoneRate: 0,
    cityChargingZoneRate: 0,
    cityNoParkingToValidParking: 0,
  });

  const handleRegister = () => {
    cities.addCity(newCity);
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
    <div className="bg-white p-4 reounded rounded-xl shadow-lg">
      <button
        onClick={handleForm}
        className="rounded-full transition-colors p-2 shadow-md hover:bg-red-400"
      >
        <GrClose />
      </button>
      <h1 className="text-xl font-semibold text-center pb-2">Register City</h1>
      <form id="newScooter" className="p-2 border-t border-gray-400 h-fit">
        {allFields()}
      </form>
      <div className="text-center w-full">
        <button
          onClick={() => {
            handleRegister();
            handleForm();
          }}
          className="
      py-2 px-4 transition-colors bg-sidebarHover
    hover:bg-sidebarBlue text-white rounded-full"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterCityForm;
