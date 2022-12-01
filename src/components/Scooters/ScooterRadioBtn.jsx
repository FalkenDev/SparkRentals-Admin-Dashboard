import React, { useEffect } from "react";

const ScooterRadioBtn = ({ status }) => {
  useEffect(() => {
    const radios = document.getElementsByName("scootermode");
    let value = status;
    for (let i = 0, length = radios.length; i < length; i++) {
      if (radios[i].id == value) {
        radios[i].checked = true;
        break;
      }
    }
  }, []);

  return (
    <form
      className="flex flex-row justify-evenly my-4 flex-wrap"
      id="scootermode"
    >
      <div className="py-3">
        <input
          id="Available"
          type="radio"
          name="scootermode"
          className="peer hidden"
        />
        <label
          for="Available"
          className="peer-checked:bg-violet-700 px-4 py-3 rounded-xl
                text-white bg-blue-900 transition-colors"
        >
          Available
        </label>
      </div>
      <div className="py-3">
        <input
          id="Maintenance"
          type="radio"
          name="scootermode"
          className="peer hidden"
        />
        <label
          for="Maintenance"
          className="peer-checked:bg-violet-700 px-4 py-3 rounded-xl
                  text-white bg-blue-900 transition-colors"
        >
          Maintenace
        </label>
      </div>
      <div className="py-3">
        <input
          id="Off"
          type="radio"
          name="scootermode"
          className="peer hidden"
        />
        <label
          for="Off"
          className="peer-checked:bg-violet-700 px-4 py-3 rounded-xl
                  text-white bg-blue-900 transition-colors"
        >
          Deactivate
        </label>
      </div>
      <div className="py-3">
        <input
          id="Unavailable"
          type="radio"
          name="scootermode"
          className="peer hidden"
        />
        <label
          for="Unavailable"
          className="peer-checked:bg-violet-700 px-4 py-3 rounded-xl
                  text-white bg-blue-900 transition-colors"
        >
          Charging
        </label>
      </div>
    </form>
  );
};

export default ScooterRadioBtn;
