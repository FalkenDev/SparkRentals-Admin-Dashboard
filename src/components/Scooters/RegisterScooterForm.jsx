import React from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { scooterform } from "../../data/data";
const RegisterScooterForm = ({ handleForm }) => {
  const [newScooter, setNewScooter] = useState({
    City: "",
    Latitude: "",
    Longitude: "",
    Status: "",
    Battery: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    //console.log(newScooter);
  };

  const handleFormData = (e) => {
    let data = newScooter;
    data[e.target.name] = e.target.value;
    setNewScooter(data);
  };

  const allFields = () => {
    return scooterform.map((item, index) => {
      return (
        <div key={index} className="my-3">
          <label className="p-1">{item.title}</label>
          <input
            type="text"
            name={item.title}
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
          onClick={handleRegister}
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
