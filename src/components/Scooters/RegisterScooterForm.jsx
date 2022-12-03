import React from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { scooterform } from "../../data/data";
import scooter from "../../models/scooters";
const RegisterScooterForm = ({
  handleForm,
  scooterData,
  setScooterData,
  cityNames,
}) => {
  const [newScooter, setNewScooter] = useState({
    owner: cityNames[0],
    longitude: "",
    latitude: "",
    battery: "",
    status: "Available",
  });
  const handleRegister = () => {
    //e.preventDefault();
    scooter.addScooter(newScooter);
    const data = [...scooterData, newScooter];
    setScooterData(data);
  };

  const handleFormData = (e) => {
    let data = newScooter;
    data[e.target.name] = e.target.value;
    setNewScooter(data);
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
              onChange={(e) => handleFormData(e)}
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
              onChange={(e) => handleFormData(e)}
            >
              {customOptions()}
            </select>
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
    <div className="bg-white p-4 reounded rounded-xl shadow-lg">
      <button
        onClick={handleForm}
        className="rounded-full transition-colors p-2 shadow-md hover:bg-red-400"
      >
        <GrClose />
      </button>
      <h1 className="text-xl font-semibold text-center pb-2">
        Register Scooter
      </h1>
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

export default RegisterScooterForm;
